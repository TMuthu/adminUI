//Initial data for pagination
export const initialPagination = {
    currentPage : 1,
    startRecord : 0,
    endRecord : 10,
}
//action for pagination
export const pagination = (page)=>{
    return({
        type:"pagination",
        currPage:page,
    })
}

export const increaseCurrPage = ()=>{
    return({
        type:"increaseCurrPage",
    })
}

export const decreaseCurrPage = ()=>{
    return({
        type:"decreaseCurrPage",
    })
}

export const paginationreducer = (state=initialPagination,actions)=>{
    if(actions.type==="pagination"){
        return({
            ...state,
            currentPage : actions.currPage,
            startRecord : 10,
            endRecord : 20,
        })
    }
    if(actions.type==='increaseCurrPage'){
        return({
            ...state,
            currentPage : state.currentPage + 1,
            startRecord : state.startRecord + 10,
            endRecord : state.endRecord + 10,
        })
    }
    if(actions.type==='decreaseCurrPage'){
        return({
            ...state,
            currentPage : state.currentPage-1,
            startRecord : state.startRecord - 10,
            endRecord : state.endRecord -10,

        })
    }
    return state;
}
