import "dotenv/config";
import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/serviceRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) =>
  res.json({ success: true, message: "API Animed OK" })
);

app.use("/services", serviceRoutes);
app.use("/reservations", reservationRoutes);
app.use("/auth", authRoutes);

app.use((req, res) =>
  res.status(404).json({ success: false, message: "Rota não encontrada" })
);

const PORT = process.env.PORT || 3333;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ API de Serviços rodando em http://localhost:${PORT}`);
});
