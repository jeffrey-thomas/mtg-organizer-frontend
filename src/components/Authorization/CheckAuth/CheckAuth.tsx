import { Box } from "@mui/material"
import { ReactNode } from "react"
import { Firebase } from "../../../firebase/Firebase" 

interface CheckAuthProps{
    onAuthorized?:ReactNode,
    onUnauthorized?:ReactNode
}

export const CheckAuth = (props:CheckAuthProps)=>{
    const authorized = Firebase.useAuth();

    return(
        <Box> { authorized ? props.onAuthorized  : props.onUnauthorized  } </Box>
    )
}