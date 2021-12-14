import {React} from "react";
import  './../styles/adminPage.css';
import { useSelector, useDispatch} from "react-redux";
import { increaseCurrPage,decreaseCurrPage } from "../reducers/paginationReducer";
import { addDeleteList, deleteSelected } from "../reducers/userReducer";


export const Paginationcontrols = ()=>{
    //fetching pagintion details from store
    const dispatch = useDispatch();
    const state = useSelector(state=>state.paginationreducer);
    
    //fetching user records from store
    const stateuser = useSelector(state=>state.userreducer);
    const usersObj = {...stateuser};
    var userdata = usersObj.users;
    var totalLength = Object.keys(userdata).length;

    var totalPages = Math.ceil(totalLength/10);
    
    const goback = ()=>{
        dispatch(decreaseCurrPage())
    }
    const goNext = ()=>{
        dispatch(increaseCurrPage())
    }
    const deleteAll = ()=>{
        dispatch(deleteSelected());
        dispatch(addDeleteList([]));
        const checkAll = document.getElementById("checkboxAll");
        const usercheckbox = document.querySelectorAll(".usercheckbox");
        for(var i=0;i<usercheckbox.length;i++){
            usercheckbox[i].checked = false;
        }
        checkAll.checked = false;
    }
     
    return(
        <div className="pgecontainer">
            {stateuser.deleteflag ? <button className="deletebtnSelect" onClick={deleteAll}>Delete Selected</button> : <button className="deletebtn">Delete Selected</button>}
            {totalLength !== 0 ?
            <div className="controls">
            {state.currentPage===1 ? <span className="controlBtn">Back</span> : <span onClick={goback} className="ctrlSelect">Back</span>}
            <span className="pageNum">{state.currentPage}</span>
            {state.currentPage===totalPages ? <span className="controlBtn">Next</span> : <span onClick={goNext} className="ctrlSelect">Next</span>}
            </div> : <div></div>
            }           
        </div>
    )
}