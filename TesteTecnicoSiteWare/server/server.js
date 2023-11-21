import express, { Router } from "express";
import ImportData from "./dataImport.js";
import dotenv from "dotenv";
import connectDatabase from "./config/mongoDb.js";
import { notFound, errorHandler } from "./Middleware/errors.js"
import appRouter from "./Routes/ProductRoutes.js";
import bodyParser from 'body-parser'
import cartRouter from "./Routes/ProductBuy.js";
import userRouter from "./Routes/UserLogin.js";

dotenv.config();
connectDatabase();
const app = express();

app.use(bodyParser.json())

//API     
// app.use("/api/import", ImportData);
// app.use("/api/products", productRouter);

app.use("/api/products", appRouter);
app.use("/api/cart", cartRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server run in port ${PORT}`));