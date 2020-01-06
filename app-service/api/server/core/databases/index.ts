import express from "express";
import * as global from './../types/express';
import * as REPOSITORIES from './../../repositories';
import { Connection } from "typeorm";
const repositories: any = REPOSITORIES;
module.exports = async (app: express.Application, connection: Connection) => {
  await Promise.all(
    Object.keys(repositories).map(async (key: any) => {
      app.models[key] = await connection.getCustomRepository(repositories[key]);
    })
  )

};
