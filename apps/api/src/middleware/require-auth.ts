import type {RequestHandler} from "express";
import {auth} from "../auth.js";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const headers = new Headers();

  try {
    const session = await auth.api.getSession({
      headers: req.headers,
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
