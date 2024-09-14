import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

let faviconURL = '/vite.svg'
let reactLogoURL = '/react.svg';
let brandingLogo='/Branding_logo.png';
let exportPdfIcon =  '/icons8-export-pdf-50.png';

let offlineImage = '/offline_image.svg';
let somethingWentWrong = '/something_went_wrong.svg';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // includeAssets: [faviconURL],
      includeAssets: [faviconURL, reactLogoURL,brandingLogo,exportPdfIcon , offlineImage, somethingWentWrong],  // Include reactLogo in assets

      manifest: {
        theme_color: '#ffffff',
        icons: [
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: faviconURL,
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
    })
  ]
})