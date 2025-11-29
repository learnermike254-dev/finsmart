import React, { useState, useEffect } from 'react';
import { AdBanner } from '../components/AdBanner';
import { Calculator } from 'lucide-react';

export const MortgageCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(300000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const p = principal;
    const r = interestRate / 100 / 12; // monthly interest rate
    const n = years * 12; // total number of payments

    if (r === 0) {
        setMonthlyPayment(p / n);
    } else {
        const payment = p * ( (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) );
        setMonthlyPayment(payment);
    }
  }, [principal, interestRate, years]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-brand-900 py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <Calculator className="w-12 h-12 text-money-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Mortgage Calculator</h1>
            <p className="text-brand-100 text-lg">Estimate your monthly house payments with our free tool.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Inputs */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Amount ($)</label>
                        <input 
                            type="number" 
                            value={principal} 
                            onChange={(e) => setPrincipal(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate (%)</label>
                        <input 
                            type="number" 
                            step="0.1"
                            value={interestRate} 
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        />
                        <input 
                            type="range" 
                            min="1" 
                            max="15" 
                            step="0.1"
                            value={interestRate} 
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full mt-2 accent-brand-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term (Years)</label>
                        <select 
                            value={years} 
                            onChange={(e) => setYears(Number(e.target.value))}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                        >
                            <option value={15}>15 Years</option>
                            <option value={20}>20 Years</option>
                            <option value={30}>30 Years</option>
                        </select>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-slate-50 rounded-xl p-8 flex flex-col justify-center items-center text-center border border-slate-100">
                    <h3 className="text-slate-500 font-medium uppercase tracking-wider text-sm mb-4">Estimated Monthly Payment</h3>
                    <div className="text-5xl font-bold text-brand-900 mb-2">
                        ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-slate-400 text-xs max-w-xs mx-auto">
                        *Excludes property taxes and insurance. Actual payments may vary.
                    </p>
                    <button className="mt-8 w-full bg-money-600 hover:bg-money-700 text-white font-bold py-3 rounded-lg transition-colors">
                        Get Pre-Approved Now
                    </button>
                </div>

            </div>
        </div>

        <div className="mt-12">
            <AdBanner slot="calc-bottom" />
        </div>

        <div className="prose prose-slate max-w-none mt-12 bg-white p-8 rounded-xl border border-slate-200">
            <h3>How to use this calculator</h3>
            <p>
                Knowing what you can afford is the first step in the home buying journey. 
                Adjust the loan amount, interest rate, and term to see how they impact your monthly payment.
            </p>
            <h3>Understanding the results</h3>
            <p>
                The number displayed is your Principal and Interest (P&I). 
                Most lenders recommend your total housing payment (including taxes and insurance) 
                should not exceed 28% of your gross monthly income.
            </p>
        </div>
      </div>
    </div>
  );
};