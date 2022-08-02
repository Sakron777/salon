$(document).ready(function() {
    $('.header-two__spoller').click(function (event) {
        if($('.header__two-list').hasClass('one')){
            $('.header-two__spoller').not($(this)).removeClass('active');
            $('.header-two-items').not($(this).next()).slideUp('300');
        }
        $(this).toggleClass('active').next().slideToggle(200)
    });
});


//mobile

$(document).ready(function() {
    $('.header-mobile__spoller').click(function (event) {
        if($('.header__mobile-list').hasClass('one')){
            $('.header-mobile__spoller').not($(this)).removeClass('active');
            $('.header-mobile-items').not($(this).next()).slideUp('300');
        }
        $(this).toggleClass('active').next().slideToggle(200)
    });
});
