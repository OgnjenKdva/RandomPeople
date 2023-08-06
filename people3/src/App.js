import './App.css';
import Navigation from "./components/navigation/Navigation.js";
import Content from './components/content/Content.js';
import { useEffect, useRef, useState } from 'react'


function App(props) {


  const [data, setData] = useState([]);
  const [averageAgeOfUsers, setAverageAgeOfUsers] = useState();

  const fetchData = () => {
    const apiUrl = 'https://randomuser.me/api/?results=10';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data.results);
        calculateAverageAge(data.results);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const calculateAverageAge = (users) => {
    const average =
      users.map(user => user.dob.age).reduce((prev, curr) => prev + (curr ?? 0), 0) / users.length;
    console.log(average);
    setAverageAgeOfUsers(average);
  };

  const handleToggleAction=()=>{
    console.log('Clicked in App.js');
  }

  return (
    <div className="App">
      <Navigation
        onToggleAction={handleToggleAction}
        fetchData={fetchData}
      />
      <Content data={data} averageAgeOfUsers={averageAgeOfUsers} />
    </div>
  );
}

export default App;
