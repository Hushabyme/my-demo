$(document).ready(function () {

    $(window).scroll(function () {
        var goTop = $(this).scrollTop();
        if(goTop > 500){
            $('.top').stop().fadeIn();
        }else{
            $('.top').stop().fadeOut();
        }
    });

    $('.top').click(function () {
        $("body,html").stop().animate({scrollTop:0},500);
    })
});
