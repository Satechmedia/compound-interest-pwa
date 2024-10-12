import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('Day');
  const [totalResult, setTotalResult] = useState(null);
  const [results, setResults] = useState([]);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    let periods = 365; // Default for daily compounding

    if (timeUnit === 'Month') {
      periods = 12;
    } else if (timeUnit === 'Year') {
      periods = 1;
    }

    const finalAmount = p * Math.pow(1 + r / periods, periods * t);
    const totalInterest = finalAmount - p;

    setTotalResult({
      finalAmount: finalAmount.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });

    const newResults = [];
    let previousBalance = p;
    for (let i = 1; i <= t; i++) {
      const currentBalance = p * Math.pow(1 + r / periods, periods * i);
      const interestForPeriod = currentBalance - previousBalance;
      newResults.push({
        period: i,
        balance: currentBalance.toFixed(2),
        interest: interestForPeriod.toFixed(2),
      });
      previousBalance = currentBalance;
    }
    setResults(newResults);
  };

  const handleClear = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setTimeUnit('Day');
    setTotalResult(null);
    setResults([]);
  };

  const getPeriodLabel = () => {
    switch (timeUnit) {
      case 'Day':
        return 'Day';
      case 'Month':
        return 'Month';
      case 'Year':
        return 'Year';
      default:
        return 'Period';
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        <Calculator className="mr-2" />
        Compound Interest
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Money</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter principal amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Interest %</label>
          <div className="flex">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter interest rate"
            />
            <select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              className="mt-1 block ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>Day</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <div className="flex">
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter time period"
            />
            <select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              className="mt-1 block ml-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option>Day</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={calculateInterest}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button
            onClick={handleClear}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Clear
          </button>
        </div>
        
        {totalResult && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Result</h3>
            <p><strong>Final Amount:</strong> ${totalResult.finalAmount}</p>
            <p><strong>Total Interest Earned:</strong> ${totalResult.totalInterest}</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Detailed Calculations</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">{getPeriodLabel()}</th>
                    <th className="py-2 px-4 border-b">Balance</th>
                    <th className="py-2 px-4 border-b">Interest Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.period}>
                      <td className="py-2 px-4 border-b">{result.period}</td>
                      <td className="py-2 px-4 border-b">${result.balance}</td>
                      <td className="py-2 px-4 border-b">${result.interest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;