import mongoose from "mongoose";

import { Server } from "http";
import config from "./config";
import app from "./app";

let server: Server;

async function speed() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Application listening at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(`Failed to connect database`, error);
  }
}

speed()