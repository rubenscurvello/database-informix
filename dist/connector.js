"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const informix = require("informixdb");
let informixConnect;
class Connector {
    constructor(config) {
        this.dsn = `SERVER=${config.server};DATABASE=${config.collation};HOST=${config.host};SERVICE=${config.port};UID=${config.username};PWD=${config.password};`;
    }
    connect() {
        if (!informixConnect) {
            try {
                informixConnect = informix.openSync(this.dsn);
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    execute(type) {
        let resultSet;
        if (!informixConnect) {
            this.connect();
        }
        switch (type) {
            case "invoices":
                resultSet = informixConnect.querySync("SELECT * FROM informix.flags_text");
                break;
            case "clients":
                resultSet = informixConnect.querySync("SELECT * FROM informix.flags_text");
                break;
        }
        informixConnect.closeSync();
        return resultSet;
    }
}
exports.default = Connector;
