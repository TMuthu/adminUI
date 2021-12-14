
//Action for loading
export const loading = ()=>({
    type:"loading",
})

export const error = (errMsg)=>({
    type:"error",
    payload:errMsg,
})

//Action for storing user data
export const storedata = (data)=>({
    type:"storeuser",
    payload : data
})
//delete user from users data
export const deleteuser = (ids)=>({
    type:"deleteuser",
    userids : ids
})
//edit user
export const edituser = (obj)=>({
    type:"edituser",
    edituserObj : obj,
})

export const saveuser = (obj)=>({
    type:"saveuser",
    saveuserObj : obj,
})

export const canceledit = ()=>({
    type:"canceledit",
})

export const deleteSelected = ()=>({
    type:"deleteSelected",
})

export const addDeleteList = (lst)=>({
    type:"adddellist",
    delList : lst,
})

export const storeSearchText = (searchText)=>({
    type:"storeSearchText",
    searchText : searchText,
})

export const userSearch = ()=>({
    type:"userSearch"
})

const initialUserdata = {
    loading : true,
    error: false,
    users: [],
    edituserObject : {},
    editflag : false,
    delUserList : [],
    deleteflag : false,
    searchText : "",
    duplicateUsersList : [],
}

//reducer for storing user data
export const userreducer = (state=initialUserdata,actions)=>{
    if(actions.type==="storeuser"){
        return(
            {
                ...state,
                users : actions.payload,
                duplicateUsersList : actions.payload,
                loading: false,
                error : null,
            }
        )
    }
    if(actions.type==="loading"){
        return (
            {
                ...state,
                loading:true,
                error : null,
            }
        )
    }
    if(actions.type==="error"){
        console.log("Error on data fetching")
        return (
            {
                ...state,
                error:actions.payload,
                loading : false,
            }
        )
    }
    if(actions.type === "deleteuser"){
        var usersObj = {...state};
        if(window.confirm("Are you sure?")){
            var tempUsers = [];
            usersObj.users.map((e)=>{
            if(e.id !== actions.userids){
                tempUsers.push(e);
            }
        })
        }
        usersObj.users = tempUsers;  
        usersObj.duplicateUsersList =  tempUsers;
        return usersObj;
    }

    if(actions.type === 'edituser'){
        usersObj = {...state};
        var temp;
        usersObj.users.map((e)=>{
            if(e.id === actions.edituserObj.id){
                temp = {...usersObj};
                temp.edituserObject = actions.edituserObj;
                temp.editflag = true;
            }
        })
        usersObj.duplicateUsersList =  usersObj.users;
        return temp;
    }
    if(actions.type==="saveuser"){
        usersObj = {...state};
        usersObj.users.map((e)=>{
            if(e.id === actions.saveuserObj.id){
                e.name = actions.saveuserObj.name;
                e.email = actions.saveuserObj.email;
                e.role = actions.saveuserObj.role;                
            }
        })
        usersObj.duplicateUsersList =  usersObj.users;
        return usersObj;
    }
    if(actions.type==="canceledit"){
        return({
            ...state,
            editflag:false,
        })
    }
    if(actions.type==="deleteSelected"){
        usersObj = {...state};
        if(window.confirm("Are you sure?")){
            tempUsers = [];
            usersObj.users.map((e)=>{
                var flag = true;
                for(var i=0;i<usersObj.delUserList.length;i++){
                    if(e.id === usersObj.delUserList[i]){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    tempUsers.push(e);
                }
            })
            usersObj.users = tempUsers;  
            usersObj.delUserList = [];
            return usersObj;
        }
    }
    if(actions.type==="adddellist"){
        console.log(state.deleteflag);
        if(actions.delList.length === 0){
            return({
                ...state,
                delUserList : actions.delList,
                deleteflag : false,
            }) 
        }
        else{
            return({
                ...state,
                delUserList : actions.delList,
                deleteflag : true,
            })
        }
    }
    if(actions.type==="storeSearchText"){
        return({
            ...state,
            searchText : actions.searchText,
        }) 
    }
    if(actions.type==="userSearch"){
        usersObj = {...state};
        tempUsers = [];
        usersObj.duplicateUsersList.map((e)=>{
            if(e.role.includes(usersObj.searchText) || e.name.includes(usersObj.searchText) || e.email.includes(usersObj.searchText)){
                tempUsers.push(e);
            }
        })
        usersObj.users = tempUsers;    
        return usersObj;
    }
    return state;
}


