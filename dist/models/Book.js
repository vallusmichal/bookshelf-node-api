"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const mongoose_1 = require("mongoose");
const escapeStringRegexp = require("escape-string-regexp");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    authors: { type: [String], required: true, min: 1 }
});
function toRegex(query) {
    const escaped = escapeStringRegexp(query);
    return new RegExp('\.*' + escaped + '\.*', 'i');
}
schema.static('findByTitleContains', (query) => {
    return Book
        .find({ title: toRegex(query) })
        .lean()
        .exec();
});
schema.static('findByDescContains', (query) => {
    return Book
        .find({ description: toRegex(query) })
        .lean()
        .exec();
});
schema.static('findByAuthorsContains', (query) => {
    return Book
        .find({ authors: toRegex(query) })
        .lean()
        .exec();
});
const Book = database_1.mongoose.model('Book', schema);
exports.default = Book;
