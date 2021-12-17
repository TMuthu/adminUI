import React from "react";
import { useDispatch } from "react-redux";
import { storeSearchText,userSearch } from "../reducers/userReducer";
import "./../styles/adminPage.css";

const Searchbar = ()=>{
    const dispatch = useDispatch();
    //setting search text in state
    const search = (ele)=>{
        dispatch(storeSearchText(ele.target.value));
        if(ele.target.value===""){
            dispatch(userSearch());
        }
    }
    //performing search operaton
    const userSearchform = (ele)=>{
        ele.preventDefault();
        // console.log(ele);
        dispatch(userSearch());
    }
    return(
        <form onSubmit={(ele)=>{userSearchform(ele)}}>
        <input placeholder="Search people by Name,email or role..." type="text" className="searchbar" onChange={(ele)=>{search(ele)}}></input>  
        </form>
    )
}

export default Searchbar;