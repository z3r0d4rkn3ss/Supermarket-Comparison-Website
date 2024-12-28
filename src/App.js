import React, { useState } from 'react';
import CompareForm from './components/CompareForm';
import Results from './components/Results';
import './styles.css';

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <div className="app">
      <h1>Supermarket Price Comparison</h1>
      <CompareForm setResults={setResults} />
      <Results results={results} />
    </div>
  );
};

export default App;
