/**
 * 完成拍照界面
 * Created by landon 2017/9/22.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/finishPhoto.html","people/choiceForm"], function ($, art, API, finishPhotoTpl,choiceForm) {
    return function (faceimage2,facedata2) {
        $(".module-container").empty();
        //编译模板
        var $finishPhoto=$(finishPhotoTpl);
        console.log(faceimage2,facedata2);
        //指引界面点击事件
        $finishPhoto
            .on("click", ".choiceForm", function () {
                //加载照相模块
                choiceForm(faceimage2,facedata2);
            })
            
        //把渲染好的元素放到页面中
        $(".module-container").append($finishPhoto);
        $(".step1").addClass('black');
        $(".secondPic").attr("src",faceimage2)
    }
});