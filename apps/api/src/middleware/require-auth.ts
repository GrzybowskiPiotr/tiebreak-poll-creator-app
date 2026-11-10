import type {RequestHandler} from "express";
import {fromNodeHeaders} from "better-auth/node";
import {auth} from "../auth.js";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const headers = new Headers();

  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.sendStatus(401);
      return;
    }

    res.locals.session = session;

    next();
  } catch (error) {
    next(error);
  }
};
