import express from 'express';
import aiRoutes from './routes/aiRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",aiRoutes);
console.log("aiRoutes loaded:", aiRoutes);

app.get("/",(req,res)=>{
  res.send("Welcome to the AI Document Processor API");
});

export default app;
