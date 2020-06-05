import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { ErrorHandler } from "../utils/error_middleware.ts";
import db from "../config/database.ts";
import { validateRequest } from "./main.ts";
import { applyHash, compareHash } from "../utils/encrypt.ts";
import { encodeToken } from "../utils/jwt.ts";

const database = db.getDatabase();
const usersCollection = database.collection("users");

export const createUser: HandlerFunc = async (ctx: Context) => {
  try {
    const body = await ctx.body();
    await validateRequest(ctx, body);
    const { first_name, last_name, cpf, phone, password, email } = body;
    const hash = await applyHash(password as string);
    const insertedUser = await usersCollection.insertOne({
      first_name,
      last_name,
      cpf,
      phone,
      hash,
      email,
    });
    return ctx.json(insertedUser, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};

export const verifyUser: HandlerFunc = async (ctx: Context) => {
  try {
    const body = await ctx.body();
    await validateRequest(ctx, body);
    const { password, email } = body;

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return ctx.json("User not found", 500);
    }

    if (await compareHash(password as string, user.hash)) {
      const token = encodeToken({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      });

      (usersCollection as any).findOneAndUpdate({ email }, { $inc: { token } });

      return ctx.json(token, 200);
    } else {
      throw new ErrorHandler("Unauthorized", 401);
    }
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
