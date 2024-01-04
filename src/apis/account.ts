import http from "../service/request";

export interface ICenter {
  balances: string[];
  pen: {
    contractAddress: string;
    createdAt: number;
    imageUrl: string;
    level: number;
    tokenId: number;
    type: number;
  };
  points: {
    amount: number;
    updatedAt: number;
  };
  showPen: boolean;
  showPoint: boolean;
}

export interface IWalletLogin {
  account: string;
  badge: boolean;
  chainId: number;
  createTime: number;
  emailStatus: number;
  inviCode: string;
  language: string;
  letterAccepted: number;
  mailbox: string;
  nickname: string;
  photo: string;
  profile: string;
  showPen: number;
  showPoint: number;
  status: number;
  superAccount: string;
  updateTime: number;
  walletAddress: string;
}

export interface IRandomStringParams {
  walletAddress: string;
  language: string;
  scene: string;
}
export interface IWalletLoginParams {
  walletAddress: string;
  walletSign: string;
}

export async function fetchRandomString(params: IRandomStringParams) {
  return http.request<BaseResponse<string>>({
    url: `/account/wallet/random/string`,
    method: "post",
    data: params,
  });
}

export async function fetchWalletLogin(params: IWalletLoginParams) {
  return http.request<BaseResponse<ICenter>>({
    url: `/account/user_action/wallet_login`,
    method: "post",
    data: params,
  });
}

export async function fetchCenter() {
  return http.request<BaseResponse<ICenter>>({
    url: `/account/wallet/center`,
    method: "get",
    headers: {
      Authorization: "",
    },
  });
}
