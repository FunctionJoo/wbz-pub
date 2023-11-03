document.addEventListener('DOMContentLoaded', () => {
	const mainSwiper = new Swiper('.main_visual .swiper', {
		slidesPerView: 1,
		spaceBetween: 100,
		loop: true,
		loopAdditionalSlides: 2,
	});

	const asideSwiper = new Swiper('.side_slide .swiper', {
		slidesPerView: 1,
		loop: true,
		pagination: {
			el: '#sidebar .swiper-pagination-c',
			bulletElement: 'button'
		}
	});
});