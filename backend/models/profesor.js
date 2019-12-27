import mongoose,{Schema} from 'mongoose';
export default mongoose.model('profesor',new Schema({
    usuario:String,
    password:String
},{collection:"profesor"}));