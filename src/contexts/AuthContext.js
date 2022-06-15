import React, { useContext, useState, useEffect } from "react"
import { auth } from "../functions/Firebase"
import { getAuth, signInWithPopup, reauthenticateWithPopup, GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider, linkWithCredential } from "firebase/auth";
const AuthContext = React.createContext('a')
const loginAuth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const emailProvider = new EmailAuthProvider();

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState([])
  const [settings, setSettings] = useState([])
  const pagesArr = [{"Home":"/"}, {"Contact us":"/contact"}];
  const settingsArr = [];

  function signup(name, email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then(function(user) {
        var user = auth.currentUser;
        user.updateProfile({
            displayName: name
        }).then(function() {console.log("updated user display name")}, function(error) {});        
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function loginWithGoogle() {
    return signInWithPopup(loginAuth, googleProvider)
  }

  function reauthWithGoogle() {
    return reauthenticateWithPopup(loginAuth, googleProvider)
  }

  function loginWithFacebook() {
    let existingEmail = null;
    var pendingCred = null;
    return signInWithPopup(loginAuth, facebookProvider).then(function(result) {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
    })
    .catch(function(error) {
        pendingCred = FacebookAuthProvider.credentialFromError(error);
        auth.fetchProvidersForEmail(error.customData.email).then(function(providers) {
        if (providers.indexOf(EmailAuthProvider.PROVIDER_ID) != -1) {
          var password = window.prompt('Please provide the password for ' + existingEmail);
          return auth.signInWithEmailAndPassword(existingEmail, password);    
        } else if (providers.indexOf(GoogleAuthProvider.PROVIDER_ID) != -1) {
          googleProvider.setCustomParameters({'login_hint': existingEmail});
          return signInWithPopup(loginAuth, googleProvider).then(function(result) {
            return result.user;
          });
        } else {
        }
      })
      .then(function(user) {
        return linkWithCredential(user, pendingCred);
      });
      throw error;
    });
     
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    if(currentUser != null) {
      pagesArr.push({"Dashboard":"/home"})
      settingsArr.push({"My Account":"/account"}, {"Logout":"/logout"})
    }else{
      pagesArr.push({"Login":"/login"})
    }
    setSettings(settingsArr)
    setPages(pagesArr)
    return unsubscribe
  }, [currentUser])


  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    loginWithGoogle,
    loginWithFacebook,
    reauthWithGoogle,
    pages,
    settings
  }

  return (
    <AuthContext.Provider value={value}>
      {
        (loading)? 
          ``
          :children
      }
    </AuthContext.Provider>
  )
}