import {toNodeHandler} from "better-auth/node";
import express from "express";
import {auth} from "./auth.js";
import pollRouter from "./routes/polls.routes.js";
const app = express();
const PORT = 3000;

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({status: "ok"});
});

app.use("/api/polls", pollRouter);

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({headers: req.headers});
  if (!session) {
    return res.sendStatus(401);
  }

  return res.json({user: session.user});
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
