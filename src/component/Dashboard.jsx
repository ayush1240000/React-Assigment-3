import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

export default function Dashboard() {
  
  const navigator = useNavigate();
  const [records, setRecords] = useState([]);
  const [tempRecord, setTempRecord] = useState({ title: '', body: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoggedout ,setisLoggedOut] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
 const [postsPerPage] = useState(5); 
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => setRecords(res.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
  };

  const handleAddRecord = () => {
    if (tempRecord.title.trim() !== '' && tempRecord.body.trim() !== '') {
      axios.post('https://jsonplaceholder.typicode.com/posts', tempRecord)
        .then((res) => {
          setRecords([res.data, ...records]);
          setTempRecord({ title: '', body: '' });
        })
        .catch((error) => console.error('Error adding record:', error));
    }
  };

  const handleEditClick = (index, id) => {
    setEditingIndex(index);
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => setTempRecord(res.data))
      .catch((error) => console.error('Error fetching record for editing:', error));
  };

  const handleUpdateRecord = (index, id) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, tempRecord)
      .then((res) => {
        const updatedRecords = [...records];
        updatedRecords[index] = res.data;
        setRecords(updatedRecords);
        setTempRecord({ title: '', body: '' });
        setEditingIndex(null);
      })
      .catch((error) => console.error('Error updating record:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        const updatedRecords = records.filter(record => record.id !== id);
        setRecords(updatedRecords);
      })
      .catch((error) => console.error('Error deleting record:', error));
  };

  const handleLogout = () =>{
    localStorage.removeItem("isAuthenticated");
    navigator("/Login");
  }

  const indexOfLastPost = currentPage * postsPerPage;  
  const indexOfFirstPost = indexOfLastPost - postsPerPage; 
  const currentPosts = records.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <div className="container"> 
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label> 
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            name="title"
            value={tempRecord.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            className="form-control"
            id="body"
            rows={3}
            placeholder="Enter body"
            name="body"
            value={tempRecord.body}
            onChange={handleInputChange}
          />
        </div>

        <Button variant="primary" onClick={handleAddRecord}>
          Add Record
        </Button>
      </form>
      <h3>Permanent Records</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((record, index) => (
            <tr key={record.id}>
              <td onClick={() => handleEditClick(indexOfFirstPost + index, record.id)}>
                {editingIndex === (indexOfFirstPost + index) ? (
                  <input
                    type="text"
                    value={tempRecord.title}
                    name="title"
                    onChange={handleInputChange}
                    onBlur={() => handleUpdateRecord(indexOfFirstPost + index, record.id)}
                  />
                ) : (
                  record.title
                )}
              </td>
              <td onClick={() => handleEditClick(indexOfFirstPost + index, record.id)}>
                {editingIndex === (indexOfFirstPost + index) ? (
                  <textarea
                    rows="3"
                    value={tempRecord.body}
                    name="body"
                    onChange={handleInputChange}
                    onBlur={() => handleUpdateRecord(indexOfFirstPost + index, record.id)}
                  />
                ) : (
                  record.body
                )}
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(Math.ceil(records.length / postsPerPage)).keys()].map(number => (
          <Pagination.Item key={number+1} onClick={() => paginate(number + 1)} active={number + 1 === currentPage}>
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(records.length / postsPerPage)} />
      </Pagination>
      <Button variant="danger" onClick={() => handleLogout()}>
                Logout
      </Button>
    </div>
    </>
  );
}
