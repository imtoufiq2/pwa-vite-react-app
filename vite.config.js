import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
const faviconURL = "/favicon.png";
const reactLogoURL = "/react.svg";
const brandingLogo = "/Branding_logo.png";
const exportPdfIcon = "/icons8-export-pdf-50.png";

export const baseUrl = "https://myzonehr.motilaloswal.com/boardmeetingapi";
// export const baseUrl = "https://myzonebeta.motilaloswal.com/BoardMeetingApi";
export const deployedUrl="https://myzonehr.motilaloswal.com/BoardMeetingApp"
//  export const deployedUrl="https://organizer.fitizenindia.com/BoardMeetingApp"

const offlineImage = "/offline_image.svg";
const somethingWentWrong = "/something_went_wrong.svg";

export default defineConfig({
  base: "BoardMeetingApp",

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
        name: "MOSL Board Connect",
        short_name: "BoardConnect",
        description:
          "A comprehensive and intuitive meeting management tool for board members of MOSL (Motilal Oswal).",
        theme_color: "#fbb02f",
        icons: [
          {
            src: faviconURL.replace(/^\//, ""),
            sizes: "512x512",
            type: "image/png", // Change to PNG if favicon is not an SVG

            purpose: "any maskable",
          },
          {
            src: faviconURL.replace(/^\//, ""),
            sizes: "512x512",
            type: "image/png", // Change to PNG if favicon is not an SVG

          },
        ],
        start_url: `${deployedUrl}/sign-in`,
        background_color: "#f5f6fa",
        display: "standalone",
        orientation: "portrait",
        scope: deployedUrl,
        lang: "en-US",
        msTileColor: "#000000",
        prefer_related_applications: false,
        related_applications: [],
        crosswalk: true,
        id: "com.mosl.boardconnect",
        share: {
          // scope: `${baseUrl}/share`, // Updated scope with baseUrl
          scope:`${baseUrl}/share`,
          url: baseUrl,
        },
        screenshots: [
          {
            src: "/favicon.png",
            sizes: "640x1136",
            type: "image/png", // Change to PNG if favicon is not an SVG

          },
          {
            src: "/favicon.png",
            sizes: "750x1334",
            type: "image/png", // Change to PNG if favicon is not an SVG

          },
        ],
      },
      workbox: {
        cacheId: 'boardmeeting-cache-v1', // change this for every deployment to invalidate old cache
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // Set limit to 10 MB
      },
      registerType: 'autoUpdate',
      cacheBusting: {
        enabled: true,
        mode: 'hash',
      },
    }),
  ],

});
