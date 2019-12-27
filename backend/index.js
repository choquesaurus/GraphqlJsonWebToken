import express  from 'express';
import cors from 'cors';
import morgan from 'morgan';
import conection from  './connection/connection';

//import cadena from './typeDef/typedef';
import {ApolloServer} from 'apollo-server-express';
//import {ApolloServer} from 'apollo-server';
import resolver from './resolvers/resolvers';
import typeDef from './typeDef/typedef';
import '@babel/polyfill';
// The `listen` method launches a web server.

class Aplication{
    constructor()
    {
        this.graphserver=new ApolloServer({typeDefs:typeDef.typedef,resolvers:resolver.resolver,
            context:async({req})=>{
                let token=req.headers.authorization;
                if(token && typeof token !== 'undefined')
                { 
                    token=token.split(" ")[1];
                    
                }
                //const token=req.headers.authorization.split(' ')[1];
                //console.log(req.headers.authorization);
            return {token}
        }});
        this.app=express();
        this.graphserver.applyMiddleware({app:this.app});
        this.config();
    }
    config()
    {
        
        this.app.set('PORT',process.env.PORT||5552);
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan("dev"));
    }
    start()
    {
        this.app.listen(this.app.get('PORT'),()=>{
            console.log(`Run server  in localhost:${this.app.get('PORT')}${this.graphserver.graphqlPath}`);
        })
    }


}
new Aplication().start();