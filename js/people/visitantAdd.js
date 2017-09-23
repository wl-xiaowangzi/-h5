/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleVisitantAdd.html", "common/api", "common/camera", "datetimepicker", "datetimepickerLang"], function ($, art, peopleVisitantAddTpl, API, camera) {
    return function (faceimages,facedatas) {
        $(".module-container").empty();

        var $peopleVisitantAdd = $(peopleVisitantAddTpl);
        var firstFaceimages=faceimages;
        var firstFacedatas=facedatas;

        $peopleVisitantAdd.on("click",".verification",function(){
                var phonenumber = $(".phonenumber").val();
                API.getVerifcode(phonenumber,function(res){
                    // 收到短信
                    var time = 60;
                    var timename =setInterval(function(){
                        if(time>1){
                            time--
                            $(".verification").addClass("forbidden").attr({"disabled":"disabled"}).html(time+"S后可重发");
                        }else{
                            clearInterval(timename);
                            $(".verification").removeClass("forbidden").removeAttr("disabled").html("获取验证码");
                        }
                        
                    },1000)
                   
                })
                return false;
            })
        $peopleVisitantAdd.on("click", ".btn-blue", function () {
                var deviceids=$.cookie("deviceids");
                var secondFaceimages = $("#btnPeopleManager").attr("faceimage");
                var secondFacedatas = $("#btnPeopleManager").attr("facedata");
                $("#btnPeopleManager").removeAttr("faceimage");
                    $("#btnPeopleManager").removeAttr("facedata");
                    if(secondFaceimages==undefined){
                        faceimages=firstFaceimages;
                        facedatas="["+firstFacedatas+"]";
                    }else{
                        var faceimages = firstFaceimages + "," + secondFaceimages;
                        var facedatas = "["+firstFacedatas+"]|"+"["+secondFacedatas+"]";
                    }
                var birthday = $(".birthday-join").val();
                var phonenumber = $(".phonenumber").val();
                var name = $(".name").val();
                var remark = $(".remark").val();
                var starttime = $(".starttime").val();
                var endtime = $(".endtime").val();
                var sex = $(".sex").val();
                var verifcode = $(".verifcode").val();
                var deviceids = "SB001";
                console.log(birthday,phonenumber,starttime)
                API.addVisitor(verifcode,deviceids,name, sex, birthday, phonenumber,starttime,endtime, remark, faceimages, facedatas, function (res) {
                    //成功申请，跳转到成功页面
                    successfully()
                })
                return false; //阻止同步提交表单
            });

        $(".module-container").append($peopleVisitantAdd);
        $(".step3").addClass('black');
        //渲染入职日期-->日期控件
        $peopleVisitantAdd.find(".date-join").datetimepicker({
            weekStart: 1, //一周从哪一天开始。0（星期日）到6（星期六）
            format: 'yyyy-mm-dd HH:mm:ss',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            language: "zh-CN"
        });
        $peopleVisitantAdd.find(".birthday-join").datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            startView: 4,
            minView: 2,
            forceParse: false,
            language: 'zh-CN'
        });
    };
});