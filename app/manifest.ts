import type { MetadataRoute } from "next";

// manifest template
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Quark Finance",
    short_name: "Quark",
    start_url: "/",
    description: "The atomic engine for decentralized asset management",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#0f0f0f",
    background_color: "#26292F",
    display: "standalone",
  };
}
