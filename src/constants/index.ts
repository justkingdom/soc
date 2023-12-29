export const DEFAULT_PRECISION = 18;
export const MAX_USER_INTERER = 12;
export const DEFAULT_USER_PRECISION = 2;
export const MAX_PRECISION = 32;
export const REG_INTEGER = /^[0-9]*[1-9][0-9]*$/;

export const DEFAULT_VOTES_ONE_TO_SECOND = 20;

export const HEIGHT_CONTAINER = 60 + 40 + 16 + 24;
export const TOTAL_AIRDROP = 400_0000;

export enum Phase {
  StepOne = "1",
  StepN = "2",
}

export enum Color {
  Default = "",
  Success = "success",
  Warning = "warning",
  Exception = "exception",
}

export enum VoteColor {
  Default = "",
  Success = "bg-green-200",
  Warning = "bg-orange-200",
  Exception = "bg-red-200",
}
