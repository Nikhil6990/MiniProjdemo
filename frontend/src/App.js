import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import {  Route, Routes,Router} from 'react-router-dom';
import HomePage from './Pages/HomePage'
import ChatPage from './Pages/ChatPage';
import Login from './components/Authentication/Login';
import EmailVerify from './components/Authentication/EmailVerify';





function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/chats" element={<ChatPage/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/userController/:id/:verify/:token'  element = { <EmailVerify/>} />
      </Routes>
     
       
    </div>
  );
}

export default App;
