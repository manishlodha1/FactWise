import React, { useState, useEffect } from 'react';

const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      console.error("Invalid date format:", dob);
      return NaN; 
    }
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

export default function CelebDetails({ todo, onDelete, onUpdate, onEdit }) {
  const age = calculateAge(todo.dob);
  const isAdult = age >= 18;
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState({ ...todo });
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    setEditDetails({ ...todo });
    setIsSaveDisabled(true);
  }, [todo]);

  useEffect(() => {
    if (isEditing) {
      onEdit(); 
    }
  }, [isEditing, onEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
    validateDetails();
  };

  const validateDetails = () => {
    const { first = '', last = '', dob = '', gender = '', country = '', email = '', description = '' } = editDetails;
    const isEmpty = [first, last, dob, gender, country, email, description].some(field => !field.trim());
    const isValidCountry = /^[a-zA-Z\s]+$/.test(country);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValid = !isEmpty && isValidCountry && isValidEmail;
    setIsSaveDisabled(!isValid);
  };

  const handleSave = () => {
    onUpdate(editDetails);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditDetails({ ...todo });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDelete(todo);
    }
  };

  return (
    <div className="celeb-details">
      <h4>{isEditing ? `Editing: ${editDetails.first} ${editDetails.last}` : `${todo.first} ${todo.last}`}</h4>
      {isEditing ? (
        <div>
          <div className="form-group">
            <label htmlFor="first">First Name</label>
            <input
              type="text"
              id="first"
              name="first"
              value={editDetails.first}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last">Last Name</label>
            <input
              type="text"
              id="last"
              name="last"
              value={editDetails.last}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={editDetails.dob}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={editDetails.gender}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
              <option value="Rather not say">Rather not say</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={editDetails.country}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editDetails.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={editDetails.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button
            className="btn btn-sm btn-success"
            onClick={handleSave}
            disabled={isSaveDisabled}
          >
            Save
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p><strong>DOB:</strong> {todo.dob}</p>
          <p><strong>Gender:</strong> {todo.gender}</p>
          <p><strong>Country:</strong> {todo.country}</p>
          <p><strong>Email:</strong> {todo.email}</p>
          <p><strong>Description:</strong> {todo.description}</p>
          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
          {isAdult && (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      )}
    </div>
  );
}
