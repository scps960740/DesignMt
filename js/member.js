$(document).ready(function () {

    if(localStorage.getItem('Logining') != 'true'){
        location.href="./index.html";
    }

    var ImgBase64 = '';

    var testarray = [];

    var PersonImgArray = [];

    var Person = new Vue({
        el: '#Person',
        data: {
            person: {
                email: '',
                sex: '',
                pimg: ''
            },
            test: function () {


            }
        },
        created() {

            let vm = this;


            $.post('http://13.230.19.21/Mtphp/api.php', {

                    Action: 'GetUserData',
                    Email: 'scps960740@gmail.com'

                }, (data) => {

                    let obj = $.parseJSON(data);
                    Person.email = obj.email;
                    Person.sex = obj.sex;
                    Person.pimg = obj.pimg;

                    Vue.set(vm.person, 'email', obj.email);
                    Vue.set(vm.person, 'sex', obj.sex);
                    Vue.set(vm.person, 'pimg', obj.pimg);


                })
                .fail((err) => {

                });

        },
        updated() {
            console.log('updated');
        }

    });

    var PersonImg = new Vue({
        el: '#PersonImg',
        data: {
            person: {
                img: []
            },
            test: function () {


            }
        },
        created() {

            let vm = this;

            $.post('http://13.230.19.21/Mtphp/api.php', {

                    Action: 'GetUserImg',
                    Email: 'scps960740@gmail.com'

                }, (data) => {

                    let obj = $.parseJSON(data);
                    obj.forEach((value, index) => {

                        PersonImgArray[index] = {
                            img: 'http://13.230.19.21/img/' + value.src,
                        }

                    });

                    Vue.set(vm.person, 'img', PersonImgArray);


                })
                .fail((err) => {

                });

        },
        updated() {
            console.log('updated');
        }

    });

    var PersonUpload = new Vue({
        el: '#PersonUpload',
        data: {
            upload: {
                title: '',
                content: ''
            },
        },
        created() {

        }

    });

    var GoUpload = new Vue({
        el: '#GoUpload',
        data: {
            upload: {

            },
            uploadToDB: function () {

                if (confirm("確定上傳？")) {

                    if(PersonUpload.upload.title == '' || PersonUpload.upload.content == '' || ImgBase64 == ''){

                        alert('請輸入作品描述或上傳圖片');

                    }else{
                        $.post('http://13.230.19.21/Mtphp/api.php', {

                            Action: 'UploadWorks',
                            Email: 'scps960740@gmail.com',
                            WorkTitle: PersonUpload.upload.title,
                            WorkContent: PersonUpload.upload.content,
                            WorkImgBase64: ImgBase64
    
                        }, (data) => {
    
                            let obj = $.parseJSON(data);
                            // Person.email = obj.email;
                            // Person.sex = obj.sex;
                            // Person.pimg = obj.pimg;
    
                            // Vue.set(vm.person, 'email', obj.email);
                            // Vue.set(vm.person, 'sex', obj.sex);
                            // Vue.set(vm.person, 'pimg', obj.pimg);

                            alert('上傳成功！');


    
    
                        })
                        .fail((err) => {
    
                        });
                    }

                   
                } else {

                    
                }

                console.log(PersonUpload.upload.title + PersonUpload.upload.content + ImgBase64);
                

            }
        },
        created() {

        }


    });

    function readFile() {

        if (this.files && this.files[0]) {

            var FR = new FileReader();

            FR.addEventListener("load", function (e) {
                document.getElementById("img").src = e.target.result;
                ImgBase64 = e.target.result;

            });

            FR.readAsDataURL(this.files[0]);
        }

    }
    document.getElementById("inp").addEventListener("change", readFile);


});