/**
 * 继续拍照界面
 * Created by landon 2017/9/21.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/continuePhoto.html","common/secCamera"], function ($, art, API, continuePhotoTpl,secCamera) {
    return function (faceimage1,facedata1) {
        $(".module-container").empty();
        //编译模板
        var $continuePhoto=$(continuePhotoTpl);
        var faceimage1=faceimage1;
        var facedata1=facedata1;
        console.log(faceimage1);
        //指引界面点击事件
        $continuePhoto
            .on("click", ".secPhoto", function () {
                //加载照相模块
                secCamera(faceimage1,facedata1);
            })
            
        //把渲染好的元素放到页面中
        $(".module-container").append($continuePhoto);
        $(".step1").addClass('black');
        $(".firstPic").attr("src",faceimage1)
    }
});