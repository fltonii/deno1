import { User } from "../Application.d.ts";
import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { ErrorHandler } from "../utils/error_middleware.ts";
import db from "../config/database.ts";
import { validateRequest } from "./main.ts";
import { applyHash } from "../utils/encrypt.ts";

const database = db.getDatabase();
const usersCollection = database.collection("users");

export const createUser: HandlerFunc = async (ctx: Context) => {
  console.log("here");
  try {
    await validateRequest(ctx);
    const body = await ctx.body();
    const { first_name, last_name, cpf, phone, password, email } = body;
    const hash = applyHash(password as string);
    console.log(hash);
    const insertedUser = await usersCollection.insertOne({
      first_name,
      last_name,
      cpf,
      phone,
      hash,
      email,
    });
    console.log(insertedUser);
    return ctx.json(insertedUser, 201);
  } catch (error) {
    throw new ErrorHandler(error.message, error.status || 500);
  }
};
