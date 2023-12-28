import http from '../service/request';

// 列表数据
type RankListData<T> = {
  rankUserDtoList: T[];
  me: any;
};

export async function fetchRankList(params: PageParams) {
  return http.request<BaseResponse<RankListData<any>>>({
    url: `/support/season/income/rank`,
    method: "get",
    params
  });
}
