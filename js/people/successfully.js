/**
 * 拍照成功模块
 * Author:land
 *   Date:2017/9/22
 */
define(["jquery", "artTemplate", "text!tpls/successfully.html"], function ($, art, successfullyTpl) {
    return function () {
        var $successfully = $(successfullyTpl);
        $(".module-container").append($successfully);
        $(".step4").addClass('black');
        $(".step3").removeClass('black');
    };
});