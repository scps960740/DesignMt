$(document).ready(function () {


    var url = location.href;

    var temp = url.split("?");

    if (temp[1] == null || temp[1] == undefined) {
        location.href = "./index.html";
    }

    var vars = temp[1].split("&");

    var Price;

    var ShopPerson = new Vue({
        el: '#ShopPerson',
        data: {
            shopperson: {

                img: '',
                email: '',
                title: '',
                content: '',
                count: '',
                btntext: ''
            },
            BtnClick: function (e) {



                if (e == '投票') {

                    if (confirm("確定投票？")) {

                        // $.post('http://13.230.19.21/Mtphp/api.php', {

                        //         Action: 'CheckVote',
                        //         Email: 'scps960740@gmail.com'

                        //     }, (data) => {

                        //         let obj = $.parseJSON(data);

                        //         if (obj.vote == '1') {

                                   
                        //         } else {

                        //             alert('您今日已投過票！');

                        //         }




                        //     })
                        //     .fail((err) => {

                        //     });

                        $.post('http://13.230.19.21/Mtphp/api.php', {

                            Action: 'AddVote',
                            Email: 'scps960740@gmail.com',
                            Img: vars[0],

                        }, (data) => {

                            let obj = $.parseJSON(data);
                            if(obj.Status == 'success'){

                                window.location.reload();

                            }else{

                                alert('您今日已投過票！');

                            }
                           


                        })
                        .fail((err) => {

                        });



                    } else {

                    }





                } else if (e == '購買') {

                    alert('導向購買頁面...');

                    $.post('http://13.230.19.21/Mtphp/api.php', {

                            Action: 'SetPrice',
                            Price: Price

                        }, (data) => {

                            let obj = $.parseJSON(data);

                            location.href = "http://13.230.19.21/Mtphp/pay.php";


                        })
                        .fail((err) => {

                        });



                }


            }

        },

        created() {

            let vm = this;

            $.post('http://13.230.19.21/Mtphp/api.php', {

                    Action: 'GetShopPageImg',
                    Email: vars[1],
                    Img: vars[0]

                }, (data) => {

                    let obj = $.parseJSON(data);

                    // let vm = ShopPerson;

                    console.log(obj.src);

                    Vue.set(vm.shopperson, 'img', 'http://13.230.19.21/img/' + obj.src);
                    Vue.set(vm.shopperson, 'email', obj.email);
                    Vue.set(vm.shopperson, 'title', obj.title);
                    Vue.set(vm.shopperson, 'content', obj.content);

                    Price = obj.sell_total;

                    if (obj.vote == '1') {

                        Vue.set(vm.shopperson, 'count', '投票數：' + obj.vote_count);
                        Vue.set(vm.shopperson, 'btntext', '投票');

                    } else {

                        Vue.set(vm.shopperson, 'count', '');
                    }

                    if (obj.sell == '1') {

                        Vue.set(vm.shopperson, 'count', '售價：' + obj.sell_total);
                        Vue.set(vm.shopperson, 'btntext', '購買');

                    } else {


                    }

                    if (obj.auction == '1') {

                        Vue.set(vm.shopperson, 'count', '售價：' + obj.sell_total);
                        Vue.set(vm.shopperson, 'btntext', '購買');

                    } else {


                    }



                })
                .fail((err) => {

                });

        }


    });

});