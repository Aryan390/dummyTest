import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [faculty, setFaculty] = useState([]);

  const getFaculty = async () => {
    const res = await fetch('http://localhost:4000/');
    const data = await res.json();
    setFaculty(data);
  };

  const getFacultyInfo = async (currFaculty) => {
    const res = await fetch(`http://localhost:4000/${currFaculty._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    const oldFaculty = [...faculty];
    const newFaculty = oldFaculty.filter((fac) => fac._id !== data._id);
    setFaculty(newFaculty);
  };

  useEffect(() => {
    getFaculty();
    console.log('first');
  }, [faculty.length]);

  const submitHandler = (e) => {
    e.preventDefault();

    const postFaculty = async (currFaculty) => {
      try {
        const response = await fetch('http://localhost:4000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currFaculty),
        });
        const data = await response.json();
        setFaculty((prevFaculty) => [...prevFaculty, data]);
      } catch (error) {
        console.error(error);
      }
    };

    postFaculty({ name, location });
  };

  return (
    <>
      <div className='App'>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: 'block' }}
            placeholder='Name'
          />
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ display: 'block' }}
            placeholder='Location'
          />
          <button>Submit</button>
        </form>
      </div>
      <div>
        <h1>Faculty</h1>
        {faculty.length > 0 &&
          faculty.map((fac) => (
            <div key={fac._id} onClick={(e) => getFacultyInfo(fac)}>
              name: {fac.name}, location: {fac.location}
            </div>
          ))}
      </div>
      <div>click to delete , on the faculty </div>
    </>
  );
}

export default App;
