/**
 * 添加访客
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleVisitantAdd.html", "common/api", "people/successfully", "datetimepicker", "datetimepickerLang"], function ($, art, peopleVisitantAddTpl, API, successfully) {
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
                var organizationid = $(".organizationid").val();
                var deviceids = "SB001";
                console.log(verifcode,organizationid,deviceids,name, sex, birthday, phonenumber,starttime,endtime, remark, faceimages, facedatas)
                API.addVisitor(verifcode,organizationid,deviceids,name, sex, birthday, phonenumber,starttime,endtime, remark, faceimages, facedatas, function (res) {
                    //成功申请，跳转到成功页面
                    successfully()
                })
                return false; //阻止同步提交表单
            });

        $(".module-container").append($peopleVisitantAdd);
        $(".step3").addClass('black');
        //渲染入职日期-->日期控件
        var calendar = new LCalendar();
        calendar.init({
            'trigger': '#birthday,#starttime,#endtime', //标签id
            'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
        });
        var calendar1 = new LCalendar();
        calendar1.init({
            'trigger': '#starttime', //标签id
            'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
        });
        var calendar2 = new LCalendar();
        calendar2.init({
            'trigger': '#endtime', //标签id
            'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
        });
    };
});