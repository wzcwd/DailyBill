import {ConfigProvider, DatePicker, NavBar} from "antd-mobile";
import "./index.scss"
import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import enUS from "antd-mobile/es/locales/en-US";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from "lodash";
import DailyBill from "@/page/MonthBill/component/DayBill/index.jsx";

const MonthBill = () => {

    // 控制是否显示data picker
    const [dateVisible, setDateVisible] = useState(false);
    // Date state
    const [currentDate, setCurrentDate] =
        useState(dayjs(new Date()).format('YYYY-MM'));
    // monthBill state
    const [monthList, setMonthList] = useState([]);

    // 拿到redux中的billList数据
    const {billList} = useSelector((state) => state.bill);
    // 数据二次处理:把数据按月进行分组--> 使用useMemo缓存处理结果(优化方式)
    const monthGroup = useMemo(() => {
        // 返回一个以月份分组的json对象
        return _.groupBy(billList, item => dayjs(item.date).format('YYYY-MM'));
    }, [billList]); // billList变化时才重新计算
    // console.log(monthGroup);

    // 点击确认获取当前日期,
    const onConfirm = (date) => {
        setDateVisible(false);
        const formatDate = dayjs(date).format('YYYY-MM');
        // 把当前日期的账单传入monthList
        setMonthList(monthGroup[formatDate] || []);
        setCurrentDate(formatDate);
    }
    // 计算当前month的开支
    const billDetail = useMemo(() => {
        const pay = monthList.filter(item => item.type === "pay").reduce((sum, cur) => sum + cur.money, 0)
        const income = monthList.filter(item => item.type === "income").reduce((sum, cur) => sum + cur.money, 0)
        const balance = income + pay
        return {pay: pay, income: income, balance: balance}
    }, [monthList]);
    //console.log(billDetail);

    // 打开月度账单时，立刻把当前月份的统计数据渲染到页面中, 避免手动选择
    useEffect(() => {
        const currentMonth = dayjs().format("YYYY-MM")
        setMonthList(monthGroup[currentMonth] || []);
    }, [monthGroup])


    // 已知当前月, 把数据按当前月的日分组
    const dayGroup = useMemo(() => {
        const groupList = _.groupBy(monthList, item => dayjs(item.date).format('YYYY-MM-DD'));
        const keyArray = Object.keys(groupList); // 得到每一个list 的key
        return {groupList, keyArray};
    }, [monthList]); // billList变化时才重新计算
    //console.log(dayGroup);


    return (
        <ConfigProvider locale={enUS}>  {/* 配置组件显示的语言(默认中文) */}
            <div className="monthlyBill">
                <NavBar className="nav" backIcon={false}>Month</NavBar>
                <div className="content">
                    <div className="header">
                        {/* change the date */}
                        <div className="date" onClick={() => setDateVisible(true)}>
                            <span className="text">{currentDate}</span>
                            {/* control the direction of the arrow */}
                            <span className={classNames("arrow", {expand: dateVisible === true})}></span>
                        </div>
                        {/* 统计区域 */}
                        <div className='twoLineOverview'>
                            <div className="item">
                                <span className="money">{billDetail.pay.toFixed(2)}</span>
                                <span className="type">Expense</span>
                            </div>
                            <div className="item">
                                <span className="money">{billDetail.income.toFixed(2)}</span>
                                <span className="type">Income</span>
                            </div>
                            <div className="item">
                                <span className="money">{billDetail.balance.toFixed(2)}</span>
                                <span className="type">Balance</span>
                            </div>
                        </div>
                        {/* Window for data selector */}
                        <DatePicker className="kaDate" title="Bill Date"
                                    precision="month" visible={dateVisible}
                                    onCancel={() => {
                                        setDateVisible(false)
                                    }}
                                    onConfirm={onConfirm}/*此时会向onConfirm传递一个date*/
                                    max={new Date()}
                        />
                    </div>
                    {/*列表组件*/}
                    {dayGroup.keyArray.map(key => {
                        return <DailyBill key={key} date={key} dayList={dayGroup.groupList[key]}/>
                    })}

                </div>
            </div>
        </ConfigProvider>
    )
}

export default MonthBill