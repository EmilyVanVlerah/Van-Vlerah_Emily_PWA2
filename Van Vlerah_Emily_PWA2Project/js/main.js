/**
 Name: Emily Van Vlerah
 PWA2 1408
 */




(function($){

/****** ========================================================================================== ******/
/****** Project Page ******/


    /****** Add Modal ******/
    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay').fadeIn().find('#modal').fadeIn();
    });

    $('.close').on('click', function(event){
        event.preventDefault();
        $('#overlay').fadeOut().find('#modal').fadeOut();
    });

    /****** Date picker for on the modal ******/
    $( "#projectDueDate" ).datepicker();


    /****** Fade Status Option ******/
    $('.mystatus').mouseover(function() {
        $(this).fadeTo(100, .3);
    });

    $('.mystatus').mouseout(function() {
        $(this).fadeTo(100, 1);
    });


    /****** New Projects ******/
    $('#addButton').on('click', function(){
        var projName = $('#projectName').val(),
            projFlo = $('#projectFlowers').val(),
            projAcc = $('#projectAccents').val(),
            projDue = $('#projectDueDate').val(),
            status = $('input[name = "status"]:checked').prop("id");

        $.ajax({
            url: 'xhr/new_project.php',
            type: 'post',
            dataType: 'json',
            data: {
                projectName: projName,
                projectDescription: projFlo,
                projectAccents: projAcc,
                dueDate: projDue,
                status: status

            },

            success:function(response){
                console.log("Test for Success");
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('projects.html');
                }
            }
        });
    });


    /****** Get Projects ******/
    var projects = function(){
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success:function(response){
                if(response.error){
                    console.log(response.error);
                }else{
                    for(var i= 0, j=response.projects.length; i < j; i++){
                      var result = response.projects[i];

                      $('.projects').append(
                          '<div style = "border: 5px solid #a4a063">' + '<div style = "padding: 5px">' +
                          "<input class='projectid' type='hidden' value='" + result.id + "'>" +
                          "Project Name: " + result.projectName + "<br>" +
                          "Project Flowers: " + result.projectFlowers + "<br>" +
                          "Project Accents: " + result.projectAccents + "<br>" +
                          "Project Due Date: " + result.projectDueDate + "<br>" +
                          "Project Status: " + result.status + "<br>"
                          + '<button class="deletebtn">Delete</button>'
                          + '<button class="editbtn">Edit</button>'
                          +'</div> <br>'
                      );
                    };

                    $('.deletebtn').on('click', function(e){
						var pid = $(this).parent().find(".projectid").val();
                       console.log('test delete');
                        $.ajax({
                            url: 'xhr/delete_project.php',
                            data: {
                                projectID: pid
                            },
                            type: 'POST',
                            dataType: 'json',
                            success: function(response){
                                console.log('Testing for success');

                                if(response.error){
                                    console.log(response.error);
                                }else{
                                    window.location.assign('projects.html');
                                };
                            }
                        });
                    });
 
            }	
        }
    })
}
projects();


    /****** Sortable UI ******/
    $( "#projectList" ).sortable();
    $( "#projectList" ).disableSelection();








/****** ========================================================================================== ******/
/****** Admin Page ******/


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

    /****** Tabs UI ******/
    $(function() {
        $( "#tabs" ).tabs();
    });








/****** ========================================================================================== ******/
/****** Index + Register Page ******/


    /****** Login ******/
    $('#loginButton').click(function(){
        var user = $('#user').val();
        var pass = $('#pass').val();

        console.log("This notifies you if the password is working.");

        $.ajax({
            url: 'xhr/login.php',
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
        var username = $('#userName').val(),
            email = $('#email').val(),
            password = $('#password').val();

        console.log(username+ '' +email+ '' +password);

        $.ajax({
            url: 'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
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








/****** ========================================================================================== ******/
/****** All buttons ******/


    /****** Project Page Button ******/
    $('.projectsbtn').on('click', function(e){
        e.preventDefault();
        window.location.assign('projects.html');
    });


    /****** Profile Page Button ******/
    $('.profilebtn').on('click', function(e){
        e.preventDefault();
        window.location.assign('profile.html');
    });


    /****** Add Button ******/
    $('.addButton').on('click', function(e){
        e.preventDefault();
        window.location.assign('#projectsList');
    });


    /****** Dashboard Button ******/
    $('.dashboard').on('click', function(e){
        e.preventDefault();
        window.location.assign('admin.html');
    });

    /****** Sign Up Button ******/
    $('.signupButton').on('click', function(e){
        e.preventDefault();
        window.location.assign('register.html');
    });

    /****** Sign Up Button ******/
    $('.save').on('click', function(e){
        e.preventDefault();
        window.location.assign('profile.html');
    });








/****** ========================================================================================== ******/
/****** Pages after Index and Register ******/


    /****** Display Username ******/
    $.getJSON("xhr/check_login.php", function(data){
        console.log(data);
        $.each(data, function(key, val){
            console.log(val.first_name);
            $(".userid").html("Welcome User: " + val.first_name);
        })
    });








/****** ========================================================================================== ******/
/****** Profile Page ******/


    /****** Tabs UI ******/
    $(function() {
        $( "#info" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
        $( "#info li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );


        /****** Autocomplete + Scrollable UI ******/
         var availableTags = [
             "Alabama",
             "Alaska",
             "Arizona",
             "Arkansas",
             "California",
             "Colorado",
             "Connecticut",
             "Delaware",
             "Florida",
             "Georgia",
             "Hawaii",
             "Idaho",
             "Illinois",
             "Indiana",
             "Iowa",
             "Kansas",
             "Kentucky",
             "Louisiana",
             "Maine",
             "Maryland",
             "Massachusetts",
             "Michigan",
             "Minnesota",
             "Mississippi",
             "Missouri",
             "Montana",
             "Nebraska",
             "Nevada",
             "New Hampshire",
             "New Jersey",
             "New Mexico",
             "New York",
             "North Carolina",
             "North Dakota",
             "Ohio",
             "Oklahoma",
             "Oregon",
             "Pennsylvania",
             "Rhode Island",
             "South Carolina",
             "South Dakota",
             "Tennessee",
             "Texas",
             "Utah",
             "Vermont",
             "Virginia",
             "Washington",
             "West Virginia",
             "Wisconsin",
             "Wyoming"
         ];

         $( "#state" ).autocomplete({
         source: availableTags
         });


    });



})(jQuery);