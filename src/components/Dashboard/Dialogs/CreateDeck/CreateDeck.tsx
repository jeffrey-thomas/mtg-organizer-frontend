import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../../SharedComponents/FormInput";
import { Firebase } from "../../../../firebase/Firebase";
import { db_api } from "../../../../database/Api";
import { addDeck } from "../../../../redux/CollectionSlice";
import { useDispatch } from "react-redux";
import { useSelectedDeck } from "../../../../hooks/useSelectedDeck";

interface CreateDeckProps{
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

interface CreateDeckFormState{
    name:string
}

export const CreateDeck = (props:CreateDeckProps) =>{

    const methods = useForm<CreateDeckFormState>({});
    const {handleSubmit} = methods;

    const dispatch = useDispatch()
    const { setSelectedDeck} = useSelectedDeck()

    const onSubmit = async(data:CreateDeckFormState) => {
        const token = await Firebase.getToken()
        db_api.createDeck(token,data.name).then(
            (deck)=>{
                dispatch(addDeck(deck))
                setSelectedDeck(deck.id)
            }
        ).catch(
            (reason)=>{props.onError('Failed to add card to database.'+reason)}
        )
        
        props.onClose()
    }

    const formStyles = {
        display:'flex',
        flexDirection:'column',
        pt:0,
        '& input':{p:'5px'},
        '& img':{
            width:'50%',
            height:'auto'
        }
    }

    return(
        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" maxWidth={false}>
            <DialogTitle id="form-dialog-title">Create Deck</DialogTitle>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={formStyles}>
                    <FormInput field="name" placeholder='Enter Deck Name' required>Deck Name</FormInput>           
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='contained' color='secondary'>Submit</Button>
                </DialogActions>
            </form>
            </FormProvider>
               
        </Dialog>
    );
}