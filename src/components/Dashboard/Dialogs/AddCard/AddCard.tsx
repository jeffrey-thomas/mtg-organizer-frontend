import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material"
import {FormProvider, useForm } from 'react-hook-form';
import { FormInput } from "../../../SharedComponents/FormInput";
import { MtgCardData } from "../../../Mtg/MtgCards";
import { Firebase } from "../../../../firebase/Firebase";
import { db_api } from "../../../../database/Api";
import { addCard as addCard } from "../../../../redux/CollectionSlice";
import { addCard as addCardData } from "../../../../redux/CardDataSlice";
import { store } from "../../../../redux/store";
import { useCollection } from "../../../../hooks/useCollection";
import { useDispatch } from "react-redux";

interface AddCardProps{
    card:MtgCardData;
    open:boolean;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

interface AddCardFormState{
    qty:number
}

export const AddCard = (props:AddCardProps) =>{

    const methods = useForm<AddCardFormState>({});
    const {handleSubmit} = methods;

    const dispatch = useDispatch()
    const { collection } = useCollection(dispatch)

    const onSubmit = async(data:AddCardFormState) => {
        const token = await Firebase.getToken()
        if(token){
            const card = {deck_id: collection.library_id, id:props.card.id, qty:data.qty}
            db_api.addCard(token,card).then(
                (card)=>{
                    store.dispatch(addCardData(props.card))
                    store.dispatch(addCard(card))
                }
            ).catch(
                (reason)=>{props.onError('Failed to add card to database.'+reason)}
            )
        }
        else
            props.onError('Failed to get Google authentication token.')

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
            <DialogTitle id="form-dialog-title">Add Card</DialogTitle>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={formStyles}>
                    {
                        props.card.card_faces && <Box>
                            <img src={props.card.card_faces![0].image_uris!.normal}/>
                            <img src={props.card.card_faces![1].image_uris!.normal}/>
                        </Box>
                    }
                    {
                        props.card.image_uris && <img src={props.card.image_uris!.normal}/>
                    }
                    <DialogContentText>{props.card.name}</DialogContentText>
                    <DialogContentText>{props.card.set_name}</DialogContentText>
                    <Divider/>
                    <FormInput field="qty" type="number" defaultValue='1' inputProps={{min:1}}>Quantity</FormInput>           
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