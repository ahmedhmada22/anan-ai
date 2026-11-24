const C="anan-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./index.html","./manifest.webmanifest"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(clients.claim())});
self.addEventListener("fetch",e=>{
  if(e.request.url.includes("generativelanguage.googleapis.com"))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
