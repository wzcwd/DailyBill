import classNames from 'classnames'

import './index.scss'

const TwoLineOverview = ({ pay, income }) => {
    return (
        <div className={classNames('firstLineOverview')}>
            <div className="item">
                <span className="money">{Math.abs(pay).toFixed(2)}</span>
                <span className="type">Total Expense</span>
            </div>
            <div className="item">
                <span className="money">{income.toFixed(2)}</span>
                <span className="type">Total Income</span>
            </div>
            <div className="item">
                <span className="money">{(income + pay).toFixed(2)}</span>
                <span className="type">Total Balance</span>
            </div>
        </div>
    )
}

export default TwoLineOverview
