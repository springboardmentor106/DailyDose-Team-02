import React from 'react';

const Table = ({ data, type }) => {
  const reminderTableStyle = {
    marginBottom: '10px',
  };

  const headerStyle = {
    color: '#6a58dc',
  };

  return (
    <div style={reminderTableStyle}>
      <h5 style={headerStyle}>{type}</h5>
      {data && data.length > 0 ?
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {type === "Reminders" && <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Time</th>}
              <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Activity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((reminder, index) => (
              <tr key={index}>
                {type === "Reminders" && <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reminder.startTime}</td>}
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reminder.title}</td>
              </tr>
            ))}
          </tbody>
        </table> :
        <div>No {type} yet</div>}
    </div>
  );
}

export default Table;