import { loading, storedata, error } from "../reducers/userReducer";

const loadData = ()=>{
    return (dispatch) => {
        dispatch(loading());
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(res=>res.json())
        .then(data=>{
            dispatch(storedata(data))
        }).catch((err)=>{
            dispatch(error(err))
        })
    }
}

export default loadData;