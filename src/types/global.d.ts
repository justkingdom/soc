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

// 正常响应
type BaseResponse<T> = {
  code: number;
  data: T;
  message: string;
  time: number;
};

// 列表数据
type ListData<T> = {
  records: T[];
  total: number;
  size: number;
  current: number;
};


