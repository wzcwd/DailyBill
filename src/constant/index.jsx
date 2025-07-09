import dayjs from 'dayjs'

export const billListData = {
    pay: [
        {
            mainCategory: 'foods',
            name: 'Foods',
            list: [
                { useFor: 'food', name: 'Food' },
                { useFor: 'drinks', name: 'Drinks' },
                { useFor: 'dessert', name: 'Dessert' },
            ],
        },
        {
            mainCategory: 'taxi',
            name: 'Transportation',
            list: [
                { useFor: 'taxi', name: 'Taxi' },
                { useFor: 'longdistance', name: 'Transport Fee' },
            ],
        },
        {
            mainCategory: 'recreation',
            name: 'Recreation',
            list: [
                { useFor: 'bodybuilding', name: 'Gym' },
                { useFor: 'game', name: 'Game' },
                { useFor: 'audio', name: 'Media' },
                { useFor: 'travel', name: 'Travel' },
            ],
        },
        {
            mainCategory: 'daily',
            name: 'Daily',
            list: [
                { useFor: 'clothes', name: 'Clothes' },
                { useFor: 'bag', name: 'Accessories' },
                { useFor: 'book', name: 'Study' },
                { useFor: 'promote', name: 'Certificate' },
                { useFor: 'home', name: 'Household' },
            ],
        },
        {
            mainCategory: 'other',
            name: 'Others',
            list: [{ useFor: 'community', name: 'Fees' }],
        },
    ],
    income: [
        {
            mainCategory: 'professional',
            name: 'Main',
            list: [
                { useFor: 'salary', name: 'Salary' },
                { useFor: 'overtimepay', name: 'Overtime' },
                { useFor: 'bonus', name: 'Bonus' },
            ],
        },
        {
            mainCategory: 'other',
            name: 'Others',
            list: [
                { useFor: 'financial', name: 'Finance' },
                { useFor: 'cashgift', name: 'Gift' },
            ],
        },
    ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
    billListData[key].forEach(bill => {
        bill.list.forEach(item => {
            prev[item.useFor] = item.name
        })
    })
    return prev
}, {})

// get an overview of a bill
export const getOverview = (data = []) => {
    return data.reduce(
        (prev, item) => {
            return {
                ...prev,
                date: item.date,
                [item.type]: prev[item.type] + +item.money,//+item.money 是确保字符串金额变成数字（例如 "100" → 100）
            }
        },
        { pay: 0, income: 0, date: null }
    )
}

//从一组账单中，筛选出某个月的账单，然后调用 getOverview() 汇总结果。
export const getMonthOverview = (data, month) => {
    // 某个月的账单可能有多个
    const bill = data.filter(item => {
        return month === dayjs(item.date).get('month')
    })
    return getOverview(bill)
}
