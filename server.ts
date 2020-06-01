import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import { ErrorMiddleware } from "./error_middleware.ts";
import {
  fetchAllEmployees,
  createEmployee,
  fetchOneEmployee,
  updateEmployee,
  deleteEmployee,
} from "./controllers/employees.ts";

const app = new Application();

app.use(ErrorMiddleware);

const PORT = 5000;

app
  .get("/employees", fetchAllEmployees)
  .post("employees", createEmployee)
  .get("/employees/:id", fetchOneEmployee)
  .put("/employees/:id", updateEmployee)
  .delete("/employee/:id", deleteEmployee)
  .start({ port: PORT });

console.log(`Server started on https://localhost:${PORT}`);
