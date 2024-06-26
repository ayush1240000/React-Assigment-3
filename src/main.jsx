import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './component/Home.jsx'
import Login from './component/Login.jsx'
import Dashboard from './component/Dashboard.jsx'
import { createBrowserRouter, RouterProvider, redirect} from 'react-router-dom'
import NavBar from './component/NavBar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
const router = createBrowserRouter([
  {
    path: "",
    element: (
      <>
        <NavBar />
        <Home />  
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <NavBar />
        <Login />
      </>
    ),
  },
  {
    path: "/Dashboard",
    loader: () => {
      let item = localStorage.getItem("isAuthenticated");
      console.log("item", item);
      if (item !== "authenticated") {
        return redirect("/");
      }
      return null;
    },
    element: (
      <>
        <NavBar />
        <Dashboard/>
      </>
    ),
  },


]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
