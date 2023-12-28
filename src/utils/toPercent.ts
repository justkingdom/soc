import Decimal from "decimal.js";
import { isGreaterThan, isLessThan, isZero, multipliedBy } from "./mathUtils";
import { toDecimalPlaces } from "./formatCurrencyAmount";

export function toPercent(
  value: Decimal.Value,
  precision = 2,
  hundred = true
): string {
  try {
    if (hundred) {
      return `${new Decimal(value).mul(100).toFixed(precision)}%`;
    } else {
      return `${new Decimal(value).toFixed(precision)}%`;
    }
  } catch (e) {
    return "-";
  }
}

export function toFormattedPercent(
  value: Decimal.Value,
  precision = 2
): string {
  try {
    if (isZero(value)) {
      return "0.00%";
    }
    const _value = multipliedBy(value, 100);
    if (isGreaterThan(_value, 0) && isLessThan(_value, 0.01)) {
      return "<0.01%";
    }
    if (isGreaterThan(_value, -0.01) && isLessThan(_value, 0)) {
      return "-0.01%";
    }
    return `${toDecimalPlaces(_value, precision)}%`;
  } catch (e) {
    return "-";
  }
}
