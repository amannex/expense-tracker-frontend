import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'AUD' | 'JPY';

interface CurrencyOption {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
];

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const savedCurrency = localStorage.getItem('currency') as CurrencyCode | null;
    return CURRENCIES.some((option) => option.code === savedCurrency) ? savedCurrency! : 'INR';
  });

  const setCurrency = (nextCurrency: CurrencyCode) => {
    localStorage.setItem('currency', nextCurrency);
    setCurrencyState(nextCurrency);
  };

  const formatCurrency = useMemo(() => {
    const selectedCurrency = CURRENCIES.find((option) => option.code === currency) || CURRENCIES[0];

    return (amount: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: selectedCurrency.code,
        maximumFractionDigits: selectedCurrency.code === 'JPY' ? 0 : 2,
      }).format(amount);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};
