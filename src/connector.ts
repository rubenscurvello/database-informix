import {
  Client,
  ConnectorInterface,
  Invoice,
  ConfigDatabaseInterface,
} from "types";
const informix = require("informixdb");

let informixConnect: any;
export default class Connector implements ConnectorInterface {
  private dsn: any;
  constructor(config: ConfigDatabaseInterface) {
    this.dsn = `SERVER=${config.server};DATABASE=${config.collation};HOST=${config.host};SERVICE=${config.port};UID=${config.username};PWD=${config.password};`;
  }
  connect() {
    if (!informixConnect) {
      try {
        informixConnect = informix.openSync(this.dsn);
      } catch (e) {
        console.log(e);
      }
    }
  }

  execute(type: string): Promise<Client[] | Invoice[]> {
    let resultSet;
    if (!informixConnect) {
      this.connect();
    }
    switch (type) {
      case "invoices":
        resultSet = informixConnect.querySync(
          "SELECT * FROM informix.flags_text"
        );
        break;
      case "clients":
        resultSet = informixConnect.querySync(
          "SELECT * FROM informix.flags_text"
        );
        break;
    }

    informixConnect.closeSync();

    return resultSet;
  }
}
