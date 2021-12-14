import { storedata} from "../reducers/userReducer";

const loadData = ()=>{
    return (dispatch) => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(res=>res.json())
        .then(data=>{
            dispatch(storedata(data))
        })
    }
}

export default loadData;