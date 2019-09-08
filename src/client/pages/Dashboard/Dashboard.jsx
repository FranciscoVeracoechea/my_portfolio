import React from 'react';


const Dashboard = ({
  auth: { user },
}) => (
  <div
    style={{
      padding: '8em',
      color: '#eee',
    }}
  >
    <h2>Dashboard</h2>
    <h4>{user.username}</h4>
    <h5>{user.email}</h5>
  </div>
);

export default Dashboard;
