import React from 'react';
import './../styles/adminPage.css';
import edit from './../Images/Edit.png';
import Delete from './../Images/Delete.png';
import { useDispatch } from 'react-redux';
import { deleteuser,edituser,addDeleteList } from '../reducers/userReducer';
import { useSelector } from 'react-redux';
var deleteList = [];


function Createtable(props){
    
    var checkAll = document.getElementById("checkboxAll");
    
    const dispatch = useDispatch();
    const state = useSelector(state=>state.userreducer);
    deleteList = state.delUserList; 
    //Delete user by delete button
    const deleterecordUsingButton = (e)=>{
        dispatch(deleteuser(e));
    }
    //Selecting and Deselecting user to delete user using checkbox
    const deleterecordUsingCheckbox = (ele,id)=>{
        var flag = true;
        for(var i=0;i<deleteList.length;i++){
            if(deleteList[i]===id){
                flag=false;
                break;
            }
        }
        if(flag){
            ele.target.checked = true;
            deleteList.push(id);
        }
        else{
            ele.target.checked = false;
            deleteList = deleteList.filter(item => item !== id)
        }
        dispatch(addDeleteList(deleteList));
    }
    //selecting and deselecting all checkboxes for deletion using selectAll checkbox
    const deleteAll = ()=>{
        const usercheckbox = document.querySelectorAll(".usercheckbox");
        deleteList = [];
        if(state.delUserList.length!==props.tabledata.length){
            for(var i=0;i<props.tabledata.length;i++){
                var flag=true;
                for(var j=0;j<deleteList.length;j++){
                    if(props.tabledata[i].id === deleteList[j]){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    deleteList.push(props.tabledata[i].id);
                }
            }
            checkAll.checked = true;
            for(i=0;i<usercheckbox.length;i++){
                usercheckbox[i].checked = true;
            }
        }
        else{
            deleteList = [];
            checkAll.checked = false;
            for(i=0;i<usercheckbox.length;i++){
                usercheckbox[i].checked = false;
            }
        }
        dispatch(addDeleteList(deleteList));
    }
    //edit user record
    const editrecord = (e)=>{
        dispatch(edituser(e));   
    }  

    return(
        <div>
        <table className="usertable">
            <thead>
                <tr>
                <th className="headerRow"><input type="checkbox" id="checkboxAll" onClick={deleteAll} style={{color:'black',fontSize:"20px"}}></input></th>
                {props.tableheaders.map((e)=>{ 
                    if(e!=="id"){
                        return(<th key={e} className="headerRow" style={{color:'black',fontSize:"20px"}}>{e}</th>)
                    }           
                })           
                }
                </tr> 
            </thead>
            
                {props.tabledata.length !== 0 ? 
                <tbody>
                {props.tabledata.map((e)=>{
                    return(
                        <tr key={e.id} style={{color:'black'}}>
                            <td><input type="checkbox" className="usercheckbox" onClick={(ele)=>{deleterecordUsingCheckbox(ele,e.id)}}></input></td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>  
                            <td>{e.role}</td>  
                            <td className="headerRow">
                                    <span>
                                        <img className="editlink" src={edit} alt="Edit" width="25px" height="25px" onClick = {()=>{editrecord(e);}}></img>
                                        <img className="deletelink" src={Delete} alt="Delete" width="25px" height="25px" onClick = {()=>{deleterecordUsingButton(e.id)}}></img>
                                     </span>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                 : (<tbody><tr><td colSpan="5">No Data Found</td></tr></tbody>) }
            
        </table>
        </div>
    )
}
export default Createtable;