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

const dbName = Deno.env.get("DB_NAME");
const dbHostUrl = Deno.env.get("DB_HOST_URL");
const db = new DataBase(dbName, dbHostUrl);
db.connect();

export default db;
