//import { gql } from "apollo-server-express";

import {gql} from 'apollo-server';

export default {
    typedef:gql`
        type Estudiante{
            id:ID!,
            nombre:String,
            apellido:String,
            edad:Int
        }
        type  Profesor{
            id:ID!,
            usuario:String,
            password:String,
            jsonwebtoken:String
        }
        type Query{
            getEstudiante(id:ID):Estudiante,
            getEstudiantes:[Estudiante]
        }
        type Mutation{
            addEstudiante(nombre:String,apellido:String,edad:Int):Estudiante,
            updateEstudiante(id:ID!,nombre:String,apellido:String,edad:Int):Estudiante,
            updateEstudiantejwt(id:ID!,token:String):Estudiante,
            remEstudiante(id:ID!):Estudiante,
            createProfesor(usuario:String,password:String):Profesor,
            iniciarSesionProfesor(usuario:String,password:String):Profesor
        }
    `

}
