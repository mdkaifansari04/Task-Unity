import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import Home from './pages/home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import AddUser from './components/layout/Admin/AddUser';
import Chat from './pages/chat/Chat';
import AddTask from './pages/tasks/add_task/AddTask';
import ViewTask from './pages/tasks/view_task/ViewTask';
import UserProfile from './pages/users/UserProfile';
import { useContext, useEffect } from 'react';
import HomeContext from './global/context/homeContext/HomeContext';
import LoadingAnimation from './components/ui/Animation/LoadingAnimation';


function App() {
  const context = useContext(HomeContext)
  const { loading } = context

  return (
    <>
      {loading ? <LoadingAnimation /> :
        <main>
          <Router>
            <Routes>
              <Route path='/' element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path='chat' element={<Chat />} />
                <Route path='add-user' element={<AddUser />} />
                <Route path="add-task" element={<AddTask />} />
                <Route path="view-task" element={<ViewTask />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/admin/login' element={<Login />} />
              <Route exact path='/admin/register' element={<Register />} />
            </Routes>
          </Router>
        </main>}
    </>
  );
}

export default App;
