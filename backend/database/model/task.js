const mongoose= require('mongoose');

const taskSchema= new mongoose.Schema({
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

const TaskCollection=  mongoose.model('task',taskSchema);
module.exports=TaskCollection;