if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>n(e,c),o={module:{uri:c},exports:i,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),i)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/dynamic-css-manifest.json",revision:"d751713988987e9331980363e24189ce"},{url:"/_next/static/chunks/179-b8554d40bf3ae018.js",revision:"b8554d40bf3ae018"},{url:"/_next/static/chunks/36d2f571-058bd3a84c1459a3.js",revision:"058bd3a84c1459a3"},{url:"/_next/static/chunks/484.da50829333201e55.js",revision:"da50829333201e55"},{url:"/_next/static/chunks/4f892778-ec1455c00afcf9d8.js",revision:"ec1455c00afcf9d8"},{url:"/_next/static/chunks/53aeb252-ac938edfb3a86183.js",revision:"ac938edfb3a86183"},{url:"/_next/static/chunks/649-4abacce728350474.js",revision:"4abacce728350474"},{url:"/_next/static/chunks/709.e04b3301a1eba8ef.js",revision:"e04b3301a1eba8ef"},{url:"/_next/static/chunks/ee8b1517-d9c6cc942a5ba884.js",revision:"d9c6cc942a5ba884"},{url:"/_next/static/chunks/fec483df-f8420285a94941c8.js",revision:"f8420285a94941c8"},{url:"/_next/static/chunks/framework-a4ddb9b21624b39b.js",revision:"a4ddb9b21624b39b"},{url:"/_next/static/chunks/main-a7498641659466a5.js",revision:"a7498641659466a5"},{url:"/_next/static/chunks/pages/_app-826a2547e300b711.js",revision:"826a2547e300b711"},{url:"/_next/static/chunks/pages/_error-bb091f187c2001db.js",revision:"bb091f187c2001db"},{url:"/_next/static/chunks/pages/index-fcb3818195355c78.js",revision:"fcb3818195355c78"},{url:"/_next/static/chunks/pages/lib/mongodb-c49285a8ce30bbec.js",revision:"c49285a8ce30bbec"},{url:"/_next/static/chunks/pages/quiz/%5Bcategory%5D-b50b6b625d2397ac.js",revision:"b50b6b625d2397ac"},{url:"/_next/static/chunks/pages/result-7c9eee242437504f.js",revision:"7c9eee242437504f"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-3c13ed8810a8cbb2.js",revision:"3c13ed8810a8cbb2"},{url:"/_next/static/oJxbvxu18LvEZAlpFC2fg/_buildManifest.js",revision:"2ba35e208b0c063da8b30bf7a8c65834"},{url:"/_next/static/oJxbvxu18LvEZAlpFC2fg/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
