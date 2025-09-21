import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import Home from './Home'
import './App.css'

function Home2() {
  return (
    <div className="app">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="background-video">
        <source
          src="/vecteezy_4k-slow-motion-of-open-book-with-blank-page-on-black_9295506.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>

      {/* Navbar */}
      <nav className="navbar2">
        <div className="nav-links">
          <img src="./openlibrary-logo.png" alt="Library Logo" className="logo" />
          <a href="#home" className="active">Home</a>
          <a href="#about">About</a>
          <a href="#collections">Collections</a>
          <a href="#events">Events</a>
          <a href="#support">Support</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-right">
          <FaUserCircle className="user-icon" />
          <a href="/login">Log In </a>
          <a href="/signup">Sign Up</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="hero-section">
        <div className="hero-text">
          <h1>POLABOOKS<br />ONLINE</h1>
          <button className="cta-button">UP TO 70% OFF</button>
          <p className="subtext">*ON SELECT TITLES ALL NOVEMBER LONG</p>
        </div>
      </div>

      {/* Home Content */}
      <Home />

      {/* About Section */}
      <section id="about" className="info-section">
        <h2>About PolaBooks</h2>
        <p>
          PolaBooks is your one-stop destination for literary treasures, catering to readers of all ages and tastes.
          Founded in 2002, we’ve grown into a community-focused platform that celebrates literature, storytelling, and
          creativity. From rare editions to modern bestsellers, we aim to connect readers with books they'll love and remember.
        </p>
      </section>

      {/* Collections Section */}
      <section id="collections" className="info-section">
        <h2>Our Collections</h2>
        <p>
          Explore thousands of titles across genres: fiction, non-fiction, science, fantasy, romance, historical literature, and more.
          We also maintain curated sections including:
        </p>
        <ul>
          <li>Trending Books of the Month</li>
          <li>Staff Picks & Recommendations</li>
          <li>Children’s Stories & Educational Resources</li>
          <li>Rare Books & Archives</li>
        </ul>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section">
        <h2 className="section-title">Upcoming Events <img src="/event-books.jpg" alt="Library Event" /></h2>
        <div className="events-content">
          <div className="events-text">
            <h4>POSTER-MAKING CONTEST</h4>
            <p>
              Join our annual celebration of all things art and literature.
              Winners will be announced on August 31. Click here for more details.
            </p>
            <h4>MEET AND GREET STELLA ORNELAS</h4>
            <p>
              Award-winning poet Stella Ornelas is dropping by on March 10, 7 PM.
              She will be reading from her new collection, <i>Spring</i>,
              and signing copies. Buy tickets now!
            </p>
            <h4>STORY TIME WITH FRIENDS</h4>
            <p>
              Read books and spend time with kids for an afternoon in an event
              hosted by the Lily River Children’s Foundation. Volunteer now.
            </p>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="info-section">
        <h2>Support PolaBooks</h2>
        <p>
          Help us grow our reading community! You can support us by donating books, volunteering at events,
          or becoming a member. Every contribution helps us bring literature closer to everyone.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="info-section">
        <h2>Contact Us</h2>
        <p>Email: contact@polabooks.org</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Location: 123 Library Lane, Booktown, USA</p>
      </section>
    </div>
  )
}

export default Home2;
