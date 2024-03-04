import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import loadable from '@loadable/component';
const Login = loadable(() => import('./pages/Login/Login'));
const Signup = loadable(() => import('./pages/signup/Signup'));
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" index element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
