import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'CAD' | 'AUD' | 'JPY';

interface CurrencyOption {
  code: CurrencyCode;
  name: string;
  symbol: string;
  rateFromUsd: number;
}

export const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rateFromUsd: 1 },
  { code: 'EUR', name: 'Euro', symbol: '€', rateFromUsd: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rateFromUsd: 0.78 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rateFromUsd: 83.1 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rateFromUsd: 1.36 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rateFromUsd: 1.52 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rateFromUsd: 149.5 },
];

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatCurrency: (amountInUsd: number) => string;
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

    return (amountInUsd: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: selectedCurrency.code,
        maximumFractionDigits: selectedCurrency.code === 'JPY' ? 0 : 2,
      }).format(amountInUsd * selectedCurrency.rateFromUsd);
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
