import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Firebase } from "../firebase/Firebase";
import { getCollection, selectCollection, selectCollectionStatus } from "../redux/CollectionSlice";
import { AppDispatch } from "../redux/store";
import { useAuthCheck } from "./useAuthCheck";

export const useCollection = (dispatch:AppDispatch)=>{

    const collection = useSelector(selectCollection);
    const collectionStatus = useSelector(selectCollectionStatus);

    const authorized = useAuthCheck()

    useEffect(
        ()=>{
            if(collectionStatus==='uninitialized'){
                dispatch(getCollection())
            }
        },[ collectionStatus, dispatch,  ]
    )

    return { collection, collectionStatus, authorized }

}