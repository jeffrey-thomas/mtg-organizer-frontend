import { Button, ButtonProps, ListItemButton, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFirebaseApp } from "reactfire";
import { Firebase } from "../../../firebase/Firebase";
import { clearCardData } from "../../../redux/CardDataSlice";
import { clearCollection } from "../../../redux/CollectionSlice";

type SignOutButtonProps = { isListItem?:boolean} & ButtonProps;

export const SignOutButton = ({isListItem=false,...props}:SignOutButtonProps)=>{

    const nav = useNavigate();
    const dispatch = useDispatch()

    const signout = async()=>{
        Firebase.signOut().then(
            ()=>{
                dispatch(clearCollection())
                dispatch(clearCardData())
                nav('/');
            }
        )
    }

    return (
            isListItem 
                ? <ListItemButton sx={{p:0}} onClick={signout}>
                    <ListItemText sx={{pl:'8px'}}>Sign Out</ListItemText>  
                </ListItemButton>
                : <Button {...props} onClick={signout}>Sign Out</Button>
        
    )
}