export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  location?: string;
  camera?: string;
  wide: boolean;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "paddy-fields",
    src: "https://picsum.photos/seed/paddy/1600/1000",
    alt: "Golden hour light across monsoon paddy fields, Kerala",
    location: "Kerala, India",
    camera: "Sony A7IV · 35mm f/1.8",
    wide: true,
  },
  {
    id: "kochi-portrait",
    src: "https://picsum.photos/seed/kochi/800/1000",
    alt: "Street portrait, old quarter, Kochi",
    location: "Kochi, India",
    camera: "Sony A7IV · 85mm f/1.4",
    wide: false,
  },
  {
    id: "moto-detail",
    src: "https://picsum.photos/seed/moto/800/1000",
    alt: "Engine bay detail, restored vintage motorcycle",
    location: "Mumbai, India",
    camera: "Sony A7IV · 90mm Macro",
    wide: false,
  },
  {
    id: "mumbai-harbor",
    src: "https://picsum.photos/seed/harbor/1200/700",
    alt: "Aerial geometry, Mumbai harbor at dusk",
    location: "Mumbai, India",
    camera: "DJI Mini 4 Pro",
    wide: true,
  },
  {
    id: "monsoon-road",
    src: "https://picsum.photos/seed/monsoon/800/1000",
    alt: "Empty highway, pre-monsoon sky, Western Ghats",
    location: "Western Ghats, India",
    camera: "Sony A7IV · 24mm f/1.4",
    wide: false,
  },
  {
    id: "nightscape",
    src: "https://picsum.photos/seed/night/1200/700",
    alt: "Long-exposure city nightscape, Marine Drive",
    location: "Mumbai, India",
    camera: "Sony A7IV · 16-35mm f/2.8",
    wide: true,
  },
];
