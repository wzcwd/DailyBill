import {ConfigProvider, DatePicker, NavBar} from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'
import {useDate} from '@/hooks/useDate'
import {useYearBillList} from '@/hooks/useBillList'
import {getMonthOverview, getOverview} from "@/constant/index.jsx";
import TwoLineOverview from '@/component/FirstLineOverview'
import OneLineOverview from '@/component/SecondLineOverview'
import enUS from "antd-mobile/es/locales/en-US";


const YearBill = () => {

    const {date, visible, onDateChange, onShowDate, onHideDate} = useDate()

    const selectedYear = date.get('year')
    const selectedYearBills = useYearBillList(selectedYear)

    const overview = getOverview(selectedYearBills)
    const thisYear = dayjs().get('year')
    const maxMonth = thisYear === selectedYear ? dayjs().get('month') + 1 : 12
    const monthBillList = new Array(maxMonth)
        .fill('').map((_, month) => {
            return getMonthOverview(selectedYearBills, month)
        }).reverse()

    return (
        <div className="billDetail">
            <NavBar className="nav" backIcon={false}>
                <div className="nav-title" onClick={onShowDate}>
                    {selectedYear}
                    <span className={classNames('arrow', visible && 'expand')}></span>
                </div>
            </NavBar>
            <ConfigProvider locale={enUS}>
                <DatePicker className="kaDate" title="Select a Year" precision="year"
                            visible={visible} onClose={onHideDate} max={new Date()}
                            onConfirm={onDateChange}
                />
            </ ConfigProvider>


            <div className="content">
                <div className='overview'>
                    <TwoLineOverview
                        pay={overview.pay}
                        income={overview.income}
                        className="overview"
                    />
                </div>
                {monthBillList.map((item, index) => {
                    return (
                        <div className="monthBill" key={index}>
                            <div className="date">
                                {dayjs().month(maxMonth - index - 1).format('MMMM')}
                            </div>
                            <OneLineOverview pay={item.pay} income={item.income}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default YearBill