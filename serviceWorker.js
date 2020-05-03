const VERSION = 'v1'

self.addEventListener('fetch', event => {
	return caches.match(event.request).then(response => {
		function fetchAndCache() {
			return fetch(event.request).then(response => {
				caches.open(VERSION).then(cache => cache.put(event.request, response.clone()));
				return response;
			});
		}

		if (!response) {
			return fetchAndCache();
		}

		fetchAndCache();
		return response;
	});
});
