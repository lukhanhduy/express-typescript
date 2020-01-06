import express from "express";
import { User } from "../../interfaces";
declare global {
  namespace Express {
    interface Request {
      data?: any,
      validates?: any,
      locale?: any,
      validateErrors?: any,
      user?: User
    }
    interface Application {
      models?:any
    }
  }
}
