/**
 * Name: Emily Van Vlerah
 PWA2 1408
 */

(function($){

/****** Add Modal ******/
    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay').fadeIn().find('#modal').fadeIn();
    });

    $('.close').on('click', function(event){
        event.preventDefault();
        $('#overlay').fadeIn().find('#modal').fadeIn();
    });

/****** Fade Status Option ******/
    $('.mystatus').mouseover(funtion() {
        $(this).fadeOut(100, .3);
    });

    $('.mystatus').mouseout(funtion() {
        $(this).fadeTo(100, 1);
    });


/****** Tabbed Accordion for Projects Page ******/
    $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();

    $('#tabs-nav li').click(funtion(e) {
        e.preventDefault();
        $('#tabs p').hide();

        $('#tabs-nav .current').removeClass("current");
            $(this).addClass('current');
            var clicked = $(this).find('a:first').attr('href');

            $('#tabs' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');


})(jQuery);