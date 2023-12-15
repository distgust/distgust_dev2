import { Outlet } from 'react-router-dom';
import React from 'react';


const Outleter = () => {
  return (
        <React.StrictMode>
          <Outlet/>
        </React.StrictMode>
    
  );
}

export default Outleter
