/**
 * 相机
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/camera.html", "common/api", "people/continuePhoto", "lrz" ,"localImg", "mobileBUGFix", "viewport", "exif"], function ($, art, cameraTpl, API, continuePhoto,lrz) {
    return function () {
        var $camera = $(cameraTpl);

        $(".module-container").append($camera);

        $("#file").trigger("click");

        $('#file').on('change', function () {
            lrz(this.files[0], {
                    width: 640
                })
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
                        var faceimage1 = res.data.faceimage;
                        var facedata1 = res.data.facedata;
                        $("#btnPeopleManager").attr("faceimage",res.data.faceimage);
                        $("#btnPeopleManager").attr("facedata",res.data.facedata);
                        $("#file").on("click", function () {
                            continuePhoto(faceimage1, facedata1);
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

    };
});