import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
const Channel = loadable(() => import('./pages/Channel/Channel'));
const Login = loadable(() => import('./pages/Login/Login'));
const Signup = loadable(() => import('./pages/signup/Signup'));
const DirectMessage = loadable(() => import('./pages/DM/DirectMessage'));
const Workspace = loadable(() => import('./layouts/Workspace'));
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" index element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/workspace" element={<Workspace />}>
            <Route path="/workspace/channel" element={<Channel />}></Route>
            <Route path="/workspace/dm" element={<DirectMessage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
