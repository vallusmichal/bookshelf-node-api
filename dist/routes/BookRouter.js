"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose = require("mongoose");
const Book_1 = require("../models/Book");
class BookRouter {
    /**
     * Initialize the BookRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all books.
     */
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield Book_1.default.find({}).exec();
            res.json(books);
        });
    }
    /**
     * GET one book by id
     */
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idParam = BookRouter.parseId(req, res);
            const book = yield Book_1.default.findOne({ _id: idParam }).exec();
            if (!book)
                res.sendStatus(404);
            res.json(book);
        });
    }
    /**
     * GET books by title (full text search)
     */
    findByTitle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = req.query.q;
            const books = yield Book_1.default.findByTitleContains(queryString);
            res.json(books);
        });
    }
    /**
     * GET books by description (full text search)
     */
    findByDescription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = req.query.q;
            const books = yield Book_1.default.findByDescContains(queryString);
            res.json(books);
        });
    }
    /**
     * GET books by author
     */
    findByAuthor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = req.query.q;
            const books = yield Book_1.default.findByAuthorsContains(queryString);
            res.json(books);
        });
    }
    /**
     * POST save a book
     */
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.default.create(req.body);
            res.json(book);
        });
    }
    /**
     * POST update a book
     */
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idParam = BookRouter.parseId(req, res);
            const book = yield Book_1.default.findByIdAndUpdate({ _id: idParam }, req.body);
            if (!book)
                res.sendStatus(404);
            const updated = yield Book_1.default.findOne({ _id: idParam }).exec();
            if (!updated)
                res.sendStatus(500);
            res.json(updated);
        });
    }
    /**
     * DELETE a book
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idParam = BookRouter.parseId(req, res);
            const book = yield Book_1.default.findOneAndRemove({ _id: idParam }).exec();
            if (!book)
                res.sendStatus(404);
            res.sendStatus(200);
        });
    }
    /**
     *  Parses ID from URL, checks, if it is valid ObjectId
     */
    static parseId(req, res) {
        const idParam = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(idParam)) {
            res.sendStatus(400);
            return;
        }
        return idParam;
    }
    /**
     * Take each handler, and attach to one of the Express.Router's endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/find-by-title', this.findByTitle);
        this.router.get('/find-by-desc', this.findByDescription);
        this.router.get('/find-by-author', this.findByAuthor);
        this.router.get('/:id', this.getOne);
        this.router.post('/save', this.save);
        this.router.post('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
exports.BookRouter = BookRouter;
// Create the BookRouter, and export its configured Express.Router
const bookRouter = new BookRouter();
bookRouter.init();
const router = bookRouter.router;
exports.default = router;
