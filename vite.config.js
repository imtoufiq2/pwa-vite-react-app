import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import babel from '@rollup/plugin-babel';

import { VitePWA } from "vite-plugin-pwa";

const faviconURL = "/favicon.png";
const reactLogoURL = "/react.svg";
const brandingLogo = "/Branding_logo.png";
const exportPdfIcon = "/icons8-export-pdf-50.png";

const offlineImage = "/offline_image.svg";
const somethingWentWrong = "/something_went_wrong.svg";

export default defineConfig({
  base: "boardmeeting",
  plugins: [
    react(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx'],
      exclude: 'node_modules/**'
    }),
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
        start_url: "/boardmeeting",
        background_color: "#f5f6fa",
        display: "standalone",
        orientation: "portrait",
        scope: "/boardmeeting",
        lang: "en-US",
        msTileColor: "#000000",
        prefer_related_applications: false,
        related_applications: [],
        crosswalk: true,
        id: "com.mosl.boardconnect",
        share: {
          scope: "https://myzonebeta.motilaloswal.com/boardmeeting/share",
          url: "https://myzonebeta.motilaloswal.com/boardmeeting",
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
    }),
  ],
  build: {
    target: ['es2015', 'ios13']
  }
});
