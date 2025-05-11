// src/main/java/com/example/demo/service/BookService.java
package lms;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository repo;

    public BookService(BookRepository repo) {
        this.repo = repo;
    }

    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return repo.findById(id);
    }

    public Book addBook(Book book) {
        return repo.save(book);
    }

    public Book updateBook(Long id, Book updatedBook) {
        Book book = repo.findById(id).orElseThrow();
        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setCategory(updatedBook.getCategory());
        book.setStatus(updatedBook.getStatus());
        book.setQuantity(updatedBook.getQuantity());
        book.setCover(updatedBook.getCover());
        return repo.save(book);
    }

    public void deleteBook(Long id) {
        repo.deleteById(id);
    }
}
