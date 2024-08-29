import React, { useState, useEffect } from 'react';
import CelebDetails from './CelebDetails';

export default function CelebList({ todos, onDelete }) {
  const [expandedId, setExpandedId] = useState(null);
  const [celebrities, setCelebrities] = useState(todos);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCelebrities(todos);
  }, [todos]);

  useEffect(() => {
    // Filter celebrities 
    const filteredCelebrities = todos.filter(celeb =>
      `${celeb.first} ${celeb.last}`.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCelebrities(filteredCelebrities);
  }, [searchQuery, todos]);

  const handleToggle = (id) => {
    // if no one is editing then open other 
    if (editingId === null || editingId === id) {
      setExpandedId(expandedId === id ? null : id);
    }
  };

  const handleUpdate = (updatedDetails) => {
    setCelebrities(prevCelebrities =>
      prevCelebrities.map(celeb =>
        celeb.sno === updatedDetails.sno ? { ...celeb, ...updatedDetails } : celeb
      )
    );
    setEditingId(null); 
  };

  const handleEdit = (id) => {
    setEditingId(id);
    setExpandedId(id); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='container my-3'>
      <h3 className='my-3'>Celebrity List</h3>
      <form className="d-flex mb-3" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Celebrity"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn btn-outline-success" type="button" disabled>
          Search
        </button>
      </form>
      {celebrities.map((celebri) => (
        <div key={celebri.sno} className="accordion">
          <div className="accordion-header" onClick={() => handleToggle(celebri.sno)}>
            <h4>
              {celebri.first} 
              {expandedId === celebri.sno ? ' -' : ' +'}
            </h4>
          </div>
          {expandedId === celebri.sno && (
            <div className="accordion-body">
              <CelebDetails
                todo={celebri}
                onDelete={onDelete}
                onUpdate={handleUpdate}
                onEdit={() => handleEdit(celebri.sno)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
