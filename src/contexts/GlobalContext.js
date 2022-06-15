import { createContext, useReducer, useState, useEffect } from "react"
import Snackbar from '@mui/material/Snackbar';

export const Context = createContext()
const { Provider } = Context

function Reducer(state, action){
    switch (action.type) {
        case 'show':
            return {
                snackbar : true,
                snackbarText : action.payload
            }
            break;
        case 'hide':
            return {
                snackbar : false,
                snackbarText : action.payload
            }
            break;
        default:
            throw new Error()
            break;
    }
}

const initialState = {
    snackbar: false,
    snackbarText : ""
}

export default function StoreProvider(props){
    const [state, dispatch] = useReducer(Reducer, initialState)
    const [open, setOpen] = useState(true)
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch({type:"hide", payload:""})
    }

    return (
        <Provider value={[state, dispatch]}>
            {props.children}
            <Snackbar open={state.snackbar} autoHideDuration={4000} 
                message={state.snackbarText} onClose={handleClose}
            />
        </Provider>
    )
}