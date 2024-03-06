// lazyLoad.js
export function setupLazyLoading() {
	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const handleIntersect = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target.querySelector('img');
				if (img) img.loading = 'lazy';
				observer.unobserve(entry.target);
			}
		});
	};

	const observer = new IntersectionObserver(handleIntersect, options);
	document.querySelectorAll('.lazy-load').forEach((item) => {
		observer.observe(item);
	});
}
