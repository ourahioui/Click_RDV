

const compteurReducer  = (state  = {count:0} , action ) => {
    switch(action.type)
    {
        case  "INCREMENT": 
            return {...state ,count :  state.count + action.payload.x} ; 
        case  "DECREMENT": 
            return {...state ,count :  state.count - action.payload.x} ;  
        
        default : 
            return state ; 
    }
}
export default compteurReducer ; 
