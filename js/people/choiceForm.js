/**
 * 选择身份界面
 * Created by landon 2017/9/22.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/choiceForm.html","people/add","people/visitantAdd"], function ($, art, API, choiceFormTpl,add,visitantAdd) {
    return function (faceimages2,facedatas2) {
        $(".module-container").empty();
        //编译模板
        var $choiceForm=$(choiceFormTpl);
        var faceimages2=faceimages2;
        var facedatas2=facedatas2;
        var faceimages1=$("#btnPeopleManager").attr("faceimage");
        console.log(faceimages2,facedatas2)
        //选择身份界面点击事件
        $choiceForm
            .on("click", ".employee", function () {
                //加载添加员工模块
                add(faceimages2,facedatas2);
            })
            .on("click", ".visitor", function () {
                //加载添加访客模块
                visitantAdd(faceimages2,facedatas2);
            })
            
        //把渲染好的元素放到页面中
        $(".module-container").append($choiceForm);
        $(".step2").addClass('black');
        $(".step1").removeClass('black');
        $(".pic1").attr("src",faceimages1);
        $(".pic2").attr("src",faceimages2);
    }
});