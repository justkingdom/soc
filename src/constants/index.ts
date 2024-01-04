export const DEFAULT_PRECISION = 18;
export const MAX_USER_INTERER = 12;
export const DEFAULT_USER_PRECISION = 2;
export const MAX_PRECISION = 32;
export const REG_INTEGER = /^[0-9]*[1-9][0-9]*$/;

export const DEFAULT_VOTES_ONE_TO_SECOND = 20;

export const HEIGHT_CONTAINER = 60 + 40 + 16 + 24;
export const TOTAL_AIRDROP = 400_0000;
export const PAGE_MAX_SIZE = 21;

export const STORAGE_KEY_HOT_LIST = "STORAGE_KEY_HOT_LIST";
export const STORAGE_KEY_CURRENT_MARK = "STORAGE_KEY_CURRENT_MARK";
export const STORAGE_KEY_LOGIN_INFO = "STORAGE_KEY_LOGIN_INFO";

export const GLOBAL_INTERVAL_TIME = +import.meta.env.VITE_GLOBAL_INTERVAL_TIME;

export const ONE_MINUTE = 60_000;

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

export enum QuestionStatus {
  Doing = "Doing",
  Finished = "Finished",
}
