/**
 * 第二次调用相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api", "people/finishPhoto", "lrz", "localImg", "mobileBUGFix", "viewport", "exif"], function ($, art, cameraTpl, API, finishPhoto, lrz) {
    return function (faceimage1, facedata1) {
        var $camera = $(cameraTpl);

        $(".module-container").append($camera);

        $("#file").trigger("click");

        $('#file').on('change', function () {
            lrz(this.files[0],{width:640})
                .then(function (rst) {
                    // 处理成功会执行
                    console.log(rst);
                    var output = rst.base64; //获取base64位图片信息      

                    var base64Data = output.substr(22);

                    // 将图片上传到服务器
                    API.uploadImage(base64Data, function (res) {
                        if (res.code != 0) {
                            alert(res.message)
                            return
                        }
                        var faceimage2 = res.data.faceimage;
                        var facedata2 = res.data.facedata;
                        $("#file").on("click", function () {
                            finishPhoto(faceimage2, facedata2);
                        })
                        $("#file").trigger("click");

                    })
                })
                .catch(function (err) {
                    // 处理失败会执行
                })
                .always(function () {
                    // 不管是成功失败，都会执行
                });
        })
        // .localResizeIMG({
        //     width: 640, //默认尺寸640 
        //     quality: 0.8, //体积压缩20%
        //     before: function (that, blob) { //图片上传前信息
        //         // $('.msk').show();
        //     },
        //     success: function (result) { //图片上传成功后   
        //         // $('.msk').hide();

        //         var output = result.base64; //获取base64位图片信息      

        //         var base64Data = output.substr(22);

        //         // 将图片上传到服务器
        //         API.uploadImage(base64Data, function (res) {
        //             if (res.code != 0) {
        //                 alert(res.message)
        //                 return
        //             }
        //             var faceimage2=res.data.faceimage;
        //             var facedata2=res.data.facedata;
        //             $("#file").on("click",function(){
        //                 finishPhoto(faceimage2,facedata2);
        //             })
        //             $("#file").trigger("click");

        //         })
        //     }
        // });
    };
});