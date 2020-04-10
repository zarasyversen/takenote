var cacheName = 'static-cache';
var urlsToCache = [
  '.',
  'index.html',
  'css/main.css',
  'js/main.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


//
// Get what we have in our cache or fetch what we need
// 
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request.url);
    })
  );


});

//
// Fetch & Cache what we don't have
//
function fetchAndCache(url) {

  return fetch(url)
  .then(function(response) {

    if (!response.ok) {
      throw Error(response.statusText);
    }

    return caches.open(cacheName)

    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
    
  })
  .catch(function(error) {
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here
  });
}

