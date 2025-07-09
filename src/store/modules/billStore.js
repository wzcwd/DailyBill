import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// An example to async operation
const billStore = createSlice({
    name: 'bill',
    // 初始化state
    initialState: {
        // 商品列表
        billList: [],
    },
    // 修改状态的方法 同步方法 支持直接修改
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        },
        // 添加账单
        addBill(state, action) {
            state.billList.push(action.payload)
        }
    }
})

// 异步请求部分
// 从后端 API 请求bill list
// 然后通过 dispatch 把它保存到 Redux 的 billList 状态中。
const {setBillList, addBill} = billStore.actions
const url = 'http://localhost:3001/ka'
const fetchBillList = () => {
    return async (dispatch) => {
        const res = await axios.get(url)
        dispatch(setBillList(res.data))
    }
}

// 异步addbill
const fetchAddBill = (data) => {
    return async (dispatch) => {
        const res = await axios.post(url, data)
        dispatch(addBill(res.data))
    }
}

// 获取reducer
const reducer = billStore.reducer

// 以按需导出的方式导出actionCreator
export {fetchBillList, fetchAddBill}
// 以默认导出的方式导出reducer
export default reducer