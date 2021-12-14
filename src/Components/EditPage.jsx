import React, { useRef } from "react";
import './../styles/adminPage.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { canceledit, saveuser} from "../reducers/userReducer";

export const Edit = ()=>{
    const dispatch = useDispatch();
    const state = useSelector(state=>state.userreducer);
    const nameref = useRef(null);
    const emailref = useRef(null);
    const roleref = useRef(null);
    
    const save = ()=>{
        dispatch(saveuser({id:state.edituserObject.id,name:nameref.current.value,email:emailref.current.value,role:roleref.current.value}));
        dispatch(canceledit());
    }
    const cancel = ()=>{
        dispatch(canceledit());
    }
    return(
        <div>
        {state.editflag ? 
            (<div className="editPageContainer">
                <div className="edit">
                    <input ref={nameref} type="text" placeholder="name" defaultValue={state.edituserObject.name}></input>
                    <input ref={emailref} type="text" placeholder="Email" defaultValue={state.edituserObject.email}></input>
                    <input ref={roleref} type="text" placeholder="Role" defaultValue={state.edituserObject.role}></input>
                    <button onClick={save}>Save</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
            </div>)
       : <div></div> }
    </div>)
}