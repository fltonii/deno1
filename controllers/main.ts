import { Context } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { ErrorHandler } from "../utils/error_middleware.ts";

export const validateRequest = async (ctx: Context, body: any) => {
  if (ctx.request.headers.get("content-type") !== "application/json") {
    throw new ErrorHandler("Invalid body", 422);
  }
  if (!Object.keys(body).length) {
    throw new ErrorHandler("Request body can not be empty!", 400);
  }
};
