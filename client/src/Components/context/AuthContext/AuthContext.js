import {createContext, useReducer} from "react";
import axios from 'axios';
import { DELETE_PROFILE, DELETE_PROFILE_FAIL, FETCH_PROFILE_FAIL, FETCH_PROFILE_SUCCESS, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS } from "./authActionTypes";
import { apiUsers } from "../../../Utils/api";

export const authContext= createContext();

const INITIAL_STATE={
    userAuth:JSON.parse(localStorage.getItem("userAuth")),
    error: null,
    loading: false,
    profile: null,
}

const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {

        case REGISTER_SUCCESS:
            localStorage.setItem("userAuth", JSON.stringify(payload));
            return {
              ...state,
              loading: false,
              error: null,
              userAuth: payload,
            };
        case REGISTER_FAIL:
            return {
              ...state,
              error: payload,
              loading: false,
              userAuth: null,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("userAuth", JSON.stringify(payload));
            return {
              ...state,
              loading: false,
              error: null,
              userAuth: payload,
            };
        case LOGIN_FAILED:
            return {
              ...state,
              error: payload,
              loading: false,
              userAuth: null,
            };

        case FETCH_PROFILE_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                profile:payload
            }
        case FETCH_PROFILE_FAIL:
            
            return {
                ...state,
                loading:false,
                error:payload,
                profile:null
            }
        case LOGOUT:
            localStorage.removeItem('userAuth')
            return {
                ...state,
                loading:false,
                error:null,
                userAuth:null
            }
        case DELETE_PROFILE:
            localStorage.removeItem('userAuth')
            return {
                ...state,
                loading:false,
                error:null,
                userAuth:null
            }
        case DELETE_PROFILE_FAIL:
            return {
                ...state,
                loading:false,
                error:payload,
                profile:null
            }
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  
    
    const loginUserAction = async formData => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
        try {
            const response =await axios.post(`${apiUsers}/login`, formData,config);
            if(response?.data?.status === 'Success'){
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:response.data
                });
            }
           window.location.href='/Dashboard';
        } catch (error) {
        dispatch({
            type:LOGIN_FAILED,
            payload: error?.response?.data?.stack
        });
        
    }
    };

    const registerUserAction = async formData => {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
          try {
              const response =await axios.post(`${apiUsers}/register`, formData,config);
              if(response?.data?.status === 'Success'){
                  dispatch({
                      type:REGISTER_SUCCESS,
                      payload:response.data
                  });
              }
             window.location.href='/Login';
          } catch (error) {
          dispatch({
              type:REGISTER_FAIL,
              payload: error?.response?.data?.stack
          });
          
      }
      };

    const fetchProfileAction=  async ()=>{
        try {
        const config={
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${state?.userAuth?.token}`
            }
        };
        
        const response= await axios.get(`${apiUsers}/profile`, config);

        if(response?.data){
            dispatch({
                type: FETCH_PROFILE_SUCCESS,
                payload: response.data
            });
        }
        } catch (error) {
            dispatch({
                type: FETCH_PROFILE_FAIL,
                payload: error?.response?.data?.stack
            })
        }
    }

    const logoutUserAction=()=>{
        dispatch({
            type: LOGOUT,
            payload: null
        });
        window.location.href='/Login';
    }


    const deleteUserAction=  async ()=>{
        try {
        const config={
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${state?.userAuth?.token}`
            }
        };
        
        const response= await axios.delete(`${apiUsers}`, config);

        if(response?.data?.status==="success"){
            dispatch({
                type: DELETE_PROFILE,
                payload: null
            });
        }
        window.location.href="/";
        } catch (error) {
            dispatch({
                type: DELETE_PROFILE_FAIL,
                payload: error?.response?.data?.stack
            })
        }
    }

    return (
        <authContext.Provider
          value={{
            loginUserAction,
            userAuth: state,
            token: state?.userAuth?.token,
            fetchProfileAction,
            profile: state?.profile,
            error: state?.error,
            logoutUserAction,
            deleteUserAction,
            registerUserAction
          }}
        >
          {children}
        </authContext.Provider>
      );

    
};
    
    export default AuthContextProvider;