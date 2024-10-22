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
      registerType: "autoUpdate"
    })
  ]
});
export {
  baseUrl,
  vite_config_default as default,
  deployedUrl
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pblxcXFxEZXNrdG9wXFxcXGJvYXJkXFxcXG15bWVldGluZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQWRtaW5cXFxcRGVza3RvcFxcXFxib2FyZFxcXFxteW1lZXRpbmdcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FkbWluL0Rlc2t0b3AvYm9hcmQvbXltZWV0aW5nL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5jb25zdCBmYXZpY29uVVJMID0gXCIvZmF2aWNvbi5wbmdcIjtcclxuY29uc3QgcmVhY3RMb2dvVVJMID0gXCIvcmVhY3Quc3ZnXCI7XHJcbmNvbnN0IGJyYW5kaW5nTG9nbyA9IFwiL0JyYW5kaW5nX2xvZ28ucG5nXCI7XHJcbmNvbnN0IGV4cG9ydFBkZkljb24gPSBcIi9pY29uczgtZXhwb3J0LXBkZi01MC5wbmdcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBiYXNlVXJsID0gXCJodHRwczovL215em9uZWhyLm1vdGlsYWxvc3dhbC5jb20vYm9hcmRtZWV0aW5nYXBpXCI7XHJcbmV4cG9ydCBjb25zdCBkZXBsb3llZFVybD1cImh0dHBzOi8vbXl6b25laHIubW90aWxhbG9zd2FsLmNvbS9Cb2FyZE1lZXRpbmdBcHBcIlxyXG4vLyAgZXhwb3J0IGNvbnN0IGRlcGxveWVkVXJsPVwiaHR0cHM6Ly9vcmdhbml6ZXIuZml0aXplbmluZGlhLmNvbS9Cb2FyZE1lZXRpbmdBcHBcIlxyXG5cclxuY29uc3Qgb2ZmbGluZUltYWdlID0gXCIvb2ZmbGluZV9pbWFnZS5zdmdcIjtcclxuY29uc3Qgc29tZXRoaW5nV2VudFdyb25nID0gXCIvc29tZXRoaW5nX3dlbnRfd3Jvbmcuc3ZnXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IFwiQm9hcmRNZWV0aW5nQXBwXCIsXHJcblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgaW5jbHVkZUFzc2V0czogW1xyXG4gICAgICAgIGZhdmljb25VUkwsXHJcbiAgICAgICAgcmVhY3RMb2dvVVJMLFxyXG4gICAgICAgIGJyYW5kaW5nTG9nbyxcclxuICAgICAgICBleHBvcnRQZGZJY29uLFxyXG4gICAgICAgIG9mZmxpbmVJbWFnZSxcclxuICAgICAgICBzb21ldGhpbmdXZW50V3JvbmcsXHJcbiAgICAgIF0sXHJcbiAgICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgICAgbmFtZTogXCJNT1NMIEJvYXJkIENvbm5lY3RcIixcclxuICAgICAgICBzaG9ydF9uYW1lOiBcIkJvYXJkQ29ubmVjdFwiLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOlxyXG4gICAgICAgICAgXCJBIGNvbXByZWhlbnNpdmUgYW5kIGludHVpdGl2ZSBtZWV0aW5nIG1hbmFnZW1lbnQgdG9vbCBmb3IgYm9hcmQgbWVtYmVycyBvZiBNT1NMIChNb3RpbGFsIE9zd2FsKS5cIixcclxuICAgICAgICB0aGVtZV9jb2xvcjogXCIjZmJiMDJmXCIsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiBmYXZpY29uVVJMLnJlcGxhY2UoL15cXC8vLCBcIlwiKSxcclxuICAgICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLCAvLyBDaGFuZ2UgdG8gUE5HIGlmIGZhdmljb24gaXMgbm90IGFuIFNWR1xyXG5cclxuICAgICAgICAgICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogZmF2aWNvblVSTC5yZXBsYWNlKC9eXFwvLywgXCJcIiksXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIiwgLy8gQ2hhbmdlIHRvIFBORyBpZiBmYXZpY29uIGlzIG5vdCBhbiBTVkdcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgLy8gc3RhcnRfdXJsOiBcIi9ib2FyZG1lZXRpbmdcIixcclxuICAgICAgICAvLyBzdGFydF91cmw6IFwiaHR0cHM6Ly9teXpvbmVoci5tb3RpbGFsb3N3YWwuY29tL0JvYXJkTWVldGluZ0FwcC9zaWduLWluXCIsXHJcbiAgICAgICAgc3RhcnRfdXJsOiBgJHtkZXBsb3llZFVybH0vc2lnbi1pbmAsXHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjZjVmNmZhXCIsXHJcbiAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXHJcbiAgICAgICAgb3JpZW50YXRpb246IFwicG9ydHJhaXRcIixcclxuICAgICAgICAvLyBzY29wZTogXCIvYm9hcmRtZWV0aW5nXCIsXHJcbiAgICAgICAgLy8gc2NvcGU6IFwiaHR0cHM6Ly9teXpvbmVoci5tb3RpbGFsb3N3YWwuY29tL0JvYXJkTWVldGluZ0FwcFwiLFxyXG4gICAgICAgIHNjb3BlOiBkZXBsb3llZFVybCxcclxuICAgICAgICBsYW5nOiBcImVuLVVTXCIsXHJcbiAgICAgICAgbXNUaWxlQ29sb3I6IFwiIzAwMDAwMFwiLFxyXG4gICAgICAgIHByZWZlcl9yZWxhdGVkX2FwcGxpY2F0aW9uczogZmFsc2UsXHJcbiAgICAgICAgcmVsYXRlZF9hcHBsaWNhdGlvbnM6IFtdLFxyXG4gICAgICAgIGNyb3Nzd2FsazogdHJ1ZSxcclxuICAgICAgICBpZDogXCJjb20ubW9zbC5ib2FyZGNvbm5lY3RcIixcclxuICAgICAgICBzaGFyZToge1xyXG4gICAgICAgICAgLy8gc2NvcGU6IGAke2Jhc2VVcmx9L3NoYXJlYCwgLy8gVXBkYXRlZCBzY29wZSB3aXRoIGJhc2VVcmxcclxuICAgICAgICAgIHNjb3BlOmAke2Jhc2VVcmx9L3NoYXJlYCxcclxuICAgICAgICAgIHVybDogYmFzZVVybCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjcmVlbnNob3RzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogXCIvZmF2aWNvbi5wbmdcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiNjQweDExMzZcIixcclxuICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIiwgLy8gQ2hhbmdlIHRvIFBORyBpZiBmYXZpY29uIGlzIG5vdCBhbiBTVkdcclxuXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL2Zhdmljb24ucG5nXCIsXHJcbiAgICAgICAgICAgIHNpemVzOiBcIjc1MHgxMzM0XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsIC8vIENoYW5nZSB0byBQTkcgaWYgZmF2aWNvbiBpcyBub3QgYW4gU1ZHXHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcclxuXHJcbiAgICB9KSxcclxuICBdLFxyXG5cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1QsU0FBUyxvQkFBb0I7QUFDN1UsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUN4QixJQUFNLGFBQWE7QUFDbkIsSUFBTSxlQUFlO0FBQ3JCLElBQU0sZUFBZTtBQUNyQixJQUFNLGdCQUFnQjtBQUVmLElBQU0sVUFBVTtBQUNoQixJQUFNLGNBQVk7QUFHekIsSUFBTSxlQUFlO0FBQ3JCLElBQU0scUJBQXFCO0FBRTNCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUVOLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUixNQUFNO0FBQUEsUUFDTixZQUFZO0FBQUEsUUFDWixhQUNFO0FBQUEsUUFDRixhQUFhO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSyxXQUFXLFFBQVEsT0FBTyxFQUFFO0FBQUEsWUFDakMsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBO0FBQUEsWUFFTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUssV0FBVyxRQUFRLE9BQU8sRUFBRTtBQUFBLFlBQ2pDLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQTtBQUFBLFVBRVI7QUFBQSxRQUNGO0FBQUE7QUFBQTtBQUFBLFFBR0EsV0FBVyxHQUFHLFdBQVc7QUFBQSxRQUN6QixrQkFBa0I7QUFBQSxRQUNsQixTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUE7QUFBQTtBQUFBLFFBR2IsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsNkJBQTZCO0FBQUEsUUFDN0Isc0JBQXNCLENBQUM7QUFBQSxRQUN2QixXQUFXO0FBQUEsUUFDWCxJQUFJO0FBQUEsUUFDSixPQUFPO0FBQUE7QUFBQSxVQUVMLE9BQU0sR0FBRyxPQUFPO0FBQUEsVUFDaEIsS0FBSztBQUFBLFFBQ1A7QUFBQSxRQUNBLGFBQWE7QUFBQSxVQUNYO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUE7QUFBQSxVQUVSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBO0FBQUEsVUFFUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFjO0FBQUEsSUFFaEIsQ0FBQztBQUFBLEVBQ0g7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
