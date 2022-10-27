import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { db_api } from "../database/Api";
import { firebaseConfig } from "./firebaseConfig";

export namespace Firebase{
    export const app = initializeApp(firebaseConfig)
    export const auth = getAuth(app)

    export const signIn = async()=>{
        //Sign in through Firebase
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(
            async(credential)=>{
                //Check if this is a first time sign in
                const token = await credential.user.getIdToken()
                const decks = await db_api.getDecks(token)
                if(decks.length === 0){
                    //create collection 'deck' with no name -- empty strings are not allowed for user created decks
                    db_api.createDeck(token,'');
                }
            }
        )
    }

    export const signOut = async()=>{
        return auth.signOut()
    }

    export const isSignedIn = ()=>{
        return auth.currentUser !== null;
    }

    export const getToken = async()=>{
        const token = await auth.currentUser?.getIdToken()
        if(!token)
            throw new Error('Unable to get Google authentication token.')
        return token
    }

    export const useAuth = ()=>{

        const [ authorized, setAuthorized ] = useState(false)

        Firebase.auth.onAuthStateChanged(
            (user)=>{
                setAuthorized(Firebase.auth.currentUser!=null)
            }
        )

        return authorized
    }
}