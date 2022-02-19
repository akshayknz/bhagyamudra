import React, {useState, useEffect} from 'react';
import './App.css';
import Navigation from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';
import { Routes, Route, Link,BrowserRouter as Router,
  useHistory, Switch,
  useLocation,
  useParams } from "react-router-dom";
const Contact = React.lazy(() => import("./pages/Contact"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./components/Login"));

function App() {

  return (
    <AuthProvider>
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
      </Routes>
    </Navigation>
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