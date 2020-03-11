import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p className='my-1'>
        This is a full stack React app using mysql database and nodejs for backend to store locations users have visited.
      </p>
      <p className='bg-dark p'>
        <strong>Version: 1.0.0</strong>
      </p>
    </div>
  );
};

export default About;