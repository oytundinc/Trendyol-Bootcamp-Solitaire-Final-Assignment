import './App.css';
//import Button from './components/button/Button';
import Navbar from './components/navbar/Navbar';
import Card from "./components/card/Card"

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      
      <Card rank={"5"} suit={"♠️"}></Card>
      
    </div>
  );
}

export default App;
