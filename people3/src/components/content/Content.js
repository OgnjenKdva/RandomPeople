import './content.css'
import { useEffect, useRef, useState } from 'react'
    
const Content = (props) => {
    return (
      <div>
        <h2>User Data:</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((user, index) => (
              <tr key={index}>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.dob.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {props.averageAgeOfUsers && <h2>Average age is {Math.round(props.averageAgeOfUsers)}</h2>}
      </div>
    );
  };
  
  export default Content;