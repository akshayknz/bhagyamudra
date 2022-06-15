import React from 'react'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import Provider, { Context } from './contexts/GlobalContext'
import { Routes, Route, useLocation } from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
const ScrollToTopOnMount = React.lazy(() => import("./components/ScrollToTopOnMount"))
const Contact = React.lazy(() => import("./pages/Contact"))
const Login = React.lazy(() => import("./components/Login"))
const Logout = React.lazy(() => import("./components/Logout"))
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Add = React.lazy(() => import("./components/Add"))
const Delete = React.lazy(() => import("./components/Delete"))
const MyAccount = React.lazy(() => import("./pages/MyAccount"))

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <Provider>
        <Navigation >
        <Routes>
          <Route path="/" 
            element={
            <>
            <React.Suspense fallback={<>...</>}>
              <ScrollToTopOnMount />
            </React.Suspense>
              <Home />
            </>
            } 
          />
          <Route path="contact" 
            element={
            <React.Suspense fallback={<>...</>}>
              <ScrollToTopOnMount />
              <Contact />
            </React.Suspense>
            } 
          />
          <Route path="login" 
            element={
            <React.Suspense fallback={<>...</>}>
              <ScrollToTopOnMount />
              <Login />
            </React.Suspense>
            } 
          />
          <Route exact path='/home' element={<ProtectedRoute/>}>
            <Route path='/home' element={
              <React.Suspense fallback={<>...</>}>
                  <ScrollToTopOnMount />
                  <Dashboard />
                </React.Suspense>
            }>
                <Route path='profile/:action' element={
                  <React.Suspense fallback={<></>}>
                    <Add />
                  </React.Suspense>
                }>
                  <Route path=':id' element={
                  <React.Suspense fallback={<></>}>
                    <Add />
                  </React.Suspense>
                  }>
                  </Route>
                </Route>
                <Route path='profile/delete/:id' element={
                  <React.Suspense fallback={<></>}>
                    <Delete />
                  </React.Suspense>
                }></Route>
              </Route>
            </Route>
          <Route exact path='/logout' element={<ProtectedRoute/>}>
              <Route exact path='/logout' element={
                <React.Suspense fallback={<>...</>}>
                  <Logout />
                </React.Suspense>
              }/>
          </Route>
          <Route exact path='/account' element={<ProtectedRoute/>}>
              <Route exact path='/account' element={
                <React.Suspense fallback={<>...</>}>
                  <ScrollToTopOnMount />
                  <MyAccount />
                </React.Suspense>
              }/>
          </Route>
        </Routes>
        </Navigation>
      </Provider>
    </AuthProvider>
  );
}

export default App