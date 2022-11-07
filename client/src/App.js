import './App.css';
import Table from './components/Table';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" /> 
        <h2>Git Pull requests Logs</h2>
        <Table />
      </div>
      );
}

      export default App;
