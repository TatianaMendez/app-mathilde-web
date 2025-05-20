import { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import type { RangeKeyDict } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import styles from './dateRangePicker.module.css';

type RangeKey = { startDate: Date; endDate: Date; key: string };

interface DateRangePickerProps {
  onChange?: (start: Date, end: Date) => void;
  minData?: Date;
  maxData?: Date;
}

const quickRanges = [
  { label: 'Today', range: () => ({ startDate: new Date(), endDate: new Date() }) },
  { label: 'Yesterday', range: () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return { startDate: d, endDate: d };
  }},
  { label: 'Last 7 Days', range: () => ({ startDate: addDays(new Date(), -6), endDate: new Date() }) },
  { label: 'Last 30 Days', range: () => ({ startDate: addDays(new Date(), -29), endDate: new Date() }) },
  { label: 'This Month', range: () => {
    const now = new Date();
    return { startDate: new Date(now.getFullYear(), now.getMonth(), 1), endDate: now };
  }},
  { label: 'Last Month', range: () => {
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    return { startDate: prevMonth, endDate: end };
  }},
];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange, minData, maxData }) => { 
  const [range, setRange] = useState<RangeKey[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: 'selection'
    }
  ]);
  const [showPicker, setShowPicker] = useState(false);
  const [months, setMonths] = useState(2);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detecta el tamaño de la pantalla y ajusta la cantidad de meses
  useEffect(() => {
    const handleResize = () => {
      setMonths(window.innerWidth < 900 ? 1 : 2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ajusta la posición del popup para que no se desborde
  useEffect(() => {
    if (showPicker && inputRef.current && popupRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const popupWidth = popupRef.current.offsetWidth || 700;
      const spaceRight = window.innerWidth - inputRect.left;
      const spaceLeft = inputRect.right;

      const style: React.CSSProperties = {
        right: 'auto',
        left: 0,
      };

      // Si no cabe a la derecha, alinea a la derecha del input
      if (spaceRight < popupWidth && spaceLeft > popupWidth) {
        style.right = 0;
        style.left = 'auto';
      }
      // Si no cabe ni a la derecha ni a la izquierda, ocupa el ancho de la pantalla
      if (window.innerWidth < popupWidth) {
        style.left = 0;
        style.right = 0;
        style.width = '100vw';
        style.maxWidth = '100vw';
      }

      setPopupStyle(style);
    }
  }, [showPicker, months]);

  const handleRangeChange = (rangesByKey: RangeKeyDict) => {
    const selection = rangesByKey.selection;
    if (selection.startDate && selection.endDate) {
      setRange([selection as RangeKey]);
      onChange?.(selection.startDate, selection.endDate);
    }
  };

  const handleQuickRange = (rangeFn: () => { startDate: Date, endDate: Date }) => {
    const { startDate, endDate } = rangeFn();
    setRange([{ startDate, endDate, key: 'selection' }]);
    onChange?.(startDate, endDate);
    setShowPicker(false);
  };

  const formatShort = (date: Date) => format(date, 'dd, MMM yyyy');

  // Cierra el popup al hacer clic fuera
  useEffect(() => {
    if (!showPicker) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPicker]);

  return (
    <div className={styles['date-container']}>
      <input
        ref={inputRef}
        type="text"
        readOnly
        value={`${formatShort(range[0].startDate)} - ${formatShort(range[0].endDate)}`}
        onClick={() => setShowPicker(!showPicker)}
        className={styles['date-input']}
      />
      {showPicker && (
        <div
          ref={popupRef}
          className={styles['date-popup']}
          style={popupStyle}
        >
          <div className={styles['date-menu']}>
            {quickRanges.map((q, idx) => (
              <div
                key={q.label}
                className={
                  styles['date-menuItem'] + (idx === 2 ? ' ' + styles['date-menuItemActive'] : '')
                }
                onClick={() => handleQuickRange(q.range)}
              >
                {q.label}
              </div>
            ))}
            <div
              className={styles['date-menuItem'] + ' ' + styles['date-menuItemCustom']}
              onClick={() => setShowPicker(false)}
            >
              Custom Range
            </div>
          </div>
          <div className={styles['date-calendar']}>
            <DateRange
              editableDateInputs={true} 
              onChange={handleRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={range}
              months={months}
              rangeColors={['#6c3cff']}
              minDate={minData}
              maxDate={maxData}
            />
          </div>
        </div>
      )}
    </div>
  );
};