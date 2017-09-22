/**
 * 2017.9.11
 * Created by land
 */
// 配置文件路径
require.config({
    baseUrl: "./js",
    paths: {
        jquery: "lib/jquery-2.1.4",
        localImg:"lib/LocalResizeIMG",
        viewport:"lib/viewport",
        exif:"lib/exif",
        mobileBUGFix:"lib/mobileBUGFix.mini",
        localImg:"lib/LocalResizeIMG",
        cookie: "lib/jquery.cookie",
        text: "lib/text",
        artTemplate: "lib/template-web",
        bootstrap: "../assets/bootstrap/js/bootstrap",
        //配置模板文件夹的路径
        tpls: "../tpls",
        datetimepicker: "../assets/datetimepicker/js/bootstrap-datetimepicker",
        daterangepicker: "../assets/daterangepicker/js/daterangepicker",
        moment: "../assets/daterangepicker/js/moment.min",
        datetimepickerLang: "../assets/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
    },
    // 设置依赖
    shim: {
        bootstrap: {
            deps: ["jquery"]
        },
        datetimepickerLang: {
            deps: ["datetimepicker"]
        },
        daterangepicker: {
            deps: ["moment"]
        },
        localImg: {
            deps: ["jquery"]
        },
        mobileBUGFix: {
            deps: ["jquery"]
        },
    }
})

//因为checkLogin依赖了cookie，所以cookie已经被加载
require(["jquery", "artTemplate", "common/api","people/guide","people/add","people/visitantAdd"], function ($, art, API,peopleGuide,addEmployee,addVisitor) {

    $("#btnEmployeeApply").on("click", function () {
        $(".module-container").empty();
        addEmployee();
    })
    $("#btnVisitorApply").on("click", function () {
        $(".module-container").empty();
        addVisitor();
    })



     //希望一开始就渲染出指引界面
    //  -->触发指引界面的点击事件
    $("#btnPeopleGuide").on("click", function () {
        $(".module-container").empty();
        peopleGuide();
    })
    $("#btnPeopleGuide").trigger("click");

})