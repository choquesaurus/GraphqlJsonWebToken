import mongoose,{Schema} from 'mongoose';
const EsquemaUser=new Schema({
    nombre:String,
    apellido:String,
    edad:String

},{collection:"estudiantes"});
export default mongoose.model('estudiantes',EsquemaUser);