import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const faviconURL = "/vite.svg";
const reactLogoURL = "/react.svg";
const brandingLogo = "/Branding_logo.png";
const exportPdfIcon = "/icons8-export-pdf-50.png";

const offlineImage = "/offline_image.svg";
const somethingWentWrong = "/something_went_wrong.svg";

export default defineConfig({
  base: "/boardmeeting",

  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        faviconURL,
        reactLogoURL,
        brandingLogo,
        exportPdfIcon,
        offlineImage,
        somethingWentWrong,
      ],
      manifest: {
        name: "MOSL BoardBuddy",
        short_name: "BoardBuddy",
        description: "An intuitive meeting management tool for MOSL Motilal Oswal company board members.",
        theme_color: "#fbb02f",
        icons: [
          {
            src: faviconURL.replace(/^\//, ""),
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: faviconURL.replace(/^\//, ""),
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: ".",
        background_color: "#f5f6fa",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        lang: "en-US",
        msTileColor: "#000000",
        prefer_related_applications: false,
        related_applications: [],
        crosswalk: true,
        id: "com.yourdomain.appname",
        share: {
          scope: "http://yoursite.com/share",
          url: "https://yoursite.com",
        },
        screenshots: [
          {
            src: "path/to/screenshot1.jpg",
            sizes: "640x1136",
            type: "image/jpeg",
          },
          {
            src: "path/to/screenshot2.jpg",
            sizes: "750x1334",
            type: "image/jpeg",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/BoardMeetingApi": {
        target: "https://myzonebeta.motilaloswal.com",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/BoardMeetingApi/, "/BoardMeetingApi"),
      },
    },
  }
});
