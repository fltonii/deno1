import {
  MiddlewareFunc,
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";

export class ErrorHandler extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export const ErrorMiddleware: MiddlewareFunc = (
  next: HandlerFunc
): HandlerFunc => {
  return async (c: Context) => {
    try {
      await next(c);
    } catch (err) {
      const error = err as ErrorHandler;
      c.response.status = error.status || 500;
      c.response.body = error.message;
    }
  };
};
