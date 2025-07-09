import { useState } from 'react'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday) //给 dayjs 加载一个插件功能 —— isToday() 方法
//dayjs 是一个轻量级的 JavaScript 日期库，它默认是“核心精简版”，不包括所有功能。
// 所以如果你想使用某些额外的功能（比如判断一个日期是不是“今天”），需要显式加载对应的插件。



export const useDate = () => {
    const [date, setDate] = useState(new Date())
    const [visible, setVisible] = useState(false)
    const dayjsDate = dayjs(date)
    const dateText = dayjsDate.isToday() ? '今天' : dayjsDate.format('YYYY/MM/DD')

    const onShowDate = () => setVisible(true)
    const onHideDate = () => setVisible(false)
    const onDateChange = val => setDate(val)

    return {
        date: dayjsDate,
        dateText,
        visible,
        onShowDate,
        onHideDate,
        onDateChange,
    }
}
