import {Button, ConfigProvider, DatePicker, Input, NavBar} from 'antd-mobile'
import './index.scss'
import classNames from 'classnames'
import {useNavigate} from 'react-router-dom'
import Icons from "@/component/Icons/index.jsx";
import {billListData} from "@/constant/index.jsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchAddBill} from "@/store/modules/billStore.js";
import enUS from "antd-mobile/es/locales/en-US";
import dayjs from "dayjs";

const NewBill = () => {

    const navigate = useNavigate()
    // the state for choosing income and expense
    const [currentCategory, setCategory] = useState("pay")

    // New Bill function
    // 1.收集账单类型
    const [useFor, setUseFor] = useState("")
    // 2. 收集money
    const [money, setMoney] = useState(0)
    const moneyChange = (value) => {
        setMoney(value)
    }
    // 3. 保存账单
    const dispatch = useDispatch()

    const saveBill = () => {
        const data = {
            type: currentCategory,
            money: currentCategory === "income" ? +money : -money,
            date: date,
            useFor: useFor,
        }
        dispatch(fetchAddBill(data))
    }

    // Manage date picker
    const [datePickerVisible, setDatePickerVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    // 点击确认获取当前日期,
    const onConfirm = (date) => {
        setDatePickerVisible(false);
        setDate(date)
    }


    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>New A Bill</NavBar>

            <div className="header">
                <div className="kaType">
                    <Button shape="rounded" className={classNames({selected: currentCategory === "pay"})}
                            onClick={() => setCategory("pay")}>Expense
                    </Button>
                    <Button className={classNames({selected: currentCategory === "income"})}
                            onClick={() => setCategory("income")} shape="rounded">Income
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icons category="calendar" className="icon"/>
                            {/*点击打开dete picker*/}
                            <span className="text"
                                  onClick={() => setDatePickerVisible(true)}>
                                {dayjs(date).format('YYYY-MM-DD')}
                            </span>
                            {/*Data picker */}
                            <ConfigProvider locale={enUS}>
                                <DatePicker className="kaDate" title="Select a Date" max={new Date()}
                                            visible={datePickerVisible}
                                            onCancel={() => {setDatePickerVisible(false)}}
                                            onConfirm={onConfirm}
                                />
                            </ConfigProvider>
                        </div>
                        <div className="kaInput">
                            {/*用户输入*/}
                            <Input className="input" placeholder="0.00" type="number"
                                   value={money}
                                   onChange={moneyChange}
                            />
                            <span className="iconYuan">$</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[currentCategory].map(item => {
                    return (
                        <div className="kaType" key={item.useFor}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div className={classNames('item', {selected: item.useFor === useFor})}
                                             key={item.useFor}
                                            // 记录点击的账单类型
                                             onClick={() => {
                                                 setUseFor(item.useFor)
                                             }}
                                        >
                                            <div className="icon">
                                                <Icons category={item.useFor}/>
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>Save</Button>
            </div>
        </div>
    )
}

export default NewBill