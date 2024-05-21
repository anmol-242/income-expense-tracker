import React, { createContext, useReducer } from "react";
import axios from "axios";
import {
  TRANSACTION_CREATION_STARTED,
  TRANSACTION_CREATION_SUCCES,
  TRANSACTION_CREATION_FAIL,
  TRANSACTION_DELETE_SUCCES,
  TRANSACTION_DELETE_FAIL
} from "./transactionsActionTypes";
import { apiTransactions } from "../../../Utils/api";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};
const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_CREATION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION_CREATION_SUCCES:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_DELETE_SUCCES:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case TRANSACTION_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };


    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  
  const createTransactionAction = async accountData => {
    try {
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      
      const response = await axios.post(apiTransactions,accountData,config);

      if(response?.data?.status==="Success"){
        dispatch({ 
          type: TRANSACTION_CREATION_SUCCES, 
          payload: response?.data });
      }

      alert("Successfully Added Transaction");
    } catch (error) {
      dispatch({ 
        type: TRANSACTION_CREATION_FAIL, 
        payload: error?.response?.data?.stack });
    }
  };

  const deleteTransactionAction= async id =>{
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res= await axios.delete(`${apiTransactions}/${id}`,config);
      if(res?.data?.status==="Success"){
        dispatch({
          type: TRANSACTION_DELETE_SUCCES,
          payload: null
        });
      }
      window.location.reload();
    } catch (error) {
      dispatch({
        type: TRANSACTION_DELETE_FAIL,
        payload: error?.response?.data?.stack
      })
    }
  };
  return (
    <transactionContext.Provider
      value={{
        transaction: state.transaction,
        transactions: state.transactions,
        createTransactionAction,
        error: state?.error,
        deleteTransactionAction
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};
