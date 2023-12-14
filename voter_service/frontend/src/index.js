/*
References/Credits for this file:       
    React: https://react.dev/learn 
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import VoterLogin from './components/login';
import Dashboard from './components/dashboard';
import Candidates from './components/candidates';
import VotingScreen from './components/voting-screen';
import AboutMe from './components/aboutme';

const router = createBrowserRouter([
  {
    // These are the routes of our project. 
    // / is the parent root and children[] consists of the subsequent ones inside it.

    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <VoterLogin />
      },
      {
        path: "dashboard",
        element: <Dashboard /> // TODO
      },
      {
        path: "know_candidate",
        element: <Candidates />
      },
      {
        path: "vote",
        element: <VotingScreen />
      },
      {
        path: "aboutme",
        element: <AboutMe />
      },
      {
        path: "logout",
        element: <VoterLogin />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
