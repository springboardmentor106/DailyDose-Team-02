import React from 'react';

const Table = ({ reminders }) => {
  const reminderTableStyle = {
    // marginBottom: '10px',
  };

  const headerStyle = {
    color: '#6a58dc',
  };

  return (
    <div style={reminderTableStyle}>
      <h5 style={headerStyle}>Reminder</h5>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Time</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Activity</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reminder.time}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reminder.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;