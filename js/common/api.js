/**
 * 这是注释的内容
 * Author:land
 *   Date:2017/9/6
 */
define(["jquery"],function($){
    // var api="http://39.108.171.172:8081/facerecognition";
    var api="http://127.0.0.1:80/facerecognition";
    return {
        // 图片上传
        uploadImage:function(imagefile,callback){
            $.ajax({
                url:api+"/api/uploadFileBase64",
                timeout:100000,
                type:"post",
                data:{imagefile:imagefile},
                success:function(res){
        
                callback && callback(res);
                }
            })
        },

       
        // 员工添加
        addEmployee:function(verifcode,organizationid,deviceids,name,sex,brithday,phonenumber,employeenumber,job,faceimages,facedatas,callback){
            $.ajax({
                url:api+"/api/employee/add",
                type:"post",
                data:{verifcode:verifcode,organizationid:organizationid,deviceids:deviceids,name:name,sex:sex,brithtime:brithday,phonenumber:phonenumber,employeenumber:employeenumber,job:job,faceimages:faceimages,facedatas:facedatas},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
          /**
         * 根据员工id获取员工基本信息
         * @param ep_id 员工id
         * @param callback
         */
        getEmployeeBaseInfo:function(ep_id,callback){
            $.get(api+"/api/employee/queryDateil",{employeeid:ep_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 员工编辑
        editEmployee:function(ep_id,deviceids,name,sex,birthday,phonenumber,job,employeenumber,facedatas,faceimages,callback){
            $.ajax({
                url:api+"/api/employee/update",
                type:"post",
                data:{employeeid:ep_id,deviceids:deviceids,name:name,sex:sex,birthday:birthday,phonenumber:phonenumber,job:job,employeenumber:employeenumber,facedatas:facedatas,faceimages:faceimages},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        // 访客添加
        addVisitor:function(verifcode,deviceids,name, sex, birthday, phonenumber,starttime,endtime, remark, faceimages, facedatas,callback){
            $.ajax({
                url:api+"/api/visitor/add",
                type:"post",
                data:{verifcode:verifcode,deviceids:deviceids,name:name,sex:sex,birthday:birthday,phonenumber:phonenumber,starttime:starttime,endtime:endtime,remark:remark,faceimages:faceimages,facedatas:facedatas},
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
        /**
         * 根据访客id获取访客基本信息
         * @param ep_id 访客id
         * @param callback
         */
        getVisitorBaseInfo:function(vs_id,callback){
            $.get(api+"/api/visitor/query",{visitorid:vs_id},function(res){
                if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
            })
        },
        // 访客编辑
        editVisitor:function(formData,callback){
            $.ajax({
                url:api+"/api/visitor/update",
                type:"post",
                data:formData,
                success:function(res){
                    if(res.code!=0){
                    console.log(res.message);
                    return;
                }
                callback && callback(res);
                }
            })
        },
       
        
        // 验证码获取
        getVerifcode:function(phonenumber,callback){
            $.ajax({
                url:api+"/api/verifcode/get",
                type:"get",
                data:{phonenumber:phonenumber},
                success:function(res){
                    
                callback && callback(res);
                }
            })
        },
        // 获取机构设备
        queryDevice:function(organizationid,callback){
            $.ajax({
                url:api+"/api/device/query",
                type:"post",
                data:{organizationid:organizationid},
                success:function(res){
                    
                callback && callback(res);
                }
            })
        },
    }
})