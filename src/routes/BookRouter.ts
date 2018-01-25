import {Router, Request, Response} from 'express';
import * as mongoose from 'mongoose';
import Book from '../models/Book'

export class BookRouter {
    router: Router;

    /**
     * Initialize the BookRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all books.
     */
    public async getAll(req: Request, res: Response) {
        const books = await Book.find({}).exec();

        res.json(books);
    }

    /**
     * GET one book by id
     */
    public async getOne(req: Request, res: Response) {
        const idParam = BookRouter.parseId(req, res);

        const book = await Book.findOne({_id: idParam}).exec();
        if (!book) res.sendStatus(404);

        res.json(book);
    }

    /**
     * GET books by title (full text search)
     */
    public async findByTitle(req: Request, res: Response) {
        const queryString = req.query.q;

        const books = await Book.findByTitleContains(queryString);

        res.json(books);
    }

    /**
     * GET books by description (full text search)
     */
    public async findByDescription(req: Request, res: Response) {
        const queryString = req.query.q;

        const books = await Book.findByDescContains(queryString);

        res.json(books);
    }

    /**
     * GET books by author
     */
    public async findByAuthor(req: Request, res: Response) {
        const queryString = req.query.q;

        const books = await Book.findByAuthorsContains(queryString);

        res.json(books);
    }

    /**
     * POST save a book
     */
    public async save(req: Request, res: Response) {
        const book = await Book.create(req.body);

        res.json(book);
    }

    /**
     * POST update a book
     */
    public async update(req: Request, res: Response) {
        const idParam = BookRouter.parseId(req, res);

        const book = await Book.findByIdAndUpdate({_id: idParam}, req.body);
        if (!book) res.sendStatus(404);

        const updated = await Book.findOne({_id: idParam}).exec();
        if (!updated) res.sendStatus(500);

        res.json(updated);
    }

    /**
     * DELETE a book
     */
    public async delete(req: Request, res: Response) {
        const idParam = BookRouter.parseId(req, res);

        const book = await Book.findOneAndRemove({_id: idParam}).exec();
        if (!book) res.sendStatus(404);

        res.sendStatus(200);
    }

    /**
     *  Parses ID from URL, checks, if it is valid ObjectId
     */
    private static parseId(req: Request, res: Response) {
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

// Create the BookRouter, and export its configured Express.Router
const bookRouter = new BookRouter();
bookRouter.init();

const router = bookRouter.router;

export default router;