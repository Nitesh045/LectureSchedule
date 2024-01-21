const mangoose = require('mongoose');

mangoose.connect('mongodb://127.0.0.1:27017/teachersData')
.then(()=>console.log("databse connected"))
.catch((e)=>console.log(e));
