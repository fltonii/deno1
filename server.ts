import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import "https://deno.land/x/denv/mod.ts";
import { ErrorMiddleware } from "./utils/error_middleware.ts";
import {
  fetchAllEmployees,
  createEmployee,
  fetchOneEmployee,
  updateEmployee,
  deleteEmployee,
} from "./controllers/employees.ts";
import { createUser } from "./controllers/users.ts";

const app = new Application();

app.use(ErrorMiddleware);

app
  .post("/users", createUser)
  .get("/employees", fetchAllEmployees)
  .post("employees", createEmployee)
  .get("/employees/:id", fetchOneEmployee)
  .put("/employees/:id", updateEmployee)
  .delete("/employee/:id", deleteEmployee)
  .start({ port: Number(Deno.env.get("PORT") || 5000) });

console.log(`Server started on https://localhost:${Deno.env.get("PORT")}`);
