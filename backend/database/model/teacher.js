const mongoose= require('mongoose');

const teacherSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true, 
    },
    
        name:{
            type:String
        },
        label:{
            type:String
        },
        desc:{
            type:String
        },
        batchs:{
            type:String
        },
        time:{
            type:String
        },
    
});

const TeacherCollection=  mongoose.model('teacher',teacherSchema);
module.exports=TeacherCollection;
