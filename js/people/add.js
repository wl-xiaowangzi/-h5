/**
 * 添加员工
 * Author:land
 *   Date:2017/9/5
 */
define(["jquery", "artTemplate", "text!tpls/peopleAdd.html", "common/api","people/successfully", "datetimepicker", "datetimepickerLang"], function ($, art, peopleAddTpl, API,successfully) {
    return function (faceimages,facedatas) {
        $(".module-container").empty();

        var $peopleAdd = $(peopleAddTpl);
        var firstFaceimages = faceimages;
        var firstFacedatas = facedatas;
            
            $peopleAdd.on("click",".verification",function(){
                var phonenumber = $(".phonenumber").val();
                $(".organizationid").trigger("click");
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
            $peopleAdd.on("click",".organizationid",function(){
                        var organizationid = $(".organizationid").val();
                        API.queryDevice(organizationid,function(res){
                            console.log(res)
                        })
                    })
                    
            $peopleAdd.on("click", ".btn-blue", function () {
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
                    var name = $(".name").val();
                    var job = $(".job").val();
                    var employeenumber = $(".employeenumber").val();
                    var sex = $(".sex").val();
                    var phonenumber = $(".phonenumber").val();
                    var verifcode = $(".verifcode").val();
                    var organizationid = $(".organizationid").val();
                    
                    var deviceids = "SB001";
                    API.addEmployee(verifcode,organizationid, deviceids,name, sex, birthday, phonenumber, employeenumber, job, faceimages, facedatas, function (res) {
                        //成功申请，跳转到成功页面
                        successfully()
                    })
                    return false; //阻止同步提交表单
                });
        
        $(".module-container").append($peopleAdd);
        $(".step3").addClass('black');
        //渲染入职日期-->日期控件
        $peopleAdd.find(".birthday-join").datetimepicker({
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