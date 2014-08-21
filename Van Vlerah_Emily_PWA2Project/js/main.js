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
        $('#overlay').fadeOut().find('#modal').fadeOut();
    });

/****** Fade Status Option ******/
    $('.mystatus').mouseover(function() {
        $(this).fadeTo(100, .3);
    });

    $('.mystatus').mouseout(function() {
        $(this).fadeTo(100, 1);
    });


/****** Tabbed Accordion for Projects Page ******/
    $('#tabs p').hide().eq(0).show();
    $('#tabs p:not(:first)').hide();

    $('#tabs-nav li').click(function(e) {
        e.preventDefault();
        $('#tabs p').hide();

        $('#tabs-nav .current').removeClass("current");
            $(this).addClass('current');
            var clicked = $(this).find('a:first').attr('href');

            $('#tabs ' + clicked).fadeIn('fast');
    }).eq(0).addClass('current');


/****** Login ******/
    $('#loginButton').click(function(){
        var user = $('#user').val();
        var pass = $('#pass').val();

        console.log("This notifies you if the password is working.");

        $.ajax({
            url: 'whr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            },

            success:function(response){
                console.log("Test User");
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html');
                }
            }
        });
    });


/****** Logout ******/
    $('#logOut').click(function(e){
        e.preventDefault();
        $.get('xhr/logout.php', function(){
            window.location.assign('index.html')
        })
    });


/****** Register ******/
$('#register').click(function(){
    var firstname = $('#first').val(),
        lastname = $('#last').val(),
        username = $('#userName').val(),
        email = $('#email').val(),
        password = $('#password').val();

    console.log(firstname+ '' +lastname+ '' +username+ '' +email+ '' +password);

    $.ajax({
        url: 'whr/register.php',
        type: 'post',
        dataType: 'json',
        data: {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password
        },

        success:function(response){
            if(response.error){
                alert(response.error);
            }else{
                window.location.assign('admin.html');
            }
        }
    });
});


/****** Project Page Button ******/
    $('.projectsbtn').on('click', function(e){
        e.preventDefault();
        window.location.assign('projects.html');
    });


/****** Add Button ******/
    $('.addButton').on('click', function(e){
        e.preventDefault();
        window.location.assign('projects.html');
    });


/****** Dashboard Button ******/
    $('.dashboardbtn').on('click', function(e){
        e.preventDefault();
        window.location.assign('admin.html');
    });


/****** Display Username ******/
    $.getJSON("xhr/check_login.php", function(data){
        console.log(data);
        $.each(data, function(key, val){
            console.log(val.first_name);
            $(".userid").html("Welcome User: " + val.first_name);
        })
    });



})(jQuery);