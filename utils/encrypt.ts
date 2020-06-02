import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export const applyHash = async (target: string) => {
  const salt = await bcrypt.genSalt(8);
  return bcrypt.hash(target, salt);
};

export const compareHash = (source: string, target: string) => {
  return bcrypt.compare(source, target);
};
