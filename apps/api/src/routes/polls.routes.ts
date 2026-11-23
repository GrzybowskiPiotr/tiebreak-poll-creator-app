import {eq} from "drizzle-orm";
import {Router} from "express";
import {db} from "../db/index.js";
import {poll} from "../db/schema/poll.js";
import {pollOptions} from "../db/schema/pollOptions.js";
import {requireAuth} from "../middleware/require-auth.js";
import {createPollSchema} from "../validators/polls.validator.js";

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

router.post("/", requireAuth, async (req, res) => {
  const validationResult = createPollSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json(validationResult.error.issues);
  }
  const {data} = validationResult;
  const userId = res.locals.session.user.id;
  const maxChoices = data.pollType === "single" ? 1 : data.options.length;

  try {
    await db.transaction(async (tx) => {
      const [createdPoll] = await tx
        .insert(poll)
        .values({
          user_id: userId,
          title: data.title,
          close_at: new Date(data.closeAt),
          max_choices: maxChoices,
          suggestions_enabled: data.suggestionsEnabled,
          status: "open",
        })
        .returning({id: poll.id});

      for (const option of data.options) {
        await tx.insert(pollOptions).values({
          pollId: createdPoll.id,
          status: "approved",
          optionName: option.name,
        });
      }
    });
    res.status(201).send({message: "poll data recived", ok: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "writing to database error", ok: false});
  }
});

export default router;
