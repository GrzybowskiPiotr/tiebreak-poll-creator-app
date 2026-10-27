import {eq} from "drizzle-orm";
import {Router} from "express";
import {db} from "../db/index.js";
import {poll} from "../db/schema/poll.js";
import {requireAuth} from "../middleware/require-auth.js";
const router = Router();

router.get("/", requireAuth, async (req, res) => {
  const session = res.locals.session;
  const userId = session.user.id;

  try {
    const result = await db.select().from(poll).where(eq(poll.user_id, userId));
    res.json(result);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
