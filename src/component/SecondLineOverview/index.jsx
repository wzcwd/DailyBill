import './index.scss'

const OneLineOverview = ({ pay, income }) => {
    return (
        <div className="secondLineOverview">
            <div className="pay">
                <span className="type">Expense</span>
                <span className="money">{Math.abs(pay).toFixed(2)}</span>
            </div>
            <div className="income">
                <span className="type">Income</span>
                <span className="money">{income.toFixed(2)}</span>
            </div>
            <div className="balance">
                <span className="type">Balance </span>
                <span className="money">{(income + pay).toFixed(2)}</span>
            </div>
        </div>
    )
}

export default OneLineOverview
