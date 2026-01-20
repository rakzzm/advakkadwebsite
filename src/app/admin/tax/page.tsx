'use client';

import { useState } from 'react';

type Mode = 'tax' | 'calculator';

export default function AdminTaxCalculator() {
  const [mode, setMode] = useState<Mode>('tax');

  // Tax Calculator State
  const [amount, setAmount] = useState<number | ''>('');
  const [taxRate, setTaxRate] = useState<number | ''>('');
  const [result, setResult] = useState<{ tax: number; total: number } | null>(null);

  // General Calculator State
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Tax Calculator Functions
  const calculate = () => {
    const numAmount = Number(amount);
    const numRate = Number(taxRate);
    if (!numAmount || !numRate) return;

    const tax = (numAmount * numRate) / 100;
    const total = numAmount + tax;
    setResult({ tax, total });
  };

  const clearTax = () => {
    setAmount('');
    setTaxRate('');
    setResult(null);
  };

  // General Calculator Functions
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearCalc = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculateResult(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculateResult = (firstValue: number, secondValue: number, op: string): number => {
    switch (op) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculateResult(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handleSquareRoot = () => {
    const value = parseFloat(display);
    setDisplay(String(Math.sqrt(value)));
  };

  const handleToggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  return (
    <div className="tax-page">
      <h1 className="page-title">Calculator</h1>
      
      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button 
          className={`mode-btn ${mode === 'tax' ? 'active' : ''}`}
          onClick={() => setMode('tax')}
        >
          Tax Calculator
        </button>
        <button 
          className={`mode-btn ${mode === 'calculator' ? 'active' : ''}`}
          onClick={() => setMode('calculator')}
        >
          General Calculator
        </button>
      </div>

      {mode === 'tax' ? (
        <div className="calculator-card">
          <div className="input-group">
            <label>Base Amount (₹)</label>
            <input 
              type="number" 
              value={amount} 
              onChange={e => setAmount(Number(e.target.value))} 
              placeholder="Enter amount" 
            />
          </div>

          <div className="input-group">
            <label>Tax Rate (%)</label>
            <input 
              type="number" 
              value={taxRate} 
              onChange={e => setTaxRate(Number(e.target.value))} 
              placeholder="e.g., 18" 
            />
          </div>

          <div className="actions">
            <button onClick={clearTax} className="btn-clear">Clear</button>
            <button onClick={calculate} className="btn-calc">Calculate</button>
          </div>

          {result && (
            <div className="result-area">
              <div className="result-row">
                <span>Tax Amount:</span>
                <span className="val bad">₹ {result.tax.toFixed(2)}</span>
              </div>
              <div className="result-row total">
                <span>Total Payable:</span>
                <span className="val good">₹ {result.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="calculator-card calc-mode">
          <div className="calc-display">{display}</div>
          
          <div className="calc-buttons">
            <button onClick={clearCalc} className="calc-btn function">C</button>
            <button onClick={clearEntry} className="calc-btn function">CE</button>
            <button onClick={handlePercent} className="calc-btn function">%</button>
            <button onClick={() => performOperation('÷')} className="calc-btn operator">÷</button>

            <button onClick={() => inputDigit('7')} className="calc-btn">7</button>
            <button onClick={() => inputDigit('8')} className="calc-btn">8</button>
            <button onClick={() => inputDigit('9')} className="calc-btn">9</button>
            <button onClick={() => performOperation('×')} className="calc-btn operator">×</button>

            <button onClick={() => inputDigit('4')} className="calc-btn">4</button>
            <button onClick={() => inputDigit('5')} className="calc-btn">5</button>
            <button onClick={() => inputDigit('6')} className="calc-btn">6</button>
            <button onClick={() => performOperation('-')} className="calc-btn operator">−</button>

            <button onClick={() => inputDigit('1')} className="calc-btn">1</button>
            <button onClick={() => inputDigit('2')} className="calc-btn">2</button>
            <button onClick={() => inputDigit('3')} className="calc-btn">3</button>
            <button onClick={() => performOperation('+')} className="calc-btn operator">+</button>

            <button onClick={handleToggleSign} className="calc-btn">±</button>
            <button onClick={() => inputDigit('0')} className="calc-btn">0</button>
            <button onClick={inputDecimal} className="calc-btn">.</button>
            <button onClick={handleEquals} className="calc-btn equals">=</button>

            <button onClick={handleSquareRoot} className="calc-btn function wide">√</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .tax-page { max-width: 600px; margin: 0 auto; }
        .page-title { font-family: var(--font-playfair); font-size: 1.8rem; margin-bottom: 1.5rem; color: #1a1a1a; }
        
        .mode-toggle {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background: #f5f5f5;
          padding: 0.25rem;
          border-radius: 10px;
        }

        .mode-btn {
          flex: 1;
          padding: 0.75rem;
          border: none;
          background: transparent;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          color: #666;
        }

        .mode-btn.active {
          background: white;
          color: #d32f2f;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .calculator-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); border: 1px solid #eee; }
        
        .input-group { margin-bottom: 1.5rem; }
        .input-group label { display: block; margin-bottom: 0.5rem; color: #555; font-weight: 500; }
        .input-group input { width: 100%; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; }
        .input-group input:focus { border-color: #d32f2f; outline: none; }

        .actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .btn-calc { flex: 2; background: #d32f2f; color: white; border: none; padding: 0.8rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
        .btn-calc:hover { background: #b71c1c; }
        .btn-clear { flex: 1; background: #f5f5f5; color: #666; border: none; padding: 0.8rem; border-radius: 8px; font-weight: 600; cursor: pointer; }

        .result-area { margin-top: 2rem; padding-top: 1.5rem; border-top: 1px dashed #ddd; }
        .result-row { display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 1.1rem; }
        .result-row.total { font-size: 1.4rem; font-weight: 700; color: #1a1a1a; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee; }
        .val.bad { color: #d32f2f; }
        .val.good { color: #2e7d32; }

        /* Calculator Mode Styles */
        .calculator-card.calc-mode {
          max-width: 400px;
          margin: 0 auto;
        }

        .calc-display {
          background: #1a1a1a;
          color: white;
          padding: 1.5rem;
          border-radius: 8px;
          text-align: right;
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 1.5rem;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          word-break: break-all;
          font-family: 'Courier New', monospace;
        }

        .calc-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
        }

        .calc-btn {
          padding: 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1.3rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          background: #f5f5f5;
          color: #1a1a1a;
        }

        .calc-btn:hover {
          background: #e0e0e0;
          transform: translateY(-2px);
        }

        .calc-btn:active {
          transform: translateY(0);
        }

        .calc-btn.operator {
          background: #d32f2f;
          color: white;
        }

        .calc-btn.operator:hover {
          background: #b71c1c;
        }

        .calc-btn.function {
          background: #666;
          color: white;
        }

        .calc-btn.function:hover {
          background: #555;
        }

        .calc-btn.equals {
          background: #2e7d32;
          color: white;
        }

        .calc-btn.equals:hover {
          background: #1b5e20;
        }

        .calc-btn.wide {
          grid-column: span 2;
        }
      `}</style>
    </div>
  );
}
