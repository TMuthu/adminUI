
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
//action to save edit changes
export const saveuser = (obj)=>({
    type:"saveuser",
    saveuserObj : obj,
})
//action for cancel edit
export const canceledit = ()=>({
    type:"canceledit",
})
//delete operation
export const deleteSelected = ()=>({
    type:"deleteSelected",
})
//adding users to delete list
export const addDeleteList = (lst)=>({
    type:"adddellist",
    delList : lst,
})
//storing search text
export const storeSearchText = (searchText)=>({
    type:"storeSearchText",
    searchText : searchText,
})
//performing search
export const userSearch = ()=>({
    type:"userSearch"
})

const initialUserdata = {
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
            }
        )
    }

    if(actions.type === "deleteuser"){
        var usersObj = {...state};
        if(window.confirm("Are you sure?")){
            var tempUsers = [];
            usersObj.duplicateUsersList.map((e)=>{
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
        usersObj.duplicateUsersList.map((e)=>{
            if(e.id === actions.saveuserObj.id){
                e.name = actions.saveuserObj.name;
                e.email = actions.saveuserObj.email;
                e.role = actions.saveuserObj.role;                
            }
        })
        usersObj.users = usersObj.duplicateUsersList;
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
            usersObj.duplicateUsersList.map((e)=>{
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
            usersObj.duplicateUsersList =  tempUsers; 
            usersObj.delUserList = [];
            return usersObj;
        }
    }
    if(actions.type==="adddellist"){
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
        if(usersObj.searchText === ""){
            usersObj.users = usersObj.duplicateUsersList;    
            return usersObj;
        }
        else{
            usersObj.duplicateUsersList.map((e)=>{
                if(e.role.includes(usersObj.searchText) || e.name.includes(usersObj.searchText) || e.email.includes(usersObj.searchText)){
                    tempUsers.push(e);
                }
            })
            usersObj.users = tempUsers;    
            return usersObj;
        }
    }
    return state;
}


