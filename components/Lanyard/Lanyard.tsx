/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, extend, useThree, useFrame, ThreeEvent } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
  RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

// ==========================================
// CUSTOM TYPE DECLARATIONS FOR THREE / R3F
// ==========================================
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        meshLineGeometry: any;
        meshLineMaterial: any;
      }
    }
  }
}

// Extend R3F custom tag dictionary
extend({ MeshLineGeometry, MeshLineMaterial });

// ==========================================
// COMPONENT INTERFACES
// ==========================================
interface LanyardProps {
  /** Position of the camera in the WebGL scene */
  position?: [number, number, number];
  /** Gravity coordinates passed down to the Rapier Physics engine */
  gravity?: [number, number, number];
  /** Field-of-View settings for the perspective camera */
  fov?: number;
  /** Whether WebGL clearing is set to transparent */
  transparent?: boolean;
}

interface BandProps {
  /** Maximum swing speed clamping value */
  maxSpeed?: number;
  /** Minimum swing speed clamping value */
  minSpeed?: number;
  /** Callback to notify parent container of active drags */
  onDragChange?: (dragging: boolean) => void;
}

interface CardGLTFResult {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshPhysicalMaterial;
    metal: THREE.MeshStandardMaterial;
  };
}

// ==========================================
// STATIC LAYOUT CONSTANTS (Centered & Bounded)
// ==========================================
const X_OFFSET = 0; // Centered inside the right-hand panel Canvas
const Y_OFFSET = 3.5; // Constant anchor height for both mobile and desktop

/**
 * @component Lanyard
 * @description The main parent component setting up the WebGL canvas, lights, and physics simulation
 * environments. Runs on top of React Three Fiber and Rapier.
 * Confined to the Hero section column with absolute styling.
 * Default eventSource captures local container events to prevent unprojection matrix mismatches.
 */
export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={`absolute inset-0 w-full h-full z-20 transition-colors duration-300 ${
        isDragging ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="w-full h-full pointer-events-none">
        <Canvas
          camera={{ position, fov }}
          gl={{ alpha: transparent }}
          style={{ pointerEvents: "none" }}
          onCreated={({ gl }) => {
            gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
          }}
        >
          <ambientLight intensity={Math.PI} />

          <Physics gravity={gravity} timeStep={1 / 60}>
            <Suspense fallback={null}>
              <Band onDragChange={setIsDragging} />
            </Suspense>
          </Physics>

          {/* Interactive lighting environment to create photorealistic metallic reflections */}
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>
    </div>
  );
}

// ==========================================
// SUBCOMPONENTS
// ==========================================

/**
 * @component Band
 * @description Simulates a physics rope joint chain supporting a dynamic 3D ID card.
 * Uses camera raycasting unprojection to map cursor drags in 2D space to 3D translations,
 * and updates a CatmullRom Curve spline to render the lanyard's ribbon texture.
 */
function Band({ maxSpeed = 50, minSpeed = 0, onDragChange }: BandProps) {
  // Rapier physics body references
  const fixed = useRef<RapierRigidBody>(null!);
  const j1 = useRef<RapierRigidBody>(null!);
  const j2 = useRef<RapierRigidBody>(null!);
  const j3 = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);

  // Mesh ref for the rope element with custom MeshLine geometry mapping
  const bandMesh = useRef<THREE.Mesh & { geometry: any }>(null);

  // Cached vector math buffers to prevent garbage collection sweeps inside the 60fps frame loop
  const vec = useRef(new THREE.Vector3());
  const ang = useRef(new THREE.Vector3());
  const rot = useRef(new THREE.Vector3());
  const dir = useRef(new THREE.Vector3());

  // Lerp vector caches for joint animation smoothing
  const j1Lerped = useRef(new THREE.Vector3());
  const j2Lerped = useRef(new THREE.Vector3());
  const j1Initialized = useRef(false);
  const j2Initialized = useRef(false);

  // Default properties for physics rope segments (canSleep: false prevents sleep-related glitches)
  const segmentProps = useRef({
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: false,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
    mass: 1,
  }).current;

  // Load assets via Drei helpers
  const { nodes, materials } = useGLTF("/assets/lanyard/card.glb") as unknown as CardGLTFResult;
  const texture = useTexture("/assets/lanyard/lanyard.png");

  // Viewport/Screen properties
  const { width, height } = useThree((state) => state.size);

  // Return null if canvas is not yet laid out to prevent physics solver explosions on initial zero-size frame
  if (width === 0) return null;

  // Initialize CatmullRom Curve once (memoized state)
  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = "chordal";
    return c;
  });

  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  // Physics constraints: Chain rope joints sequentially
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  // Initialize texture wrapping once when texture finishes loading
  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    }
  }, [texture]);

  // Adjust document cursor styles based on pointer state
  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  // Drag callback notifier
  const dragWithCallback = (value: false | THREE.Vector3) => {
    drag(value);
    onDragChange?.(!!value);
  };

  // Animation ticks / updates inside WebGL loop
  useFrame((state, delta) => {
    // Clamp delta time to avoid physics explosion on low frame rates (e.g. background tab)
    const dt = Math.min(0.05, delta);

    // 1. Process active pointer dragging (camera unprojection math)
    if (dragged && typeof dragged !== "boolean" && card.current) {
      vec.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.current.copy(vec.current).sub(state.camera.position).normalize();
      vec.current.add(dir.current.multiplyScalar(state.camera.position.length()));
      
      // Keep physics bodies awake while dragging
      card.current.wakeUp();
      j1.current?.wakeUp();
      j2.current?.wakeUp();
      j3.current?.wakeUp();
      fixed.current?.wakeUp();

      card.current.setNextKinematicTranslation({
        x: vec.current.x - dragged.x,
        y: vec.current.y - dragged.y,
        z: vec.current.z - dragged.z,
      });
    }

    // 2. Animate physics joints and update CatmullRom path
    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current &&
      bandMesh.current
    ) {
      // Joint 1 Lerping
      const t1 = j1.current.translation();
      if (t1 && !isNaN(t1.x) && !isNaN(t1.y) && !isNaN(t1.z)) {
        if (!j1Initialized.current) {
          j1Lerped.current.copy(t1);
          j1Initialized.current = true;
        }
        const dist1 = Math.max(0.1, Math.min(1, j1Lerped.current.distanceTo(t1)));
        j1Lerped.current.lerp(t1, dt * (minSpeed + dist1 * (maxSpeed - minSpeed)));
      }

      // Joint 2 Lerping
      const t2 = j2.current.translation();
      if (t2 && !isNaN(t2.x) && !isNaN(t2.y) && !isNaN(t2.z)) {
        if (!j2Initialized.current) {
          j2Lerped.current.copy(t2);
          j2Initialized.current = true;
        }
        const dist2 = Math.max(0.1, Math.min(1, j2Lerped.current.distanceTo(t2)));
        j2Lerped.current.lerp(t2, dt * (minSpeed + dist2 * (maxSpeed - minSpeed)));
      }

      const t3 = j3.current.translation();
      const tFixed = fixed.current.translation();

      // Push points to CatmullRomCurve buffer
      if (t3 && tFixed && !isNaN(t3.x) && !isNaN(tFixed.x)) {
        curve.points[0].copy(t3);
        curve.points[1].copy(j2Lerped.current);
        curve.points[2].copy(j1Lerped.current);
        curve.points[3].copy(tFixed);
        bandMesh.current.geometry.setPoints(curve.getPoints(32));
      }

      // Add simple angular damping back to the card object to prevent infinite spinning
      const angVel = card.current.angvel();
      const rotation = card.current.rotation();
      if (angVel && rotation && !isNaN(angVel.x) && !isNaN(rotation.y)) {
        ang.current.copy(angVel);
        rot.current.copy(rotation);
        card.current.setAngvel({
          x: ang.current.x,
          y: ang.current.y - rot.current.y * 0.25,
          z: ang.current.z,
        }, true);
      }
    }
  });

  return (
    <>
      {/* Physics constraints group */}
      <group position={[0, 0, 0]}>
        <RigidBody ref={fixed} position={[X_OFFSET, Y_OFFSET, 0]} {...segmentProps} type="fixed" />
        
        <RigidBody position={[X_OFFSET, Y_OFFSET - 0.5, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        <RigidBody position={[X_OFFSET, Y_OFFSET - 1, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        <RigidBody position={[X_OFFSET, Y_OFFSET - 1.5, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        
        <RigidBody
          position={[X_OFFSET, Y_OFFSET - 2.95, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: ThreeEvent<PointerEvent>) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
              dragWithCallback(false);
            }}
            onPointerDown={(e: ThreeEvent<PointerEvent>) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              dragWithCallback(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.current.copy(card.current!.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry} frustumCulled={false}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
              frustumCulled={false}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} frustumCulled={false} />
          </group>
        </RigidBody>
      </group>

      {/* Lanyard Line Mesh */}
      <mesh ref={bandMesh} frustumCulled={false}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width || 1024, height || 768]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
