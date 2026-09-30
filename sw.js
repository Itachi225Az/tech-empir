const CACHE='tech-empire-v3-simulation-20260930';
const SHELL=['./','./index.html','./manifest.webmanifest','./sw.js','./tech-empire-app-icon-512.png','./tech-empire-logo.webp','./tech-empire-logo.png','./tech-empire-v3-cover.webp','./tech-empire-v3-cover.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL).catch(()=>{})).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(x=>x.put(e.request,copy));}return r;}).catch(()=>caches.match('./index.html'))));});
