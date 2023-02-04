import mysql, {Connection} from 'mysql2/promise';
import config from "./config";
let connection: Connection | null;

const mysqlDb = {
  async init() {
    connection = await mysql.createConnection(config.db);
  },
  getConnection(): Connection {
    if(!connection) throw new Error('Connection failed!')
    return connection;
  }
};

export default mysqlDb;