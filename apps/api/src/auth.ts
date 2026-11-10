import {drizzleAdapter} from "@better-auth/drizzle-adapter";
import {betterAuth} from "better-auth";
import {db} from "./db/index.js"; // your drizzle instance

export const auth = betterAuth({
  trustedOrigins: [process.env.WEB_URL!, "http://192.168.1.19:5173"],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
