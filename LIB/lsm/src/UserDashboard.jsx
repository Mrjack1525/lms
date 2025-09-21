import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./UserDashboard.css";

export default function UserDashboard() {
  const [fullname, setFullname] = useState("Welcome");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const csrid = sessionStorage.getItem("csrid");
    if (!csrid) return navigate("/");

    // Get user fullname
    fetch("http://localhost:7777/users/getfullname", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ csrid }),
    })
      .then((res) => res.text())
      .then((res) => setFullname(res))
      .catch(() => setFullname("User"));

    // Fetch all books dynamically
    fetch("http://localhost:7777/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error(err));
  }, [navigate]);

  // Group books by category
  const groupByCategory = (category) =>
    books.filter((book) => book.category.toLowerCase() === category.toLowerCase());

  const handleStatusClick = (book) => {
    const msg = `"${book.title}" by ${book.author}\nQuantity: ${book.quantity} ${
      book.quantity === 1 ? "copy" : "copies"
    } ${book.status.toLowerCase() === "available" ? "available" : "checked out"}.`;
    alert(msg);
  };

  // Categories to display
  const categories = ["Trending", "Classic", "Kids"];

  return (
    <div className="dashboard-background">
      <div className="openlibrary-dashboard">
        <Navbar isAdmin={false} />
        <h2>Welcome, {fullname}</h2>

        {categories.map((cat) => {
          const catBooks = groupByCategory(cat);
          if (catBooks.length === 0) return null;
          return (
            <section className="book-section" key={cat}>
              <h3>{cat} Books</h3>
              <div className="book-list-scroll">
                {catBooks.map((book, index) => (
                  <div key={index} className="book-card">
                    <img src={book.cover || "/default.jpg"} alt={book.title} />
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                    <button
                      className={`book-status ${book.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                      onClick={() => handleStatusClick(book)}
                    >
                      {book.status}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
