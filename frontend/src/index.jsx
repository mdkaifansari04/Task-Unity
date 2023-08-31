import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeState from './global/context/homeContext/HomeState';
import UserState from './global/context/userContext/UserState';
import AlertState from './global/context/alertContext/AlertState';
import TaskState from './global/context/taskContext/TaskState';
import AuthState from './global/context/authContext/AuthState';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <AlertState>
      <AuthState>
      <HomeState>
          <UserState>
            <TaskState>
              <App />
            </TaskState>
          </UserState>
        </HomeState>
      </AuthState>
    </AlertState>
  </React.StrictMode>
);

reportWebVitals();
