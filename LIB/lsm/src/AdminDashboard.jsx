import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    status: 'Available',
    quantity: 1,
    cover: ''
  });

  const fetchBooks = () => {
    axios.get('http://localhost:7777/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    axios.post('http://localhost:7777/api/books', form)
      .then(() => {
        fetchBooks();
        setForm({ title: '', author: '', category: '', status: 'Available', quantity: 1, cover: '' });
      });
  };

  const handleDelete = id => {
    axios.delete(`http://localhost:7777/api/books/${id}`)
      .then(() => fetchBooks());
  };

  const handleUpdate = id => {
    axios.put(`http://localhost:7777/api/books/${id}`, form)
      .then(() => {
        fetchBooks();
        setForm({ title: '', author: '', category: '', status: 'Available', quantity: 1, cover: '' });
      });
  };

  return (
    <div className="admin-dashboard">
      <h1>📚 Admin Book Management</h1>

      <div className="form-section">
        <input type="text" name="title" value={form.title} placeholder="Title" onChange={handleChange} />
        <input type="text" name="author" value={form.author} placeholder="Author" onChange={handleChange} />
        <input type="text" name="category" value={form.category} placeholder="Category" onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Checked Out">Checked Out</option>
        </select>
        <input type="number" name="quantity" value={form.quantity} onChange={handleChange} />
        <input type="text" name="cover" value={form.cover} placeholder="Image URL" onChange={handleChange} />
        <button onClick={handleAddBook}>Add Book</button>
      </div>

      <table className="book-table">
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b.id}>
              <td><img src={b.cover || '/default.jpg'} alt={b.title} width="50" /></td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>{b.status}</td>
              <td>{b.quantity}</td>
              <td>
                <button onClick={() => setForm(b)}>Edit</button>
                <button onClick={() => handleUpdate(b.id)}>Save</button>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
