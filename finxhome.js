document.addEventListener('DOMContentLoaded', () => {
	/* =======================
	   SLIDER HERO + AUTOPLAY
	   ======================= */
	const slides = document.getElementById('slides');
	const indicators = document.getElementById('indicators');
	const prevBtn = document.querySelector('.hero-controls .prev');
	const nextBtn = document.querySelector('.hero-controls .next');

	if (slides && indicators) {
		const slidesCount = slides.children.length;
		let idx = 0;
		let timer = null;

		// crear indicadores
		for (let i = 0; i < slidesCount; i++) {
			const dot = document.createElement('div');
			dot.className = 'indicator' + (i === 0 ? ' active' : '');
			dot.dataset.index = i;
			dot.addEventListener('click', () => {
				goTo(i);
			});
			indicators.appendChild(dot);
		}

		function update() {
			slides.style.transform = `translateX(-${idx * 100}%)`;
			Array.from(indicators.children).forEach((d, i) =>
				d.classList.toggle('active', i === idx)
			);
		}

		function next() {
			idx = (idx + 1) % slidesCount;
			update();
		}

		function prev() {
			idx = (idx - 1 + slidesCount) % slidesCount;
			update();
		}

		function goTo(i) {
			idx = (i + slidesCount) % slidesCount;
			update();
			restartTimer();
		}

		function restartTimer() {
			if (timer) clearInterval(timer);
			timer = setInterval(next, 6000);
		}

		// botones prev/next
		if (nextBtn) {
			nextBtn.addEventListener('click', () => {
				next();
				restartTimer();
			});
		}
		if (prevBtn) {
			prevBtn.addEventListener('click', () => {
				prev();
				restartTimer();
			});
		}

		// autoplay inicial
		update();
		restartTimer();

		/* =======================
		   SWIPE TÁCTIL EN HERO
		   ======================= */
		let startX = 0;
		let startY = 0;
		let isSwiping = false;

		const hero = document.querySelector('.hero');

		if (hero) {
			hero.addEventListener(
				'touchstart',
				(e) => {
					if (!e.touches || e.touches.length === 0) return;
					startX = e.touches[0].clientX;
					startY = e.touches[0].clientY;
					isSwiping = true;
					if (timer) clearInterval(timer);
				},
				{ passive: true }
			);

			hero.addEventListener(
				'touchmove',
				(e) => {
					if (!isSwiping || !e.touches || e.touches.length === 0) return;
					const dx = e.touches[0].clientX - startX;
					const dy = e.touches[0].clientY - startY;

					if (Math.abs(dy) > Math.abs(dx)) {
						isSwiping = false; // dejamos hacer scroll vertical
					}
				},
				{ passive: true }
			);

			hero.addEventListener(
				'touchend',
				(e) => {
					if (!isSwiping) {
						restartTimer();
						return;
					}
					const endX = e.changedTouches[0].clientX;
					const diffX = endX - startX;
					const umbral = 50; // px

					if (Math.abs(diffX) > umbral) {
						if (diffX < 0) {
							next(); // swipe izquierda
						} else {
							prev(); // swipe derecha
						}
					}

					isSwiping = false;
					restartTimer();
				},
				{ passive: true }
			);
		}
	}

	/* =======================
	   MENÚ HAMBURGUESA NAV
	   ======================= */
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.site-header nav');

	if (navToggle && nav) {
		navToggle.addEventListener('click', () => {
			const isOpen = document.body.classList.toggle('nav-open');
			navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});

		nav.querySelectorAll('a').forEach((link) => {
			link.addEventListener('click', () => {
				if (document.body.classList.contains('nav-open')) {
					document.body.classList.remove('nav-open');
					navToggle.setAttribute('aria-expanded', 'false');
				}
			});
		});
	}

	/* =======================
	   FAB (botón flotante)
	   ======================= */
	const fabWrap = document.querySelector('.fab-wrap');
	const fabMain = document.getElementById('fab-main');
	const fabActions = fabWrap ? fabWrap.querySelector('.fab-actions') : null;

	if (fabWrap && fabMain && fabActions) {
		fabMain.addEventListener('click', () => {
			const isOpen = fabWrap.classList.toggle('open');
			fabMain.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			fabActions.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
		});
	}
});

