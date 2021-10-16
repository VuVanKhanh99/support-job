import { GET_DATA_JOB_SUCCESS } from "../actions/actions";

const initialState = {
    isRequesting: false,
    dataJob:[]
}

const dataJobReducer = (state= initialState,action) =>{
    switch(action.type){
        case GET_DATA_JOB_SUCCESS:{
           return{
               ...state,
               dataJob:action.payload
           } 
        }
        default :
           return state;
          
    }
} 

export default dataJobReducer;