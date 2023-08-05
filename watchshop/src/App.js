// import { Router,Route } from 'react-router-dom';
import './App.css';
import Home from './component/home'
// import AddItem from './testProduct/addItem';
// import ListSP from './testProduct/ListSP';
// import Login from './testProduct/Login';

function App() {

  return (
    <div className="App">
      {/* <Router>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Router> */}
      {/* <AddItem /> */}
      {/* <ListSP /> */}
      <Home />
      
    </div>
  );
}

export default App;
