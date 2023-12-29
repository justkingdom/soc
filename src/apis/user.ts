import http from '../service/request';

const PREFIX = 'user';

export async function fetchUserInfo() {
  return http.request<BaseResponse<UserType.User>>({
    url: `${PREFIX}/getUserInfo`,
    method: "get",
  });
}

export async function fetchMock() {
  return http.request<BaseResponse<any>>({
    url: `https://api.allinnode.com/account/wallet/chain/list`,
    method: "get",
  });
}
