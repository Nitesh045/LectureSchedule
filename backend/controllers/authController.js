const AllData= require('../database/model/teacher');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminData= require('../database/model/admin');
const secretKey="mykey";
const taskData= require('../database/model/task')


  module.exports.singup_post=async (req,res,next)=>{
    const {name,email,password}=req.body;
    let existingTeacher;
    try {
        existingTeacher=await AllData.findOne({email:email});
    } catch (error) {
        console.log(error);
    }
    if(existingTeacher){
        return res
        .status(400).json({message:"teacher alredy "})
    }
     
    const hasingPassword=bcrypt.hashSync(password);
   try{

    const iteams= new AllData({
        name,
        email,
        password:hasingPassword,
    });

     await iteams.save();
    console.log('data addees')
   }catch(e){
     console.log(e)
   }
    return res.status(201).json({message:"data added"})
};

// login router setup

module.exports.login_post=async(req,res,next)=>{
 const {email,password}=req.body;
 let existingTeacher;
 try {
    existingTeacher=await AllData.findOne({email:email})
 } catch (error) {
    console.log(error)
 }
 if(!existingTeacher){
    return res.status(400).json({message:"user not found singup"})
 }
 const CorrectPassword= bcrypt.compareSync(password,existingTeacher.password);
 if(!CorrectPassword){
    return res.status(400).json({message:"password is incorrect"});
}
const token=jwt.sign({id:existingTeacher._id},secretKey,{
    expiresIn:"1hr",
});
if(req.cookies[`${existingTeacher._id}`]){
    req.cookies[`${existingTeacher._id}`]=""
}
res.cookie(String(existingTeacher._id),token,{
    path:"/",
    expires: new Date(Date.now()+1000*1000),
    httpOnly:true,
    sameSite:'lax'
});
return res.status(200).json({message:"loged in",iteams:existingTeacher,token});
}


module.exports.verifyToken=(req,res,next)=>{
   const cookies=req.headers.cookie;
    const token =cookies.split('=')[1]
    //console.log(token);
   
    
    if(!token){
        res.status(404).json({message:"token not found"});

    }
    jwt.verify(String(token),secretKey,(err,user)=>{
        if(err){
            res.status(404).json({message:"unvalid lecture"});

        }
        if(user){
            //console.log(user.id)
            req.id=user.id;
        }
    })
    next()
}

module.exports.getTeacherData= async(req,res,next)=>{
   const userId=req.id;
   let user;
   try {
    user= await AllData.findById(userId,"-password");
   } catch (error) {
    console.log(error);
   }
   if(!user){
    return res.status(404).json({message:"user not found"});

   }
   return res.status(200).json({user})
};


module.exports.logout_post=(req,res,next)=>{
    const cookies=req.headers.cookie;
    const token =cookies.split('=')[1]
    //console.log(token);
   
    
    if(!token){
        res.status(404).json({message:"token not found"});

    }
    jwt.verify(String(token),secretKey,(err,user)=>{
        if(err){
            res.status(404).json({message:"unvalid lecture"});

        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`]="";
       return res.status.json({message:"logout"})
    })
}

module.exports.admin_post=async(req,res)=>{
    const {key,email,password}=req.body;
    let existingAdmin;
    try {
        existingAdmin=await adminData.findOne({email:email});
    } catch (error) {
        console.log(error);
    }
    if(existingAdmin){
        return res
        .status(400).json({message:"admin login alredy "})
    }
     
    const hasingPassword=bcrypt.hashSync(password);
   try{

    const iteams= new adminData({
        key,
        email,
        password:hasingPassword,
    });

     await iteams.save();
    console.log('data addees')
   }catch(e){
     console.log(e)
   }
    return res.status(201).json({message:"data added"})
}

module.exports.admin_login=async(req,res,next)=>{
    const {key,email,password}=req.body;
    let existingAdmin;
    try {
        existingAdmin=await adminData.findOne({email:email})
        console.log(existingAdmin);
    } catch (error) {
        console.log(error);
    }
    if(!existingAdmin){
        return res.status(404).json({message:"admin not found"});

    };
    
    const CorrectPassword=bcrypt.compare(password,existingAdmin.password);
    if(!CorrectPassword){
        return res.status(400).json({message:"pssword wrong"});
    }
    const token=jwt.sign({id:existingAdmin._id},secretKey,{
        expiresIn:"1hr",
    });
    if(req.cookies[`${existingAdmin._id}`]){
        req.cookies[`${existingAdmin._id}`]=""
    }
    res.cookie(String(existingAdmin._id),token,{
        path:"/",
        expires: new Date(Date.now()+1000*1000),
        httpOnly:true,
        sameSite:'lax'
    });
    return res.status(200).json({message:"loged in"});


}


module.exports.dash_get= async (req,res,next)=>{
    
    try {
         await AllData.find()
         .then(users=>res.json(users))
       
       // console.log(allUserData);
    } catch (error) {
        console.log(error)
    }
    
}

module.exports.task_post=async(req,res)=>{
    const {name,label,desc,batchs,time}=req.body;
    try {
        const iteams= new taskData({
            name,
            label,
            desc,
            time,
        });
        await iteams.save();
        
    } catch (error) {
        console.log(error)
    }
    res.status(201).json({message:"task added"})
}