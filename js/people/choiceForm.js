/**
 * 选择身份界面
 * Created by landon 2017/9/22.
 */
define(["jquery", "artTemplate", "common/api", "text!tpls/choiceForm.html","people/add","people/visitantAdd"], function ($, art, API, choiceFormTpl,camera,add,visitantAdd) {
    return function () {
        //编译模板
        var $choiceForm=$(pchoiceFormTpl);
        
        //选择身份界面点击事件
        $choiceForm
            .on("click", ".employee", function () {
                //加载添加员工模块
                add();
            })
            .on("click", ".visitor", function () {
                //加载添加访客模块
                visitantAdd();
            })
            
        //把渲染好的元素放到页面中
        $(".module-container").append($choiceForm);
        $(".step2").addClass('black');
        $(".step1").removeClass('black');
    }
});