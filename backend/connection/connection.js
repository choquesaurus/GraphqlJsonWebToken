import mongoose from 'mongoose';
import {cadena} from  '../config/config';

export default mongoose.connect(cadena,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
.then(()=>console.log('db is  running'))
.catch(err=>console.log(`error : ${err}`));