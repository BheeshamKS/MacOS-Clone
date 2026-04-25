import { useState, memo } from 'react';
import { Delete, PanelLeft, Calculator } from 'lucide-react';

export const CalculatorContent = memo(() => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(true);

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

  const pressDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
    setWaitingForNewValue(false);
  };

  const pressClear = () => {
    setDisplay('0');
    setPrev(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const toggleSign = () => setDisplay(String(parseFloat(display) * -1));
  const pressPercent = () => setDisplay(String(parseFloat(display) / 100));
  const pressDot = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setWaitingForNewValue(false);
    }
  };

  const formattedDisplay = !isNaN(Number(display)) && display !== ''
    ? new Intl.NumberFormat('en-IN', { maximumFractionDigits: 6 }).format(Number(display)) 
    : display;
  
  return (
    <div className="flex-1 flex flex-col h-full pt-[56px] bg-[#282828]/95 backdrop-blur-xl text-white relative">
      {/* Fake Title Bar Icons for Calculator Mode */}
      <div className="absolute top-0 right-0 h-[56px] flex items-center pr-3 gap-3">
        <div className="w-8 h-8 rounded-lg bg-black/30 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
          <PanelLeft size={16} strokeWidth={2} />
        </div>
        <div className="w-8 h-8 rounded-full bg-black/30 border border-white/5 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
          <Calculator size={15} strokeWidth={2} />
        </div>
      </div>

      {/* Display Area */}
      <div className="flex flex-col px-6 pb-4 pt-2 h-[120px] justify-end">
        <span className="text-[64px] font-light tracking-tight leading-none text-right">{formattedDisplay}</span>
      </div>

      {/* Keypad */}
      <div className="p-4 pb-6 mt-auto">
        <div className="grid grid-cols-4 gap-[10px]">
          {/* Row 1 */}
          <button onClick={pressDelete} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full flex items-center justify-center transition-colors">
            <Delete size={20} />
          </button>
          <button onClick={pressClear} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full text-[22px] flex items-center justify-center transition-colors">AC</button>
          <button onClick={pressPercent} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full text-[22px] flex items-center justify-center transition-colors">%</button>
          <button onClick={() => pressOp('÷')} className="bg-[#FF9F0A] hover:bg-[#FFB340] aspect-square rounded-full text-3xl font-medium flex items-center justify-center transition-colors">÷</button>
          
          {/* Row 2 */}
          {[7, 8, 9].map(n => (
            <button key={n} onClick={() => pressNum(String(n))} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full text-[26px] flex items-center justify-center transition-colors">{n}</button>
          ))}
          <button onClick={() => pressOp('x')} className="bg-[#FF9F0A] hover:bg-[#FFB340] aspect-square rounded-full text-2xl font-medium flex items-center justify-center transition-colors">×</button>

          {/* Row 3 */}
          {[4, 5, 6].map(n => (
            <button key={n} onClick={() => pressNum(String(n))} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full text-[26px] flex items-center justify-center transition-colors">{n}</button>
          ))}
          <button onClick={() => pressOp('-')} className="bg-[#FF9F0A] hover:bg-[#FFB340] aspect-square rounded-full text-4xl font-medium flex items-center justify-center transition-colors">-</button>

          {/* Row 4 */}
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => pressNum(String(n))} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full text-[26px] flex items-center justify-center transition-colors">{n}</button>
          ))}
          <button onClick={() => pressOp('+')} className="bg-[#FF9F0A] hover:bg-[#FFB340] aspect-square rounded-full text-3xl font-medium flex items-center justify-center transition-colors">+</button>

          {/* Row 5 */}
          <button onClick={toggleSign} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full text-[22px] flex items-center justify-center transition-colors">+/-</button>
          <button onClick={() => pressNum('0')} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full text-[26px] flex items-center justify-center transition-colors">0</button>
          <button onClick={pressDot} className="bg-[#5D5D5F] hover:bg-[#737373] aspect-square rounded-full text-[26px] flex items-center justify-center transition-colors">.</button>
          <button onClick={pressEqual} className="bg-[#FF9F0A] hover:bg-[#FFB340] aspect-square rounded-full text-3xl font-medium flex items-center justify-center transition-colors">=</button>
        </div>
      </div>
    </div>
  );
});
