import Decimal from "decimal.js";

import { isEmptyAmount, toDecimalPlaces } from "./formatCurrencyAmount";
import {
  abs,
  div,
  isEqualTo,
  isLessThan,
  isNegative,
  isPositive,
} from "./mathUtils";

/**
 * Formats all numbers with a dollar value
 * 123456.789 ===> 123,456.78
 * @param value
 * @param precision
 * @param tiny
 * @returns
 */
export const formatNumber = (
  value: string | number = "",
  precision = 2,
  tiny = true,
  isRound = false
) => {
  if (value === "") {
    return "-";
  }
  if (isEqualTo(value, "0")) {
    return "0";
  }
  try {
    const _value = toDecimalPlaces(
      value,
      precision,
      isRound ? Decimal.ROUND_HALF_EVEN : Decimal.ROUND_DOWN
    );
    if (tiny && isLessThan(abs(value), div(1, Decimal.pow(10, precision)))) {
      return `${isNegative(_value) ? "<-" : "<"}${div(
        1,
        Decimal.pow(10, precision)
      )}`;
    }
    const n = String(_value);
    const p = n.indexOf(".");
    return n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
      p < 0 || i < p ? `${m},` : m
    );
  } catch (error: any) {
    console.error(error.message);
    return "-";
  }
};

export function toQuoteAmount(
  value: Decimal.Value,
  precision = 2,
  roundingMode: Decimal.Rounding = Decimal.ROUND_DOWN,
  plusSymbol = false
): string {
  try {
    const isZero = isEmptyAmount(value);
    if (isZero) {
      return "0.00";
    }
    const _value = new Decimal(value);
    const threshold = div(1, Decimal.pow(10, precision));

    if (_value.gte(0) && _value.lt(threshold)) {
      if (plusSymbol) {
        return `<+${threshold}`;
      }
      return `<${threshold}`;
    }
    if (_value.gt(`-${threshold}`) && _value.lt(0)) {
      return `< -${threshold}`;
    }
    if (isPositive(_value)) {
      if (plusSymbol) {
        return (
          "+" + formatNumber(_value.toFixed(precision, roundingMode), precision)
        );
      }
      return formatNumber(_value.toFixed(precision, roundingMode), precision);
    } else {
      return formatNumber(_value.toFixed(precision, roundingMode), precision);
    }
  } catch (e) {
    return String(value || "-");
  }
}

export function toUsd(
  value: Decimal.Value,
  precision = 2,
  roundingMode: Decimal.Rounding = Decimal.ROUND_DOWN,
  plusSymbol = false
): string {
  try {
    const isZero = isEmptyAmount(value);
    if (isZero) {
      return "$0.00";
    }
    const _value = new Decimal(value);
    const threshold = div(1, Decimal.pow(10, precision));

    if (_value.gte(0) && _value.lt(threshold)) {
      if (plusSymbol) {
        return `<+$${threshold}`;
      }
      return `<$${threshold}`;
    }
    if (_value.gt(`-${threshold}`) && _value.lt(0)) {
      return `< -$${threshold}`;
    }
    if (isPositive(_value)) {
      if (plusSymbol) {
        return (
          "+$" +
          formatNumber(_value.toFixed(precision, roundingMode), precision)
        );
      }
      return (
        "$" + formatNumber(_value.toFixed(precision, roundingMode), precision)
      );
    } else {
      return (
        "-$" +
        formatNumber(_value.abs().toFixed(precision, roundingMode), precision)
      );
    }
  } catch (e) {
    return String(value || "-");
  }
}
