import Cookies from 'js-cookie';

const getLocaleFromCookie = (): string => {
    // Implement a function to retrieve the locale from cookies
    // Replace this with your actual logic to get the locale from cookies
    return 'vi-VN'; // Default to 'en-US' if not found
  };
  
const getCurrencyStyleFromCookie = (): string | undefined => {
    return Cookies.get('currency');
};

const getLocaleFromCurrency = (currency: string): string => {
  // Define a mapping between currency codes and locale strings
  const currencyLocaleMap: Record<string, string> = {
    USD: 'en-US',
    VND: 'vi-VN',
    // Add more mappings as needed
  };

  // Return the associated locale or a default if not found
  return currencyLocaleMap[currency] || 'en-US';
};
  const formatCurrency = (number: number): string => {
    const currencyStyle = getCurrencyStyleFromCookie() || 'USD';
    
    const locale = getLocaleFromCurrency(currencyStyle);
    const options: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currencyStyle,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
  
    return new Intl.NumberFormat(locale, options).format(number);
  };
  
  export { formatCurrency };