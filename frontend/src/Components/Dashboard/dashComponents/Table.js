import React from 'react';

const Table = ({ reminders }) => {
  

  return (
    <div className="table">
      <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Actvities</th>
        </tr>
      </thead>
      <tbody>
      {reminders.map((reminds,index)=>(
        <tr key={index}>
        <td>{reminds.time}</td>
        <td>{reminds.activity}</td>
      </tr>
      ))}
      
      
      </tbody>
      </table>
    </div>
  );
}

export default Table;