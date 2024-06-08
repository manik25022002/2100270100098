import React, { useState } from 'react';
import './App.css';

function App() {
  const [numberId, setNumberId] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    if (!['p', 'f', 'e', 'r'].includes(numberId)) {
      alert('Invalid number ID. Use p, f, e, or r.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:9876/numbers/${numberId}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <input
          type="text"
          value={numberId}
          onChange={(e) => setNumberId(e.target.value)}
          placeholder="Enter number ID (p, f, e, r)"
        />
        <button onClick={fetchData}>Fetch Numbers</button>
        {data && (
          <div>
            <h2>Results</h2>
            <p><strong>Previous Window State:</strong> {JSON.stringify(data.windowPrevState)}</p>
            <p><strong>Current Window State:</strong> {JSON.stringify(data.windowCurrState)}</p>
            <p><strong>Numbers:</strong> {JSON.stringify(data.numbers)}</p>
            <p><strong>Average:</strong> {data.avg}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
