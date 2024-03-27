import Cookies from 'js-cookie';
interface CurrencyInfo {
  locale: string;
  // formatter: RegExp; // Optional
  // parser: RegExp; // Optional
  isAddSuffix : Boolean,
  customDisplay? : string
}

interface CurrencyMap {
  [key: string]: CurrencyInfo;
}
const currencyMap:CurrencyMap  = {
  USD: {
    locale: 'en-US',
    // formatter: /\B(?=(\d{3})+(?!\d))/g,
    // parser: /\$\s?|(,*)/g
    isAddSuffix: false
  },
  VND: {
    locale: 'vi-VN',
    // formatter : /\B(?=(\d{3})+(?!\d))/g,
    // parser: /₫\s?|(,*)/g
    isAddSuffix: true
  }
  // Add more mappings as needed
  // ,VNK: {
  //   locale: 'vi-VN',
  //   // formatter : /\B(?=(\d{3})+(?!\d))/g,
  //   // parser: /₫\s?|(,*)/g
  //   isAddSuffix: true,
  //   customDisplay: "K"
  // }
};

const currencyList: string[] = Object.keys(currencyMap);
  
const getCurrencyStyleFromCookie = (): string => {
    return Cookies.get('currency') || 'USD';
};



const getLocaleFromCurrency = (currency: string): string => {
  // Return the associated locale or a default if not found
  return currencyMap[currency].locale || 'en-US';
};

const formatCurrency = (number: number): string => {
  
  const currencyStyle = getCurrencyStyleFromCookie() || 'USD';
  
  const locale = getLocaleFromCurrency(currencyStyle);
  // if (currencyStyle == 'VNK'){
  //   currencyStyle
  // }
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currencyStyle,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: currencyMap[currencyStyle].customDisplay,
  };
  return new Intl.NumberFormat(locale, options).format(number);
};

// const getCurrentFormatter = ():RegExp => {
//   const currencyStyle = getCurrencyStyleFromCookie();
//   return currencyMap[currencyStyle].formatter;
// }

// const getCurrentParser = ():RegExp => {
//   const currencyStyle = getCurrencyStyleFromCookie();
//   return currencyMap[currencyStyle].parser;
// }
const getCurrentIsAddSuffix = ():Boolean => {
  const currencyStyle = getCurrencyStyleFromCookie();
  return currencyMap[currencyStyle].isAddSuffix;
}

export { formatCurrency, getCurrentIsAddSuffix, currencyList };