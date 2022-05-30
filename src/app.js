import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";

//routes
import AuthsRoutes from "./routes/auth.routes";
import UsersRoutes from "./routes/user.routes";
import MensajesRoutes from "./routes/mensajes.routes";
import ImageRoutes from "./routes/uploadImage.routes";

//app express
const app = express();

//settings
app.set("port", process.env.PORT || 4000);

//midlewares
const corsOptions = {}; //save settings for cors middleware

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//public path
const publicPath = path.resolve(__dirname, "public");
const uploads = path.resolve(__dirname, "/public/uploads");
app.use(express.static(publicPath));
app.use(express.static(uploads));

//routes url
app.get("/", (req, res) => {
  res.json({ message: "welcome to my application" });
});

app.use("/api/login", AuthsRoutes);
app.use("/api/usuarios", UsersRoutes);
app.use("/api/mensajes", MensajesRoutes);
app.use("/api/addimage", ImageRoutes);

export default app;
