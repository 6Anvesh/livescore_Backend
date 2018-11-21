const mongoose = require('mongoose')
var isProduction = process.env.NODE_ENV === 'production';
if(!isProduction){
mongoose.connect('mongodb://stranger:stranger123@ds113134.mlab.com:13134/user_base',
(err,db)=>{
    if(!err)
    {
      console.log('Database connected successfully');
    }else{
            console.log('mongoose connection failed')
    }
  });
  mongoose.set('debug', true);
}