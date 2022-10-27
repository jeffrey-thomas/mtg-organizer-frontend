import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCollection, selectCollection, selectCollectionStatus } from "../redux/CollectionSlice";
import { AppDispatch } from "../redux/store";

export const useCollection = (dispatch:AppDispatch)=>{

    const collection = useSelector(selectCollection);
    const collectionStatus = useSelector(selectCollectionStatus);

    useEffect(
        ()=>{
            if(collectionStatus==='uninitialized'){
                dispatch(getCollection())
            }
        },[ collectionStatus, dispatch ]
    )

    return { collection, collectionStatus }

}