import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const app = express();



app.use(express.json());
app.use(cors());

app.get("/api/notes", async (req, res) => {
  res.json({ message: "success!" });
});

app.get("/notes", async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});