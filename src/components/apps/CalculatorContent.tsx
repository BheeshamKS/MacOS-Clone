import { useState, memo } from 'react';

export const CalculatorContent = memo(() => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const calculate = (a: number, b: number, op: string) => {
    switch(op) {
      case '+': return a + b;
      case '-': return a - b;
      case 'x': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const pressNum = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const pressOp = (op: string) => {
    const current = parseFloat(display);
    if (operator && prev !== null && !waitingForNewValue) {
      const result = calculate(prev, current, operator);
      setDisplay(String(result));
      setPrev(result);
    } else {
      setPrev(current);
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const pressEqual = () => {
    if (!operator || prev === null) return;
    const current = parseFloat(display);
    const result = calculate(prev, current, operator);
    setDisplay(String(result));
    setPrev(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const pressClear = () => {
    setDisplay('0');
    setPrev(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const toggleSign = () => setDisplay(String(parseFloat(display) * -1));
  const pressPercent = () => setDisplay(String(parseFloat(display) / 100));
  const pressDot = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setWaitingForNewValue(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col mt-[56px] h-[calc(100%-56px)] bg-[#1c1c1e]/80">
      <div className="flex-1 flex items-end justify-end px-6 pb-4">
        <span className="text-white text-6xl font-light tracking-tight truncate max-w-full">
          {display}
        </span>
      </div>
      <div className="h-[400px] grid grid-cols-4 gap-[2px] p-[2px] bg-black/50">
        <button onClick={pressClear} className="bg-[#505050] hover:bg-[#737373] text-white/90 text-2xl transition-colors">AC</button>
        <button onClick={toggleSign} className="bg-[#505050] hover:bg-[#737373] text-white/90 text-2xl transition-colors">+/-</button>
        <button onClick={pressPercent} className="bg-[#505050] hover:bg-[#737373] text-white/90 text-2xl transition-colors">%</button>
        <button onClick={() => pressOp('÷')} className="bg-[#FF9F0A] hover:bg-[#FFB340] text-white text-3xl font-medium transition-colors">÷</button>

        {[7, 8, 9].map(n => <button key={n} onClick={() => pressNum(String(n))} className="bg-[#747477] hover:bg-[#A3A3A3] text-white text-3xl transition-colors">{n}</button>)}
        <button onClick={() => pressOp('x')} className="bg-[#FF9F0A] hover:bg-[#FFB340] text-white text-2xl font-medium transition-colors">×</button>

        {[4, 5, 6].map(n => <button key={n} onClick={() => pressNum(String(n))} className="bg-[#747477] hover:bg-[#A3A3A3] text-white text-3xl transition-colors">{n}</button>)}
        <button onClick={() => pressOp('-')} className="bg-[#FF9F0A] hover:bg-[#FFB340] text-white text-4xl font-medium transition-colors">-</button>

        {[1, 2, 3].map(n => <button key={n} onClick={() => pressNum(String(n))} className="bg-[#747477] hover:bg-[#A3A3A3] text-white text-3xl transition-colors">{n}</button>)}
        <button onClick={() => pressOp('+')} className="bg-[#FF9F0A] hover:bg-[#FFB340] text-white text-3xl font-medium transition-colors">+</button>

        <button onClick={() => pressNum('0')} className="col-span-2 bg-[#747477] hover:bg-[#A3A3A3] text-white text-3xl rounded-bl-xl flex items-center pl-8 transition-colors">0</button>
        <button onClick={pressDot} className="bg-[#747477] hover:bg-[#A3A3A3] text-white text-3xl transition-colors">.</button>
        <button onClick={pressEqual} className="bg-[#FF9F0A] hover:bg-[#FFB340] text-white text-3xl font-medium rounded-br-xl transition-colors">=</button>
      </div>
    </div>
  );
});
