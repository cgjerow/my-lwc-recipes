import LOCALE from '@salesforce/i18n/locale';
import CURRENCY from '@salesforce/i18n/currency';

export class NumberFormatter
{
    format(value)
    {
        return value.toLocaleString(LOCALE);
    }
}

export class TextFormatter
{
    format(value) 
    {
        return value;
    }
}

export class PercentFormatter
{
    format(value)
    {
        return formatters["number"].format(value) + "%";
    }
}

export class CurrencyFormatter
{
    format(value)
    {
        return CURRENCY + " " + formatters["number"].format(value);
    }
}