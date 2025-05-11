import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [fullname, setFullname] = useState('Welcome');
  const [books, setBooks] = useState([]);
  const [classics, setClassics] = useState([]);
  const [kids, setKids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const csrid = sessionStorage.getItem('csrid');
    if (!csrid) return navigate('/');

    fetch('http://localhost:7777/users/getfullname', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ csrid }),
    })
      .then(res => res.text())
      .then(res => setFullname(res))
      .catch(() => setFullname('User'));

    setBooks([
      { title: "Atomic Habits", author: "James Clear", status: "Available", quantity: 5, cover: "/book1.png" },
      { title: "Sapiens", author: "Yuval Noah Harari", status: "Checked Out", quantity: 0, cover: "/book2.png" },
      { title: "The Alchemist", author: "Paulo Coelho", status: "Available", quantity: 3, cover: "/book3.jpg" },
      { title: "The Psychology of Money", author: "Morgan Housel", status: "Available", quantity: 2, cover: "/Screenshot 2025-05-11 012836.png" },
      { title: "Ikigai", author: "Héctor García & Francesc Miralles", status: "Checked Out", quantity: 0, cover: "/book5.png" },
      { title: "1984", author: "George Orwell", status: "Available", quantity: 4, cover: "/book6.png" },
    ]);

    setClassics([
      { title: "Pride and Prejudice", author: "Jane Austen", status: "Available", quantity: 4, cover: "/Bookc1.png" },
      { title: "Moby-Dick", author: "Herman Melville", status: "Checked Out", quantity: 0, cover: "/bookc2.png" },
      { title: "Great Expectations", author: "Charles Dickens", status: "Available", quantity: 3, cover: "/bookc3.png" },
      { title: "The Odyssey", author: "Homer", status: "Available", quantity: 5, cover: "/bookc4.png" },
      { title: "Crime and Punishment", author: "Fyodor Dostoevsky", status: "Checked Out", quantity: 0, cover: "/bookc5.png" },
      { title: "The Catcher in the Rye", author: "J.D. Salinger", status: "Available", quantity: 2, cover: "/bookc6.png" },
    ]);

    setKids([
      { title: "Charlotte's Web", author: "E.B. White", status: "Available", quantity: 6, cover: "/public/bookk1.png" },
      { title: "Matilda", author: "Roald Dahl", status: "Available", quantity: 4, cover: "/public/bookk2.png" },
      { title: "The Cat in the Hat", author: "Dr. Seuss", status: "Available", quantity: 5, cover: "/public/bookk3.png" },
      { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", status: "Available", quantity: 8, cover: "/bookk4.jpg" },
      { title: "Alice in Wonderland", author: "Lewis Carroll", status: "Checked Out", quantity: 0, cover: "/bookk5.jpg" },
      { title: "Winnie-the-Pooh", author: "A.A. Milne", status: "Available", quantity: 7, cover: "/bookk6.jpg" },
    ]);
  }, [navigate]);

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleStatusClick = (book) => {
    const msg = `"${book.title}" by ${book.author}\nQuantity: ${book.quantity} ${book.quantity === 1 ? 'copy' : 'copies'} ${book.status.toLowerCase() === 'available' ? 'available' : 'checked out'}.`;
    alert(msg);
  };

  return (
    <div className="dashboard-background">
      <div className="openlibrary-dashboard">
        {/* Top Navbar */}
        <div className="top-navbar">
          <span className="archive-label">📚 INTERNET ARCHIVE</span>
          <div className="top-right-buttons">
            <button className="donate-btn">Donate ❤️</button>
            <select className="lang-select">
              <option>English (en)</option>
              <option>हिंदी</option>
            </select>
          </div>
        </div>

        {/* Main Navigation */}
        <header className="main-header">
          <div className="logo-section">
            <span className="main-title">Open Library</span>
          </div>
          <nav className="nav-links">
            <a href="#">My Books</a>
            <div className="dropdown">
              <button>Browse ▼</button>
              <div className="dropdown-content">
                <a href="#">Genres</a>
                <a href="#">Authors</a>
                <a href="#">New Arrivals</a>
              </div>
            </div>
          </nav>
          <div className="search-profile-section">
            <select className="filter-dropdown">
              <option>All</option>
              <option>Books</option>
              <option>Authors</option>
            </select>
            <input type="text" placeholder="Search" className="search-input" />
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
        </header>

        {/* Feature Section */}
        <section className="features-wrapper">
          <h2>Welcome to Open Library</h2>
          <div className="feature-cards">
            <div className="feature-box">
              <img src="/book-stack.jpg" alt="Read Online" />
              <p><strong>Read Free Library Books Online</strong><br />Millions of books available through Controlled Digital Lending</p>
            </div>
            <div className="feature-box">
              <img src="/image3.jpg" alt="Goal" />
              <p><strong>Set a Yearly Reading Goal</strong><br />Track your progress throughout the year</p>
            </div>
            <div className="feature-box">
              <img src="/image4.jpg" alt="Favorites" />
              <p><strong>Keep Track of Your Favorite Books</strong><br />Use lists and a reading log</p>
            </div>
          </div>
        </section>

        {/* Classics Section */}
        <section className="book-section">
          <h3>Classics</h3>
          <div className="book-list-scroll">
            {classics.map((book, index) => (
              <div key={index} className="book-card">
                <img src={book.cover || '/default.jpg'} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <button
                  className={`book-status ${book.status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleStatusClick(book)}
                >
                  {book.status}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Books Section */}
        <section className="book-section">
          <h3>Trending Books</h3>
          <div className="book-list-scroll">
            {books.map((book, index) => (
              <div key={index} className="book-card">
                <img src={book.cover || '/default.jpg'} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <button
                  className={`book-status ${book.status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleStatusClick(book)}
                >
                  {book.status}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Kids Books Section */}
        <section className="book-section">
          <h3>Kids Books</h3>
          <div className="book-list-scroll">
            {kids.map((book, index) => (
              <div key={index} className="book-card">
                <img src={book.cover || '/default.jpg'} alt={book.title} />
                <h4>{book.title}</h4>
                <p>{book.author}</p>
                <button
                  className={`book-status ${book.status.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleStatusClick(book)}
                >
                  {book.status}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <footer className="user-dashboard-footer">
          <div className="footer-top">
            <a href="#" className="footer-link">Browse by Subject</a>
            <div className="subject-icons">
              <div><img src="/icon-art.png" alt="Art" /><p>Art<br /><small>118,554 Books</small></p></div>
              <div><img src="/icon-sf.png" alt="Science Fiction" /><p>Science Fiction<br /><small>19,563 Books</small></p></div>
              <div><img src="/icon-fantasy.png" alt="Fantasy" /><p>Fantasy<br /><small>12,834 Books</small></p></div>
              <div><img src="/icon-biography.png" alt="Biographies" /><p>Biographies<br /><small>25,820 Books</small></p></div>
              <div><img src="/icon-recipes.png" alt="Recipes" /><p>Recipes<br /><small>9,414 Books</small></p></div>
              <div><img src="/icon-romance.png" alt="Romance" /><p>Romance<br /><small>19,821 Books</small></p></div>
            </div>
          </div>

          <div className="footer-middle">
            <h3>Around the Library</h3>
            <p>Here's what's happened over the last 28 days. <a href="#">recent changes</a></p>
            <div className="stats-bar">
              <div><strong>69,589,041</strong><br />UNIQUE VISITORS</div>
              <div><strong>193,273</strong><br />NEW MEMBERS</div>
              <div><strong>1,047,310</strong><br />CATALOG EDITS</div>
              <div><strong>3,120</strong><br />LISTS CREATED</div>
              <div><strong>227,865</strong><br />EBOOKS BORROWED</div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="about-project">
              <h3>About the Project</h3>
              <p>
                Open Library is an open, editable library catalog, building towards a web page for every book ever published. <a href="#">More</a>
              </p>
              <p className="small">
                Just like Wikipedia, you can contribute new information or corrections to the catalog.
                You can browse by <a href="#">subjects</a>, <a href="#">authors</a>, or <a href="#">lists</a> members have created.
                If you love books, why not help build a library?
              </p>
            </div>
            <div className="blog-posts">
              <h3>Latest Blog Posts</h3>
              <ul>
                <li><a href="#">Refining the Open Library Catalogue: My Internship Story</a> - <em>March 21, 2025</em></li>
                <li><a href="#">API Search.json Performance Tuning</a> - <em>January 16, 2025</em></li>
                <li><a href="#">Improving Search, Removing Dead-Ends</a> - <em>October 3, 2024</em></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
