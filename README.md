# bookshelf-node-api

This is a basic back-end server for book collection, built with *express*, *mongoose*, *mocha* and *chai*.

##### Start-up

```bash
docker-compose up
```

##### Request Examples

```bash
# save a book
curl -H "Content-Type: application/json" -d '{"title": "Good Omens", "description": "A biblical apocalypse that’s scarier, weirder, and above all, funnier than it has any right to be.", "authors": ["Neil Gaiman", "Terry Pratchett"]}' http://localhost:3000/books/save

# save another book :)
curl -H "Content-Type: application/json" -d '{"title": "The Little Prince", "description": "A poetic tale, with watercolour illustrations by the author, in which a pilot stranded in the desert meets a young prince visiting Earth from a tiny asteroid.", "authors": ["Antoine de Saint-Exupéry"]}' http://localhost:3000/books/save

# get all books
curl http://localhost:3000/books

# find books by title
curl http://localhost:3000/books/find-by-title?q=little

# find books by description
curl http://localhost:3000/books/find-by-desc?q=apocalypse

# find books by author
curl http://localhost:3000/books/find-by-author?q=terry

# update a book
curl -H "Content-Type: application/json" -d '{"title": "A New Title"}' http://localhost:3000/books/<id>

# delete a book
curl -X "DELETE" http://localhost:3000/books/<id>
```