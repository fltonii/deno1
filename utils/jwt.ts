import "https://deno.land/x/denv/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

export const encodeToken = (payload: Payload) => {
  const header: Jose = {
    alg: "HS256",
    typ: "JWT",
  };
  payload.exp = setExpiration(new Date().getTime() + 60000);
  const key = Deno.env.get("JWT_SECRET")!;
  return makeJwt({ payload, key, header });
};

export const decodeToken = (token: string) => {
  const encodedPayload = token.split(".")[1];
  return atob(encodedPayload);
};

export const validateToken = (token: string) => {
  const key = Deno.env.get("JWT_SECRET")!;
  return validateJwt(token, key);
};
