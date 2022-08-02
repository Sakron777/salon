


    /////////////////////////////intro


let slider = $("#Sliders");

/*Для слайдов мы подключили библиотеку по ссылке и скопировали код с сайта*/

/*Вызываем для нашего элемента слайдер.
infinite: true, - будет скролить все время.
slidesToShow: 1, - сколько мы хотим показывать слайдов
slidesToScroll: 1 - сколько мы будем сколить слайдов при клике на скрол
fade: true - затемнение отзывов, один появлялся, другой исчезал
arrows: false - убирает кнопки в слайдере
dots:true - добавляет точки для скролла*/

slider.slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    fade: false,
    arrows: true,
    dots:true,
    autoplay: true,
    autoplaySpeed: 5000,

    appendDots: $('.slider-dots-box'),
	dotsClass: 'slider-dots'
  });


 // On before slide change
$('.intro__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    $('.slider-dots-box button').html('');
  }).trigger('beforeChange');

  // On before slide change
  $('.intro__slider').on('afterChange', function(event, slick, currentSlide){
    $('.slider-dots-box button').html('');
       $('.slider-dots-box .slick-active button')
           .html(`<svg class="progress-svg" width="40" height="40">
          <g transform="translate(10,10)">
        <circle class="circle-go" r="8" cx="-" cy=""></circle>
        <text class="circle-tx" x="0" y="4" alignment-baseline="middle" stroke-width="0" text-anchor="middle">
          </g>
      </svg>`);
  }).trigger('afterChange');

  slider.on('init', function(slick){
    slider.css('opacity', 1);
  });





  let slider2 = $("#SliderTwo");


slider2.slick({
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    fade: false,
    arrows: true,
    dots:false,
    prevArrow: $('.button-prev'),
    nextArrow: $('.button-next'),
    autoplay: true,
    autoplaySpeed: 5000,
  });

