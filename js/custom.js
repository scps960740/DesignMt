$(document).ready(function () {

    var wid = $(window).width();

    var testarray = [];

    var PimgArray = [];




    var color1 = false;
    var color2 = false;
    var color3 = false;
    var status = '';




    if (localStorage.getItem('Logining') == 'true') {
        console.log('登入中');
        if (wid > 768) {
            $('.TopBarFlex').css({
                "display": "none"
            });
            $('.TopBarFlexLogin').css({
                "display": "flex"
            });
        } else {

            $('.SidePhoneNoLogin').css({
                "display": "none"
            });
            $('.SidePhoneLogin').css({
                "display": "block"
            });
        }

    } else {
        if (wid > 768) {

            console.log('未登入');
            $('.TopBarFlex').css({
                "display": "flex"
            });
            $('.TopBarFlexLogin').css({
                "display": "none"
            });

        } else {
            $('.SidePhoneNoLogin').css({
                "display": "block"
            });
            $('.SidePhoneLogin').css({
                "display": "none"
            });
        }

    }

    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 300, // Transition out duration
        startingTop: '10%', // Starting top style attribute
        endingTop: '10%', // Ending top style attribute
        ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.

        },
        complete: function () {} // Callback for Modal close
    });

    $(".button-collapse").sideNav();

    var imgGroup = new Vue({
        el: '#imgGroup',
        data: {

            parentMessage: true,
            image: {


            },
            imgclick: function (id, email) {

                // if(email == localStorage.getItem('email')){

                //     location.href='./myself_shop.html?'+id + '&' + email;

                // }else{

                location.href = './shop.html?' + id + '&' + email;

                //}

            }
        },
        created() {

            let vm = this;
            console.log(vm);
            Vue.set(vm.image, 'items', []);

            $.post('http://13.230.19.21/Mtphp/api.php', {

                    Action: 'GetIndexData',

                }, (data) => {

                    let obj = $.parseJSON(data);
                    obj.forEach((value, index) => {

                        console.log(value + index);

                        if (value.vote == '1') {

                            color1 = true;
                            color2 = false;
                            color3 = false;
                            status = '投票中';

                        }
                        if (value.sell == '1') {

                            color1 = false;
                            color2 = true;
                            color3 = false;
                            status = '販賣中';

                        }
                        if (value.auction == '1') {

                            color1 = false;
                            color2 = false;
                            color3 = true;
                            status = '二手交流';

                        }

                        testarray[index] = {
                            img: 'http://13.230.19.21/img/' + value.src,
                            color_1: color1,
                            color_2: color2,
                            color_3: color3,
                            status: status,
                            pimg: 'url(./img/person' + index + '.jpeg)',
                            email: value.email,
                            pid: value.src
                        };

                    });


                    Vue.set(vm.image, 'items', testarray);
                    console.log(vm.image);


                })
                .fail((err) => {

                });

        },
        updated() {
            console.log('updated');
        }

    });

});





$('.CloseBtn').click(() => {

    $('#LoginOrSignUp').modal('close');
    $('#UploadWork').modal('close');

});

$('.GoImgPage').click(function () {
    $('html,body').animate({
        scrollTop: $('#test').offset().top
    }, 600);
});


$('.Logout').click(function () {
    localStorage.setItem('Logining', 'false');
    checkLoginState();
    window.location.reload();

});


function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

}

function statusChangeCallback(response) {

    if (response.status === 'connected') {
        FB.logout(function (response) {
            // Person is now logged out
            console.log(response);
        });
    }
}