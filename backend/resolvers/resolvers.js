import {gql, AuthenticationError} from "apollo-server";
import Usuarios from '../models/estudiantes';
import Profesor from '../models/profesor';
import { GraphQLError } from "graphql";
import {keySecret} from '../config/config';
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";

export default {
    resolver:{

        Query:{
            getEstudiante:async(parent,args)=>{
                    const {id} = args;
                    return Usuarios.findById(id);
            },
            getEstudiantes:()=> Usuarios.find()
        },
        Mutation:{
            addEstudiante:async(parent,{...rest},ctx)=>{
                try {
                    let datacomplete;
                    jsonwebtoken.verify(ctx.token,keySecret,(err,data)=>
                    {
                        if(err)throw new  GraphQLError(err);
                        datacomplete=data;
                    });
                    if(datacomplete && datacomplete.hasOwnProperty('usuario')===true && 
                    'password' in datacomplete &&Object.values(datacomplete).length>0)
                    {
                        console.log(datacomplete);
                        console.log('create');
                        const estado=await Usuarios.create(rest);
                        return estado;
                    }
                  
                    
                } catch (error) {
                    return error.message;
                }
            },
            updateEstudiante:async(parent,{id,...rest},ctx)=>{
              try {
                    let datacomplete;
                    jsonwebtoken.verify(ctx.token,keySecret,(err,data)=>
                    {
                        if(err)throw new GraphQLError(err);
                        datacomplete=data;
                    });
                    
                    const query=Profesor.findOne({usuario:datacomplete.usuario,password:datacomplete.password});
                    if(query && typeof query!=='undefined' && Object.keys(query).length>0)
                    {
                        
                        // const  {usuario,password}=datacomplete;
                        await Usuarios.findByIdAndUpdate(id,rest);
                        return Usuarios.findById(id); 
                    }
                    // if(datacomplete && typeof datacomplete!=='undefined' && Object.keys(datacomplete).length>0)
                    // {

                    //     //const  {usuario,password}=datacomplete;
                    //     await Usuarios.findByIdAndUpdate(id,rest);
                    //     return Usuarios.findById(id);         
                    
                    // }
                    
              } catch (error) {
                  return error;
              }
            },
            remEstudiante:async(parent,{id})=>{
               try {
                   const estado=await Usuarios.findByIdAndRemove(id);
                   return estado;
               } catch ({message}) {
                   return message;
               }

            },
            createProfesor:async(parent,{usuario,password})=>{
                try {
                    const search=await  Profesor.find({usuario});

                    if(Object.keys(search).length==0)
                    {
                       const estado=await Profesor.create({usuario,password});
                        return estado;
                    }
                    throw new GraphQLError('Usuario Ya existe');
                    //throw {messages:"Usuario Ya existe"};
                } catch (error) {
                    //console.log(error.messages)
                    return error
                }
            },
            iniciarSesionProfesor:async(parent,{usuario,password})=>{
                try {
                    const search=await Profesor.findOne({usuario,password});   
                    
                    if(search && Object.values(search).length!==0)
                    {
                        const jwt=await jsonwebtoken.sign({usuario,password},keySecret,
                            {expiresIn:"30m"});
                        return Object.assign(search,{jsonwebtoken:jwt});
                    }
                    throw new GraphQLError('Inicio de Sesion Erroneo');              
                } catch (error) {
                    return error;
                }
            }
        }

    }
}