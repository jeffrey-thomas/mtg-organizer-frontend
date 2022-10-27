import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../../SharedComponents/FormInput";
import { Firebase } from "../../../../firebase/Firebase";
import { db_api } from "../../../../database/Api";
import { updateDeck } from "../../../../redux/CollectionSlice";
import { Deck } from "../../../../database";
import { useDispatch } from "react-redux";

interface RenameDeckProps{
    deck:Deck;
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

interface RenameDeckFormState{
    name:string
}

export const RenameDeck = (props:RenameDeckProps) =>{

    const methods = useForm<RenameDeckFormState>({});
    const {handleSubmit} = methods;

    const dispatch = useDispatch()

    const onSubmit = async(data:RenameDeckFormState) => {
        const token = await Firebase.getToken()

        const deck = {id: props.deck.id, name:data.name}
        db_api.updateDeck(token,deck).then(
            (deck)=>{
                dispatch(updateDeck(deck))
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
            <DialogTitle id="form-dialog-title">Rename Deck</DialogTitle>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={formStyles}>
                    <FormInput field="name" defaultValue={props.deck.name} required>New Name</FormInput>           
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