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
                API.getVerifcode(phonenumber,function(res){
                    alert(res);
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
                    var organizationid = "001001";
                    var deviceids = "SB001";
                    console.log(verifcode,organizationid, deviceids,name, sex, birthday, phonenumber, employeenumber, job, faceimages, facedatas)
                    API.addEmployee(verifcode,organizationid, deviceids,name, sex, birthday, phonenumber, employeenumber, job, faceimages, facedatas, function (res) {
                        //成功申请，跳转到成功页面
                        successfully()
                    })
                    return false; //阻止同步提交表单
                });
        
        $(".module-container").append($peopleAdd);
        $(".step3").addClass('black');
        $(".step2").removeClass('black');
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