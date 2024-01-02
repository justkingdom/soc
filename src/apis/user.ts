import http from "../service/request";

export interface IPeronsal {
  account: string;
  nickname: string;
  profile: string;
  badge: any;
  photo: string;
  hasFollow: false;
  followStatus: number;
  status: number;
  createTime: number;
  updateTime: number;
  fansTotal: number;
  followTotal: number;
  backgroundImage: string;
}

export async function fetchPersonal(account: string) {
  return http.request<BaseResponse<IPeronsal>>({
    url: `/qa/v1/personal?account=${account}`,
    method: "get",
  });
}

export async function fetchMock() {
  return http.request<BaseResponse<any>>({
    url: `https://api.allinnode.com/account/wallet/chain/list`,
    method: "get",
  });
}
