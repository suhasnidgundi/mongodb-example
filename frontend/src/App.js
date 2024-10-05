
import './App.css';
import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleItemAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Item Management System</h1>
      <div className="row g-4">
        <div className="col-md-5">
          <ItemForm onItemAdded={handleItemAdded} />
        </div>
        <div className="col-md-7">
          <ItemList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}

export default App;