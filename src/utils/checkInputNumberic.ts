import Decimal from 'decimal.js';
import { DEFAULT_PRECISION, MAX_USER_INTERER, REG_INTEGER } from '../constants';

export function isNumeric(value: Decimal.Value) {
	return !isNaN(parseFloat(String(value)));
}

/**
 * Check whether the number entered by the user with specified precision is legal
 * @param value
 * @param decimal
 * @returns boolean
 */
export function checkInputNumberic(
	value: string,
	decimal: number = DEFAULT_PRECISION,
	isNegative = false
): boolean {
	let negative = '';
	if (isNegative) {
		negative = `(\\-|\\+)?`;
	}
	const regNumber = new RegExp(
		`^${negative}[0-9]{0,${MAX_USER_INTERER - 1}}?(\\.\\d{0,${decimal}})?$`
	);
	const regDecimal = new RegExp('^0?(\\.\\d{0,' + decimal + '})?$');
	if (!regNumber.test(value) && !regDecimal.test(value)) {
		return false;
	}
	return true;
}

export function checkInputInteger(value: string): boolean {
	return REG_INTEGER.test(value);
}
