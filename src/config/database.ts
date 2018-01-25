import * as mongoose from 'mongoose';

(mongoose as any).Promise = global.Promise;

let dbUrl;
if (process.env.NODE_ENV === 'test') {
    dbUrl = 'mongodb://mongo/bookshelf-test'
} else {
    dbUrl = 'mongodb://mongo/bookshelf';
}

mongoose.connect(dbUrl, {
    useMongoClient: true,
});

export { mongoose };