require('dotenv').config();
import mongoose from 'mongoose';
//import {cadena} from  '../config/config';

export default mongoose.connect(process.env.cadena,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>console.log('db is  running'))
.catch(err=>console.log(`error : ${err}`));