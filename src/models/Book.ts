import { mongoose } from '../config/database';
import { Schema, Document, Model } from 'mongoose';
import escapeStringRegexp = require('escape-string-regexp');

export interface IBook extends Document {
    title: string;
    description: string;
    authors: string[];
}

export interface IBookModel extends Model<IBook> {
    findByTitleContains(query: string): Promise<IBook>
    findByDescContains(query: string): Promise<IBook>
    findByAuthorsContains(query: string): Promise<IBook>
}

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    authors: {type: [String], required: true, min: 1}
});

function toRegex(query: string) {
    const escaped = escapeStringRegexp(query);
    return new RegExp('\.*' + escaped + '\.*', 'i');
}

schema.static('findByTitleContains', (query: string) => {
    return Book
        .find({title: toRegex(query)})
        .lean()
        .exec();
});

schema.static('findByDescContains', (query: string) => {
    return Book
        .find({description: toRegex(query)})
        .lean()
        .exec();
});

schema.static('findByAuthorsContains', (query: string) => {
    return Book
        .find({authors: toRegex(query)})
        .lean()
        .exec();
});

const Book = mongoose.model<IBook>('Book', schema) as IBookModel;
export default Book;