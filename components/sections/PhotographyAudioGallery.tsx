"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { clipReveal, clipRevealContainer } from "@/lib/motionVariants";
import AudioPlayer, { type AudioTrack } from "@/components/ui/AudioPlayer";
import { galleryImages } from "@/lib/gallery";

const bansuriTracks: AudioTrack[] = [
  { title: "Raga Yaman — Evening Meditation", src: "/audio/raga-yaman.mp3", duration: "6:34" },
  { title: "Raga Bhairavi — Dawn Invocation", src: "/audio/raga-bhairavi.mp3", duration: "4:12" },
];

export default function PhotographyAudioGallery() {
  const shouldReduce = useReducedMotion();
  const revealVariant = shouldReduce ? { hidden: {}, visible: {} } : clipReveal;
  const containerVariant = shouldReduce ? { hidden: {}, visible: {} } : clipRevealContainer;

  return (
    <section id="photography" aria-label="Photography" className="py-24 overflow-hidden">
      {/* Section header */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="px-6 lg:px-16 max-w-5xl mx-auto mb-12"
      >
        <motion.p variants={revealVariant} className="text-[10px] tracking-[0.2em] uppercase text-muted mb-3 overflow-hidden">
          Photography & Audio
        </motion.p>
        <motion.h2
          variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 } } }}
          className="font-semibold text-foreground overflow-hidden"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
        >
          Visual stories, captured light.
        </motion.h2>
        <motion.p
          variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 } } }}
          className="mt-4 max-w-lg text-sm text-muted leading-relaxed overflow-hidden"
        >
          Photography as a discipline of observation. Paired with cinematic Bansuri scores
          for a meditative viewing experience.
        </motion.p>
      </motion.div>

      {/* Full-bleed grid — tight, no radius */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
        style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
        aria-label="Photo gallery"
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.id}
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={shouldReduce ? {} : { opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden group ${img.wide ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/5]"}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <Link
              href={`/photography/${img.id}`}
              data-cursor="hover"
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5"
              aria-label={`View photo: ${img.alt}`}
            >
              <p className="text-xs font-medium text-foreground leading-snug">{img.alt}</p>
              {img.location && (
                <p className="text-[10px] text-muted mt-1">{img.location}</p>
              )}
              <span className="mt-3 inline-flex items-center gap-1 text-[10px] text-foreground tracking-wider uppercase">
                View →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View all */}
      <div className="px-6 lg:px-16 max-w-5xl mx-auto mt-8 flex justify-end">
        <Link href="/photography" data-cursor="hover" className="text-xs text-muted hover:text-foreground transition-colors">
          Full gallery →
        </Link>
      </div>

      {/* Audio player */}
      <motion.div
        variants={{ ...revealVariant, visible: { ...revealVariant.visible, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="px-6 lg:px-16 max-w-5xl mx-auto mt-12 overflow-hidden"
      >
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted mb-5">
          Cinematic Scores — Bansuri Flute
        </p>
        <AudioPlayer tracks={bansuriTracks} />
      </motion.div>
    </section>
  );
}
