import { useState, useEffect } from 'react';
import { Firebase } from '../firebase/Firebase';


//Only use in components inside FireAuthProviders
export const useAuthCheck = () => {
	
    const [authorized, setAuthorized] = useState(false);

    useEffect( () => {
        setAuthorized(Firebase.isSignedIn())
    },[Firebase.auth.currentUser])
	
    return authorized
  }