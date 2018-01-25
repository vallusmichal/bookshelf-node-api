process.env.NODE_ENV = 'test';

import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';
import Book from '../src/models/Book'

chai.use(chaiHttp);
const expect = chai.expect;


describe('bookshelf API', function(): void {

    beforeEach((done: Function): void => {
        Book.remove({}, (err) => {
            done();
        });
    });

    describe('GET /books', function(): void {
        it('should get all books', (done: Function): void => {
            chai.request(app)
                .get('/books')
                .end((err:Error, res: any): void => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.eql(0);
                    done();
                });
        });
    });

    describe('POST /books/save', function(): void {
        it('should save a book', (done: Function): void => {
            const book = new Book ({
                title: 'Good Omens',
                description: 'The book to save.',
                authors: ['Neil Gaiman', 'Terry Pratchett']
            });

            chai.request(app)
                .post('/books/save')
                .set('content-type', 'application/json')
                .send(book)
                .end((err:Error, res: any): void => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body._id).to.be.not.empty;
                    expect(res.body.title).to.be.equal('Good Omens');
                    done();
                });
        });
    });


    describe('GET /books/:id', function(): void {
        it('should get a book by id', (done: Function): void => {
            const book = new Book({
                title: 'The Little Prince',
                description: 'The book to get.',
                authors: ['Antoine de Saint-Exupéry']
            });

            book.save((err:Error, book: any) => {
                chai.request(app)
                    .get('/books/' + book._id)
                    .end((err:Error, res: any): void => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.title).to.be.equal('The Little Prince');
                        done();
                    });
            });
        });

        it('should not get a book by non-existing id', (done: Function): void => {
            chai.request(app)
                .get('/books/5a6a2122d2aeb20e64b264db') // non-existing ID
                .end((err:Error, res: any): void => {
                    expect(res.status).to.be.equal(404);
                    done();
                });
        });
    });

    describe('POST /books/:id', function(): void {
        it('should update a book by id', (done: Function): void => {
            const newTitle = 'My New Title';
            const book = new Book({
                title: 'The Little Prince',
                description: 'The book to update.',
                authors: ['Antoine de Saint-Exupéry']
            });

            book.save((err:Error, book: any) => {
                chai.request(app)
                    .post('/books/' + book._id)
                    .set('content-type', 'application/json')
                    .send({title: newTitle})
                    .end((err:Error, res: any): void => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body.title).to.be.equal(newTitle);
                        done();
                    });
            });
        });
    });

    describe('DELETE /books/:id', function(): void {
        it('should delete a book by id', (done: Function): void => {
            const book = new Book({
                title: 'The Little Prince',
                description: 'The book to delete.',
                authors: ['Antoine de Saint-Exupéry']
            });

            book.save((err:Error, book: any) => {
                chai.request(app)
                    .del('/books/' + book._id)
                    .end((err:Error, res: any): void => {
                        expect(res.status).to.be.equal(200);
                        done();
                    });
            });
        });
    });

    describe('GET /books/find-by-title', function(): void {
        it('should find books by title', (done: Function): void => {
            const book = new Book({
                title: 'The Little Prince',
                description: 'The book to get.',
                authors: ['Antoine de Saint-Exupéry']
            });

            book.save((err:Error, book: any) => {
                chai.request(app)
                    .get('/books/find-by-title?q=little')
                    .end((err:Error, res: any): void => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.be.eql(1);
                        expect(res.body[0].title).to.be.equal('The Little Prince');
                        done();
                    });
            });
        });
    });

    describe('GET /books/find-by-desc', function(): void {
        it('should find books by description', (done: Function): void => {
            const book = new Book({
                title: 'The Little Prince',
                description: 'The book to get.',
                authors: ['Antoine de Saint-Exupéry']
            });

            book.save((err:Error, book: any) => {
                chai.request(app)
                    .get('/books/find-by-desc?q=book')
                    .end((err:Error, res: any): void => {
                        expect(res.status).to.be.equal(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.be.eql(1);
                        expect(res.body[0].title).to.be.equal('The Little Prince');
                        done();
                    });
            });
        });
    });

    it('should find books by authors', (done: Function): void => {
        const book = new Book({
            title: 'Good Omens',
            description: 'The book to save.',
            authors: ['Neil Gaiman', 'Terry Pratchett']
        });

        book.save((err:Error, book: any) => {
            chai.request(app)
                .get('/books/find-by-author?q=terry')
                .end((err:Error, res: any): void => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.eql(1);
                    expect(res.body[0].title).to.be.equal('Good Omens');
                    done();
                });
        });
    });


    after((done: Function): void => {
        Book.remove({}, (err) => {
            done();
        });
    });

});