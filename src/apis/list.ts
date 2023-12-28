import http from '../service/request';

const PREFIX = 'qa/v1';

export async function fetchList(params: PageParams) {
  return http.request<BaseResponse<ListData<any>>>({
    url: `${PREFIX}/home/notLogin`,
    method: "get",
    params
  });
}

export async function fetchListHomeA(params: PageParams) {
  return http.request<BaseResponse<ListData<any>>>({
    url: `${PREFIX}/home/a`,
    method: "get",
    params
  });
}

export async function fetchListHomeB(params: PageParams) {
  return http.request<BaseResponse<ListData<any>>>({
    url: `${PREFIX}/home/b`,
    method: "get",
    params
  });
}

export async function fetchListHot(params: PageHotParams) {
  return http.request<BaseResponse<ListData<any>>>({
    url: `${PREFIX}/find/page/hot`,
    method: "get",
    params
  });
}
