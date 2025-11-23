(function(){
	const slides = document.getElementById('slides');
	const slidesCount = slides.children.length;
	const indicators = document.getElementById('indicators');
	let idx = 0, timer = null;

	// create indicators
	for(let i=0;i<slidesCount;i++){
		const dot = document.createElement('div');
		dot.className='indicator'+(i===0? ' active':'');
		dot.dataset.index = i;
		dot.addEventListener('click', ()=>{ goTo(i); });
		indicators.appendChild(dot);
	}

	function update(){
		slides.style.transform = `translateX(-${idx*100}%)`;
		Array.from(indicators.children).forEach((d,i)=> d.classList.toggle('active', i===idx));
	}
	function next(){ idx = (idx+1)%slidesCount; update(); }
	function prev(){ idx = (idx-1+slidesCount)%slidesCount; update(); }
	function goTo(i){ idx = i%slidesCount; update(); restartTimer(); }

	document.querySelector('.hero-controls .next').addEventListener('click', ()=>{ next(); restartTimer(); });
	document.querySelector('.hero-controls .prev').addEventListener('click', ()=>{ prev(); restartTimer(); });

	function restartTimer(){ clearInterval(timer); timer = setInterval(next,4000); }
	timer = setInterval(next,4000);
	// pause on hover
	const hero = document.querySelector('.hero');
	hero.addEventListener('mouseenter', ()=> clearInterval(timer));
	hero.addEventListener('mouseleave', restartTimer);
	// no additional JS editor (design-only)
})();
