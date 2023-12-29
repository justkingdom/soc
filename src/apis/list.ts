import http from '../service/request';

export async function fetchListNotLogin(params: PageParams) {
  return http.request<BaseResponse<ListData<any>>>({
    url: `/qa/v1/home/notLogin`,
    method: "get",
    params
  });
}

export async function fetchListHomeA(params: PageParams) {
  return http.request<BaseResponse<ListData<any>>>({
    url: `/qa/v1/home/a`,
    method: "get",
    params
  });
}

export async function fetchListHomeB(params: PageParams) {
  return http.request<BaseResponse<ListData<any>>>({
    url: `/qa/v1/home/b`,
    method: "get",
    params
  });
}

export async function fetchListHot(params: PageHotParams) {
  return http.request<BaseResponse<ListData<any>>>({
    url: `/qa/v1/find/page/hot`,
    method: "get",
    params
  });
}
