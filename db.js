const util = require('util')
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

async function getDBClient(params) {
    return new Promise((resolve, reject) => {
        const {
            DB_USER,
            DB_PASS,
            DB_HOST,
            DB_NAME,
            CACERT
        } = params

        const url = util.format('mongodb://%s:%s@%s/', DB_USER, DB_PASS, DB_HOST)

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsCAFile: CACERT,
            authSource: DB_NAME,
            dbName: DB_NAME
          }
        
        mongoose.connect(url, options).catch(err => {
            console.log('Ошибка при инициализации ' + err)
            reject(err);
        });
        
        const db = mongoose.connection;
        
        db.on("error", (err) => {
            console.error("Db conenction error:", err);
            reject(err);
        });
        db.once("open", () => {
            console.log("Db conenction success:", url);
            resolve(mongoose);
        });
    });
}

module.exports = getDBClient;