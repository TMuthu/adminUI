import React from "react";
import Createtable from "./Createtable";
import  {useSelector} from 'react-redux';
var tableheaders = [];

const Table = ()=>{
    
    const state = useSelector(state=>state.userreducer);
    const statep = useSelector(state=>state.paginationreducer);
    const users = {...state};
    
    var tabledata = [];
    var userdata = users.users;
    
    var totalLength = Object.keys(userdata).length;
    var end = 0;   
    
    //filtering user records for pagination  
    if(Object.keys(userdata).length !== 0){   
        Array(userdata).map((e)=>{
            //slice the records from users array
            if(statep.endRecord > totalLength){
                end = totalLength;
            }
            else{
                end = statep.endRecord;
            }
           
            for(var i=statep.startRecord;i<end;i++){
                var tempObj = e[i];
                tabledata.push({
                    ...tempObj,
                    // checkbox:"unchecked",
                })
            }
            tableheaders = Object.keys(e[0])
            tableheaders.push("Actions");           
        });
    }
    
    return(
        <>
        <Createtable tableheaders = {tableheaders} tabledata = {tabledata}/>
        </>
    )
}

export default Table;
