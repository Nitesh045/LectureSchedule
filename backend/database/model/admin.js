const mongoose= require('mongoose');

const adminSchema= new mongoose.Schema({
    key:{
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
    }
});

const adminCollection=  mongoose.model('admin',adminSchema);
module.exports=adminCollection;
