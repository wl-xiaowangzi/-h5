/**
 * 自助申请指引界面
 * Created by landon 2017/9/22.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/peopleGuide.html","common/camera","common/secCamera"], function ($, art, API, peopleGuideTpl,camera,secCamera) {
    return function () {
        //编译模板
        var $peopleGuide=$(peopleGuideTpl);
        
        //指引界面点击事件
        $peopleGuide
            .on("click", ".noGlasses", function () {
                //加载照相模块
                secCamera();
            })
            .on("click", ".withGlasses", function () {
                //加载两次照相模块
                camera();
            })
            
        //把渲染好的元素放到页面中
        $(".module-container").append($peopleGuide);
        $(".step1").addClass('black')
    }
});