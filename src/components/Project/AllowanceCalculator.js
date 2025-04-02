import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';

const AllowanceCalculator = () => {
    const today = new Date().toISOString().slice(0, 10);

    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [value, setValue] = useState('0');
    const [averagePerDay, setAveragePerDay] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        console.log(averagePerDay)

        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffTime = end - start;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        const amount = parseFloat(value.replace(/,/g, ''))

        console.log(diffDays, amount)

        if (diffDays > 0 && !isNaN(amount)) {
            const daily = amount / diffDays;
            setAveragePerDay(daily)
        } else {
            setAveragePerDay(null);
        }
    }

    return (
        <div className='calculator-page'>
            <form className='calculator-container' onSubmit={handleCalculate}>
                {/* Start date */}
                <div className='input-row'>
                    <label htmlFor="start" className='input-label'>Start date:</label>
                    <input
                        type='date'
                        id='start'
                        name='start-date'
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className='input-field'
                    />
                </div>
                <div className='input-row'>
                    <label htmlFor="end" className='input-label'>End date:</label>
                    <input
                        type='date'
                        id='end'
                        name='end-date'
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className='input-field'
                    />
                </div>
                <div className='input-row'>
                    <label htmlFor="amount" className='input-label'>Amount:</label>
                    <CurrencyInput
                        value={value}
                        onValueChange={(value) => setValue(value ? value : 0)}
                        prefix='$'
                        decimalSeparator='.'
                        groupSeparator=','
                        decimalsLimit={2}
                        placeholder='$0'
                        className='input-field'
                    />
                </div>
                <button
                    type='submit'
                    className='calculate-btn'>
                    Calculate!
                </button>
                {averagePerDay && (
                    <p className='average-result'>Average per day: ${averagePerDay.toFixed(2)}</p>
                )}
            </form>
        </div>
    )
}

export default AllowanceCalculator