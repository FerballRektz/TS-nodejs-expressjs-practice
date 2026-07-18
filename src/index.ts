// TOP to bottom 
// Request 
import express from "express";
import dotenv from "dotenv";
import type { Application, Request, Response, NextFunction} from "express";
import {ProductRouter} from "./products.js"
import cors from "cors";


dotenv.config()
// Always have this at start
const app  :Application = express();


export const PORT :number = Number(process.env.PORT) || 3000;

//  Middleware, whenever a json is recived do this , always put it here
app.use(cors({
    origin:[`http://localhost:${PORT}`,'http://127.0.0.1:3001',`http://localhost:3000`]
    } 
))
// CUSTOM MIDDLEWARE
app.use(( req :Request, res :Response, next : NextFunction) => {
    console.log(req.method,req.path)
    next()
})

app.use(express.json())



// specific routes should be always on top before generic patterns (look into product.ts)
// Express Routes
// Router from product.ts
app.use('/products',ProductRouter)
// Route 
// 1. HTTP method
// 2. Path: "/..."
// 3. Handle function: ()=>{}
app.get("/", (req :Request,res :Response) => {
    res.send("Hello From Typescript Server");
})

// to see things from source/about (localhost:number/about)
app.get("/about", (req :Request,res :Response) => {
    res.send("This is a about page");
})

// Front-end backend
app.get('/message', (req :Request,res :Response) => {
        res.json({message: "Hello from your Express Backend ^^"});
    }
)

// POST Routes
app.post('/message',(req :Request,res :Response) => {
        const {name, message} = req.body

        // put in database put here just console log 
        console.log('New message:',name, message)
        res.json({message:'Thank you for your message'})
    }
)


// Always have this at the END
app.listen(PORT, () => {
    console.log("Server running from port", String(PORT));
})