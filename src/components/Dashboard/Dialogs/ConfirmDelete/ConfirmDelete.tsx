import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import {FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { Card, db_api, Deck } from "../../../../database";
import { Firebase } from "../../../../firebase/Firebase";
import { useCardData } from "../../../../hooks/useCardData";
import { useCollection } from "../../../../hooks/useCollection";
import { useSelectedDeck } from "../../../../hooks/useSelectedDeck";
import { removeCard, removeDeck } from "../../../../redux/CollectionSlice";
import { DashboardFunctions } from "../../DashboardFunctions";

interface ConfirmDeleteProps{
    open:boolean;
    item:Card | Deck;
    onClose:()=>void;
}

export const ConfirmDelete = ({item, open, onClose}:ConfirmDeleteProps) =>{

    const methods = useForm<{}>({});
    const {handleSubmit} = methods;

    const dispatch = useDispatch()
    const { collection } = useCollection(dispatch)
    const { cardData } = useCardData(dispatch)
    const { setSelectedDeck } = useSelectedDeck()

    const onSubmit = async() => {
        const token = await Firebase.getToken()
        //Delete a deck
        if(isDeck(item)){
            db_api.deleteDeck(token,item).then(
                (deck)=>{ 
                    setSelectedDeck('')
                    dispatch(removeDeck(deck))
                    
                }
            ).catch(
                (error)=>{console.log(error)}
            )
        }
        //Delete a card
        else{
            db_api.deleteCard(token, item).then(
                (card)=>{ dispatch(removeCard(card)) }
            ).catch(
                (error)=>{console.log(error)}
            )
        }
        onClose()   
    }

    const isDeck = (item:any):item is Deck=>{ return item.name }

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
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth={false}>
            <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={formStyles}>
                    <DialogContentText>{`Are you sure you want to delete ${isDeck(item)? item.name : cardData[item.id].name }?\nThis action cannot be undone.`}</DialogContentText>         
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='contained' color='secondary'>Confirm</Button>
                </DialogActions>
            </form>
            </FormProvider>
               
        </Dialog>
    );
}