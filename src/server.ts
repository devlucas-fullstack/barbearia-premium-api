import express from "express";
import cors from "cors";
import "express-async-errors";
import { errorHandler } from "./middlewares/error-handler";
import { routes } from "./routes";

const app = express();
const PORT = Number(process.env.PORT) || 3333;

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
