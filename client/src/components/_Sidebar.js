// Sidebar.js
import { useState } from 'react';
//import './CSS/Sidebar.css';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className='sidebar'>
      <button className="toggle-btn" onClick={toggleSidebar}>
    {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
  </button>
    <div className={`sidebar  ${isSidebarOpen ? 'open' : 'closed'}`}>
      <ul>
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
        {/* Add more links as needed */}
      </ul>
    </div>
    </nav>
  );
};

export default Sidebar;
