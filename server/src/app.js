import express from 'express';
import aiRoutes from './routes/aiRoutes.js';
import cors from "cors";



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173", // your frontend port
  methods: ["GET", "POST"],
  credentials: true
}));

app.use("/api",aiRoutes);
console.log("aiRoutes loaded:", aiRoutes);

app.get("/",(req,res)=>{
  res.send("Welcome to the AI Document Processor API");
});

export default app;
