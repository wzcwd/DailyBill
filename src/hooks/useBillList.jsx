import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import {fetchBillList} from "@/store/modules/billStore.js";

/*这个 useBillList.jsx 文件定义了几个自定义 React Hooks，目的是从 Redux 中提取账单数据，
并根据年份、月份进行筛选和缓存（用 useMemo）。它让你在组件中更方便地调用这些过滤好的账单列表，而不用重复写逻辑。*/

export const useBillList = () => {
    const dispatch = useDispatch()
    const { billList } = useSelector(state => state.bill)

    useEffect(() => {
        dispatch(fetchBillList())
    }, [dispatch])

    return { billList }
}

export const useYearBillList = selectedYear => {
    const { billList } = useBillList()
    const yearBills = useMemo(
        () =>
            billList.filter(item => selectedYear === dayjs(item.date).get('year')),
        [billList, selectedYear]
    )

    return yearBills
}

export const useMonthBillList = (selectedYear, selectedMonth) => {
    const selectedYearBills = useYearBillList(selectedYear)
    const currentBillList = useMemo(
        () =>
            selectedYearBills.filter(item => {
                return selectedMonth === dayjs(item.date).get('month')
            }),
        [selectedYearBills, selectedMonth]
    )

    return currentBillList
}
