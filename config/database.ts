import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

class DataBase {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.client = {} as MongoClient;
  }

  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }

  getDatabase() {
    return this.client.database(this.dbName);
  }
}

const dbName = "deno_demo";
const dbHostUrl =  "mongodb://localhost:27017";
const db = new DataBase(dbName, dbHostUrl);
db.connect();

export default db;
