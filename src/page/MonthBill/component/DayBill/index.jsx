import classNames from "classnames";
import './index.scss'
import {useMemo, useState} from "react";
import Icons from "@/component/Icons/index.jsx";
import {billTypeToName} from "@/constant/index.jsx";

const DailyBill = ({date, dayList}) => {
    // 计算当前day的开支
    const billDetail = useMemo(() => {
        const pay = dayList.filter(item => item.type === "pay").reduce((sum, cur) => sum + cur.money, 0)
        const income = dayList.filter(item => item.type === "income").reduce((sum, cur) => sum + cur.money, 0)
        const balance = income + pay
        return {pay: pay, income: income, balance: balance}
    }, [dayList]);


    // 控制是否显示list
    const [listVisible, setListVisible] = useState(false);


    return (
        <div className={classNames('dailyBill', listVisible && "expand")}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow', listVisible && "expand")}
                          onClick={() => setListVisible(!listVisible)}/>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">Expense</span>
                        <span className="money">{billDetail.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">Income</span>
                        <span className="money">{billDetail.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="type">Balance</span>
                        <span className="money">{billDetail.balance.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList">
                {dayList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            {/*render icons*/}
                            <Icons category={item.useFor}/>
                            <div className="detail">
                                <div className="billType">
                                    {billTypeToName[item.useFor]}
                                </div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DailyBill