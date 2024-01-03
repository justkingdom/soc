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

export async function fetchRandomString() {
  return http.request<BaseResponse<ICenter>>({
    url: `/account/wallet/random/string`,
    method: "get",
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
