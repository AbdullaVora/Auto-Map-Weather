import React from 'react';
import LocationBox from '../components/LocationBox';

const Home = () => {
  return (
    <>
      <div
        className="d-flex align-items-center flex-column justify-content-center"
        style={{ minHeight: '100vh', backgroundColor: '#121212' }}>
        <h1 className='d-block text-white mb-5 display-5'>Location & Weather</h1>
        <LocationBox />
      </div >
    </>
  );
};

export default Home;
