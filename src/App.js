import React, {useState, useEffect} from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route, Link,BrowserRouter as Router,
  useHistory, Switch,
  useLocation,Outlet,
  useParams } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
const Navigation = React.lazy(() => import("./components/Navigation"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Home = React.lazy(() => import("./pages/Home"));
const Add = React.lazy(() => import("./components/Add"));
const Login = React.lazy(() => import("./components/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Logout = React.lazy(() => import("./components/Logout"));

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <React.Suspense fallback={<>Loading...</>}>
        <Navigation >
          <ScrollToTop />
        <Routes>
          <Route path="/" 
            element={
            <React.Suspense fallback={<>...</>}>
              <Home />
            </React.Suspense>
            } 
          />
          <Route path="contact" 
            element={
            <React.Suspense fallback={<>...</>}>
              <Contact />
            </React.Suspense>
            } 
          />
          <Route path="login" 
            element={
            <React.Suspense fallback={<>...</>}>
              <Login />
            </React.Suspense>
            } 
          />
          <Route exact path='/home' element={<ProtectedRoute/>}>
            <Route path='/home' element={
              <React.Suspense fallback={<>...</>}>
                  <Dashboard />
                </React.Suspense>
            }>
                <Route path='add' element={
                  <React.Suspense fallback={<></>}>
                    <Add />
                  </React.Suspense>
                }/>
                </Route>
            </Route>
          <Route exact path='/logout' element={<ProtectedRoute/>}>
              <Route exact path='/logout' element={
                <React.Suspense fallback={<>...</>}>
                  <Logout />
                </React.Suspense>
              }/>
          </Route>
        </Routes>
        </Navigation>
      </React.Suspense>
    
    </AuthProvider>
  );
}

export default App;

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}