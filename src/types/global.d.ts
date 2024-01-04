// 分页参数
type PageParams = {
  page: number;
  pageSize: number;
};

type PageHotParams = {
  mark: number;
  pageSize: number;
  qStatusList: number;
  version: number;
  sortBySpendPoint: number;
};

type PageAccountParams = {
  mark: number;
  pageSize: number;
  account: string;
};

// 正常响应
type BaseResponse<T> = {
  code: number;
  data: T;
  message: string;
  time: number;
  idToken?: string | null;
  isRegister?: boolean;
  password?: string;
  refreshToken?: string;
  token?: string;
  tokenTime?: number;
  userType: string;
};

// 列表数据
type ListData<T> = {
  records: T[];
  total: number;
  size: number;
  current: number;
  mark: number;
};
