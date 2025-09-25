import { IUser } from "../models/User";
// extends the Express Request type to optionally include user
declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
