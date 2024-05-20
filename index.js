import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from "body-parser";


// Imports
import User from "./src/models/userModel.js";
import connectDb from "./src/dbConnect/connect.js";
import authRoutes from './src/routes/auth.routes.js'
import propertyRouter from './src/routes/property.routes.js'
import testRouter from './src/routes/test.routes.js'
import errorMiddelware from "./src/middlewares/errorMiddleware.js";

// middlewares
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));


// Dummy api
app.get('/', (req, res) => {
  res.send({message: "Hello World"})
})

app.use('/api/v1/users', authRoutes)
app.use('/api/v1/properties',propertyRouter)
app.use('/api/v1/test',testRouter)

//validation middleware
app.use(errorMiddelware)

// mongoose
//   .connect(
//     "mongodb+srv://msnawaz909:admin123@cluster0.sgwi4tm.mongodb.net/",
//     {}
//   )
//   .then(() => {
//     console.log("MongoDB connected successfully!");
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB:", err.message);
//     // Handle connection error here
//   });

const startServer = async () => {
  try {
    connectDb(process.env.MONGODB_URL)
    app.listen(8080, () => console.log("Server started on port 8080"))
  } catch (error) {
    console.log(error)
  }
}

startServer();
