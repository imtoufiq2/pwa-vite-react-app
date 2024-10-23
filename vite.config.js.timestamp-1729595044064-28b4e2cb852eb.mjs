// vite.config.js
import { defineConfig } from "file:///C:/Users/Admin/Desktop/board/mymeeting/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Admin/Desktop/board/mymeeting/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/Admin/Desktop/board/mymeeting/node_modules/vite-plugin-pwa/dist/index.js";
var faviconURL = "/favicon.png";
var reactLogoURL = "/react.svg";
var brandingLogo = "/Branding_logo.png";
var exportPdfIcon = "/icons8-export-pdf-50.png";
var baseUrl = "https://myzonehr.motilaloswal.com/boardmeetingapi";
var deployedUrl = "https://myzonehr.motilaloswal.com/BoardMeetingApp";
var offlineImage = "/offline_image.svg";
var somethingWentWrong = "/something_went_wrong.svg";
var vite_config_default = defineConfig({
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
        somethingWentWrong
      ],
      manifest: {
        name: "MOSL Board Connect",
        short_name: "BoardConnect",
        description: "A comprehensive and intuitive meeting management tool for board members of MOSL (Motilal Oswal).",
        theme_color: "#fbb02f",
        icons: [
          {
            src: faviconURL.replace(/^\//, ""),
            sizes: "512x512",
            type: "image/png",
            // Change to PNG if favicon is not an SVG
            purpose: "any maskable"
          },
          {
            src: faviconURL.replace(/^\//, ""),
            sizes: "512x512",
            type: "image/png"
            // Change to PNG if favicon is not an SVG
          }
        ],
        // start_url: "/boardmeeting",
        // start_url: "https://myzonehr.motilaloswal.com/BoardMeetingApp/sign-in",
        start_url: `${deployedUrl}/sign-in`,
        background_color: "#f5f6fa",
        display: "standalone",
        orientation: "portrait",
        // scope: "/boardmeeting",
        // scope: "https://myzonehr.motilaloswal.com/BoardMeetingApp",
        scope: deployedUrl,
        lang: "en-US",
        msTileColor: "#000000",
        prefer_related_applications: false,
        related_applications: [],
        crosswalk: true,
        id: "com.mosl.boardconnect",
        share: {
          // scope: `${baseUrl}/share`, // Updated scope with baseUrl
          scope: `${baseUrl}/share`,
          url: baseUrl
        },
        screenshots: [
          {
            src: "/favicon.png",
            sizes: "640x1136",
            type: "image/png"
            // Change to PNG if favicon is not an SVG
          },
          {
            src: "/favicon.png",
            sizes: "750x1334",
            type: "image/png"
            // Change to PNG if favicon is not an SVG
          }
        ]
      },
      workbox: {
        // cacheId: 'my-app-cache-v1', // change this for every deployment to invalidate old cache
        // cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
        // Set limit to 10 MB
      },
      registerType: "autoUpdate",
      cacheBusting: {
        enabled: true,
        mode: "hash"
      }
    })
  ]
});
export {
  baseUrl,
  vite_config_default as default,
  deployedUrl
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEZXNrdG9wXFxcXGJvYXJkXFxcXG15bWVldGluZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5cXFxcRGVza3RvcFxcXFxib2FyZFxcXFxteW1lZXRpbmdcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FkbWluL0Rlc2t0b3AvYm9hcmQvbXltZWV0aW5nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5jb25zdCBmYXZpY29uVVJMID0gXCIvZmF2aWNvbi5wbmdcIjtcclxuY29uc3QgcmVhY3RMb2dvVVJMID0gXCIvcmVhY3Quc3ZnXCI7XHJcbmNvbnN0IGJyYW5kaW5nTG9nbyA9IFwiL0JyYW5kaW5nX2xvZ28ucG5nXCI7XHJcbmNvbnN0IGV4cG9ydFBkZkljb24gPSBcIi9pY29uczgtZXhwb3J0LXBkZi01MC5wbmdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBiYXNlVXJsID0gXCJodHRwczovL215em9uZWhyLm1vdGlsYWxvc3dhbC5jb20vYm9hcmRtZWV0aW5nYXBpXCI7XHJcbi8vIGV4cG9ydCBjb25zdCBiYXNlVXJsID0gXCJodHRwczovL215em9uZWJldGEubW90aWxhbG9zd2FsLmNvbS9Cb2FyZE1lZXRpbmdBcGlcIjtcclxuZXhwb3J0IGNvbnN0IGRlcGxveWVkVXJsPVwiaHR0cHM6Ly9teXpvbmVoci5tb3RpbGFsb3N3YWwuY29tL0JvYXJkTWVldGluZ0FwcFwiXHJcbi8vICBleHBvcnQgY29uc3QgZGVwbG95ZWRVcmw9XCJodHRwczovL29yZ2FuaXplci5maXRpemVuaW5kaWEuY29tL0JvYXJkTWVldGluZ0FwcFwiXHJcblxyXG5jb25zdCBvZmZsaW5lSW1hZ2UgPSBcIi9vZmZsaW5lX2ltYWdlLnN2Z1wiO1xyXG5jb25zdCBzb21ldGhpbmdXZW50V3JvbmcgPSBcIi9zb21ldGhpbmdfd2VudF93cm9uZy5zdmdcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogXCJCb2FyZE1lZXRpbmdBcHBcIixcclxuXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbXHJcbiAgICAgICAgZmF2aWNvblVSTCxcclxuICAgICAgICByZWFjdExvZ29VUkwsXHJcbiAgICAgICAgYnJhbmRpbmdMb2dvLFxyXG4gICAgICAgIGV4cG9ydFBkZkljb24sXHJcbiAgICAgICAgb2ZmbGluZUltYWdlLFxyXG4gICAgICAgIHNvbWV0aGluZ1dlbnRXcm9uZyxcclxuICAgICAgXSxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiBcIk1PU0wgQm9hcmQgQ29ubmVjdFwiLFxyXG4gICAgICAgIHNob3J0X25hbWU6IFwiQm9hcmRDb25uZWN0XCIsXHJcbiAgICAgICAgZGVzY3JpcHRpb246XHJcbiAgICAgICAgICBcIkEgY29tcHJlaGVuc2l2ZSBhbmQgaW50dWl0aXZlIG1lZXRpbmcgbWFuYWdlbWVudCB0b29sIGZvciBib2FyZCBtZW1iZXJzIG9mIE1PU0wgKE1vdGlsYWwgT3N3YWwpLlwiLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiNmYmIwMmZcIixcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IGZhdmljb25VUkwucmVwbGFjZSgvXlxcLy8sIFwiXCIpLFxyXG4gICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsIC8vIENoYW5nZSB0byBQTkcgaWYgZmF2aWNvbiBpcyBub3QgYW4gU1ZHXHJcblxyXG4gICAgICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBmYXZpY29uVVJMLnJlcGxhY2UoL15cXC8vLCBcIlwiKSxcclxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLCAvLyBDaGFuZ2UgdG8gUE5HIGlmIGZhdmljb24gaXMgbm90IGFuIFNWR1xyXG5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyBzdGFydF91cmw6IFwiL2JvYXJkbWVldGluZ1wiLFxyXG4gICAgICAgIC8vIHN0YXJ0X3VybDogXCJodHRwczovL215em9uZWhyLm1vdGlsYWxvc3dhbC5jb20vQm9hcmRNZWV0aW5nQXBwL3NpZ24taW5cIixcclxuICAgICAgICBzdGFydF91cmw6IGAke2RlcGxveWVkVXJsfS9zaWduLWluYCxcclxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiNmNWY2ZmFcIixcclxuICAgICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcclxuICAgICAgICBvcmllbnRhdGlvbjogXCJwb3J0cmFpdFwiLFxyXG4gICAgICAgIC8vIHNjb3BlOiBcIi9ib2FyZG1lZXRpbmdcIixcclxuICAgICAgICAvLyBzY29wZTogXCJodHRwczovL215em9uZWhyLm1vdGlsYWxvc3dhbC5jb20vQm9hcmRNZWV0aW5nQXBwXCIsXHJcbiAgICAgICAgc2NvcGU6IGRlcGxveWVkVXJsLFxyXG4gICAgICAgIGxhbmc6IFwiZW4tVVNcIixcclxuICAgICAgICBtc1RpbGVDb2xvcjogXCIjMDAwMDAwXCIsXHJcbiAgICAgICAgcHJlZmVyX3JlbGF0ZWRfYXBwbGljYXRpb25zOiBmYWxzZSxcclxuICAgICAgICByZWxhdGVkX2FwcGxpY2F0aW9uczogW10sXHJcbiAgICAgICAgY3Jvc3N3YWxrOiB0cnVlLFxyXG4gICAgICAgIGlkOiBcImNvbS5tb3NsLmJvYXJkY29ubmVjdFwiLFxyXG4gICAgICAgIHNoYXJlOiB7XHJcbiAgICAgICAgICAvLyBzY29wZTogYCR7YmFzZVVybH0vc2hhcmVgLCAvLyBVcGRhdGVkIHNjb3BlIHdpdGggYmFzZVVybFxyXG4gICAgICAgICAgc2NvcGU6YCR7YmFzZVVybH0vc2hhcmVgLFxyXG4gICAgICAgICAgdXJsOiBiYXNlVXJsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NyZWVuc2hvdHM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBcIi9mYXZpY29uLnBuZ1wiLFxyXG4gICAgICAgICAgICBzaXplczogXCI2NDB4MTEzNlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLCAvLyBDaGFuZ2UgdG8gUE5HIGlmIGZhdmljb24gaXMgbm90IGFuIFNWR1xyXG5cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCIvZmF2aWNvbi5wbmdcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiNzUweDEzMzRcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIiwgLy8gQ2hhbmdlIHRvIFBORyBpZiBmYXZpY29uIGlzIG5vdCBhbiBTVkdcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICAvLyBjYWNoZUlkOiAnbXktYXBwLWNhY2hlLXYxJywgLy8gY2hhbmdlIHRoaXMgZm9yIGV2ZXJ5IGRlcGxveW1lbnQgdG8gaW52YWxpZGF0ZSBvbGQgY2FjaGVcclxuICAgIC8vIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiAxMCAqIDEwMjQgKiAxMDI0LCAvLyBTZXQgbGltaXQgdG8gMTAgTUJcclxuICAgICAgfSxcclxuICAgICAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXHJcbiAgICAgIGNhY2hlQnVzdGluZzoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgbW9kZTogJ2hhc2gnLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdULFNBQVMsb0JBQW9CO0FBQzdVLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsSUFBTSxhQUFhO0FBQ25CLElBQU0sZUFBZTtBQUNyQixJQUFNLGVBQWU7QUFDckIsSUFBTSxnQkFBZ0I7QUFFZixJQUFNLFVBQVU7QUFFaEIsSUFBTSxjQUFZO0FBR3pCLElBQU0sZUFBZTtBQUNyQixJQUFNLHFCQUFxQjtBQUUzQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFFTixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixlQUFlO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFDRTtBQUFBLFFBQ0YsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUssV0FBVyxRQUFRLE9BQU8sRUFBRTtBQUFBLFlBQ2pDLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQTtBQUFBLFlBRU4sU0FBUztBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLLFdBQVcsUUFBUSxPQUFPLEVBQUU7QUFBQSxZQUNqQyxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsUUFDRjtBQUFBO0FBQUE7QUFBQSxRQUdBLFdBQVcsR0FBRyxXQUFXO0FBQUEsUUFDekIsa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBO0FBQUE7QUFBQSxRQUdiLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLDZCQUE2QjtBQUFBLFFBQzdCLHNCQUFzQixDQUFDO0FBQUEsUUFDdkIsV0FBVztBQUFBLFFBQ1gsSUFBSTtBQUFBLFFBQ0osT0FBTztBQUFBO0FBQUEsVUFFTCxPQUFNLEdBQUcsT0FBTztBQUFBLFVBQ2hCLEtBQUs7QUFBQSxRQUNQO0FBQUEsUUFDQSxhQUFhO0FBQUEsVUFDWDtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBO0FBQUE7QUFBQSxRQUdYLCtCQUErQixLQUFLLE9BQU87QUFBQTtBQUFBLE1BQ3pDO0FBQUEsTUFDQSxjQUFjO0FBQUEsTUFDZCxjQUFjO0FBQUEsUUFDWixTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
