import dotenv from 'dotenv';
dotenv.config();
import '@datasources/models/connection'

import routes from './routes'
import addRequestId from '@middelwares/request-id.middleware';
import response from "@helpers/response.helper"
import express, { Express, NextFunction, Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import { ALLOWED_ORIGINS } from '@constants';


const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(addRequestId);

app.use('/', routes);

const options: CorsOptions = {
  origin: ALLOWED_ORIGINS
};
app.use(cors(options));

// handle 404 and 5xx http code
app.use(response.handler404);
app.use(response.handler5xx);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});