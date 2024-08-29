import React, { useEffect, useState } from 'react';
import celebritiesData from './celebrities.json';


const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
};
  

export default function AddCeleb({addTodo}) {
  const [celebrities, setCelebrities] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [country, setCountry] = useState("");
  const [selectedCeleb, setSelectedCeleb] = useState("");

    useEffect(()=>{
        setCelebrities(celebritiesData)
    },[]);
  const handleCelebrityChange = (e) => {
    const celebId = e.target.value;
    const celeb = celebrities.find(celeb => celeb.id === parseInt(celebId));
    setSelectedCeleb(celeb);
    if (celeb) {
      setFirst(celeb.first);
      setLast(celeb.last);
    //   setDob(celeb.dob);
    //   setGender(celeb.gender);
    //   setEmail(celeb.email);
    //   setCountry(celeb.country);
    //   setDesc(celeb.description);

    } else {
    
      setFirst("");
      setLast("");
      setDob("");
      setGender("");
      setEmail("");
      setCountry("");
      setDesc("");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!first ) {
      alert("first name cannot be blanked");
      return;
    }
    const age = calculateAge(dob);
    addTodo(first,last,desc,gender,age,dob,country,email);
    setFirst("");
    setLast("");
      setDob("");
      setGender("");
      setEmail("");
      setCountry("");
      setDesc("");
    setSelectedCeleb("");
  };

  return (
    <div className='container my-3'>
      <h3>Add Celebrity</h3>
      <form onSubmit={submit}>
      {/* <div className="form-group">
          <label htmlFor="first">First Name</label>
          <input
            type="text"
            value={selectedCeleb ? selectedCeleb.id : ""}
            onChange={handleCelebrityChange}
            className="form-control"
            id="first"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last">Last Name</label>
          <input
            type="text"
            value={last}
            onChange={(e) => { setLast(e.target.value) }}
            className="form-control"
            id="last"
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="celebrity">First Name</label>
          <select
            id="first"
            className="form-control"
            value={selectedCeleb ? selectedCeleb.id : ""}
            onChange={handleCelebrityChange}
          >
            <option value="">Select a celebrity</option>
            {celebritiesData.map(celeb => (
              <option key={celeb.id} value={celeb.id}>
                {celeb.first} 
              </option>
            ))}
          </select>
          <label htmlFor="celebrity">Last Name</label>
          <select
            id="first"
            className="form-control"
            value={selectedCeleb ? selectedCeleb.id : ""}
            onChange={handleCelebrityChange}
          >
            <option value="">Select a celebrity</option>
            {celebritiesData.map(celeb => (
              <option key={celeb.id} value={celeb.id}>
                {celeb.last} 
              </option>
            ))}
          </select>
          <label htmlFor="gender">Gender</label>
          <select
            id="celebrity"
            className="form-control"
            value={gender}
            onChange={(e)=> setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
              <option value="Rather not say">Rather not say</option>
              <option value="Other">Other</option>
          </select>
          
        </div>
        
        <div className="form-group">
          <label htmlFor='dob'>DOB</label>
          <input
            type="date"
            className="form-control"
            value={dob}
            onChange={(e) => { setDob(e.target.value) }}
            id="dob"
          />
        </div>
        <div className="form-group">
          <label htmlFor='country'>Country</label>
          <input
            type="text"
            className="form-control"
            value={country}
            onChange={(e) => { setCountry(e.target.value) }}
            id="country"
          />
        </div>
        <div className="form-group">
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor='desc'>Description</label>
          <input
            type="text"
            className="form-control"
            value={desc}
            onChange={(e) => { setDesc(e.target.value) }}
            id="desc"
          />
        </div>
        <button type="submit" className="btn btn-sm btn-success">
          Add Celebrity
        </button>
      </form>
    </div>
  );
}
