"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.mongoose = mongoose;
mongoose.Promise = global.Promise;
let dbUrl;
if (process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://mongo/bookshelf-test';
}
else {
    dbUrl = 'mongodb://mongo/bookshelf';
}
mongoose.connect(dbUrl, {
    useMongoClient: true,
});
