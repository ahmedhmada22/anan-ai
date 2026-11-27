const C="anan-v27";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));e.waitUntil(clients.claim())});
self.addEventListener("fetch",e=>{
  if(e.request.url.includes("generativelanguage.googleapis.com"))return;
  if(e.request.url.includes("speech.platform.bing.com"))return;
  if(e.request.mode==="navigate"||e.request.url.endsWith("/index.html")){
    e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(fr=>{
    if(fr&&fr.ok&&e.request.method==="GET"){const cp=fr.clone();caches.open(C).then(c=>c.put(e.request,cp))}
    return fr;
  })));
});
