import axios from "axios";
import { useReducer } from "react";
import { createContext } from "react";
import { apiAccounts } from "../../../Utils/api";
import { ACCOUNT_CREATION_FAIL, ACCOUNT_CREATION_SUCCES, ACCOUNT_DETAILS_FAIL, ACCOUNT_DETAILS_SUCCESS } from "./accountActionTypes";


export const accountContext= createContext();

const INITIAL_STATE={
    userAuth: JSON.parse(localStorage.getItem('userAuth')),
    account:null,
    accounts:[],
    loading:false,
    error:null
}

const accountReducer= (state, action)=>{
    const{type, payload}=action;
    switch(type){
        case ACCOUNT_DETAILS_SUCCESS:
            return{
                ...state,
                account:payload,
                loading:false,
                error:null
            };
        case ACCOUNT_DETAILS_FAIL:
            return{
                ...state,
                account:null,
                loading:false,
                error:payload
            };

        case ACCOUNT_CREATION_SUCCES:
            return{
                ...state,
                account:payload,
                loading:false,
                error:null
            };
        case ACCOUNT_CREATION_FAIL:
            return{
                ...state,
                account:null,
                loading:false,
                error:payload
            };
        default:
            return state
    }
    
}

export const AccountContextProvider=({children})=>{
    const [state, dispatch]= useReducer(accountReducer, INITIAL_STATE)

    const getAccountDetailsAction= async(id)=>{
        const config={
            headers:{
                Authorization: `Bearer ${state?.userAuth?.token}`,
                "content-type":"application/json",
            },
        };
        try {
            const response = await axios.get(`${apiAccounts}/${id}`,config)
            if(response?.data?.status==="Success"){
                dispatch({
                    type: ACCOUNT_DETAILS_SUCCESS,
                    payload: response?.data
                })
            }
            console.log(response)
        } catch (error) {
            dispatch({
                type: ACCOUNT_DETAILS_FAIL,
                payload: error?.data?.response?.stack
            })
        }
    }

    const createAccountAction= async(formData)=>{
        const config={      
            headers:{
                Authorization: `Bearer ${state?.userAuth?.token}`,
                "content-type":"application/json",
            },
        };
        try {
            const response = await axios.post(`${apiAccounts}`,formData,config)
            if(response?.data?.status==="Success"){
                dispatch({
                    type: ACCOUNT_CREATION_SUCCES,
                    payload: response?.data
                })
            }
            window.location.href='/Dashboard';
            console.log(response)
        } catch (error) {
            dispatch({
                type: ACCOUNT_CREATION_FAIL,
                payload: error?.data?.response?.stack
            })
        }
    }
        return <accountContext.Provider 
        value={{
            getAccountDetailsAction,
            account: state?.account,
            createAccountAction,
            error: state?.error
         }}>{children}</accountContext.Provider>

}