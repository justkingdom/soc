import { VoteColor, Phase } from "../constants";
import http from "../service/request";

export interface IOps {
  k: string;
  v: string;
  opsVoteTotal: number;
  opsVoteTotalSnapshot: string | null;
  opsVoteTotalFinal: string | null;
  voteTrend: Object;
  percent: string | number;
  color: VoteColor;
  selected?: boolean;
}

export interface IAccount {
  _id: string;
  account: string;
  nickname: string;
  profile: string;
  // badge: {
  //   "10": {
  //     level: 4;
  //     createTime: 1696882455883;
  //     updateTime: 1702820724383;
  //   };
  //   "20": {
  //     level: 5;
  //     createTime: 1695489172449;
  //     updateTime: 1696782213096;
  //   };
  // };
  photo: string;
  hasFollow: boolean | null;
  followStatus: number;
  status: number;
  createTime: string | null;
  updateTime: string | null;
}

export interface IPersonIncome {
  assigned: boolean;
  answerReward: number;
  victoryReward: number;
  likeReward: number;
  investReward: number;
  reasonReward: number;
  investReturned: number;
  askShareReward: number;
  askTrendReward: number;
  incomeRate: number;
}

export interface IListItem {
  phase: Phase;
  title: string;
  account: IAccount;
  ops: Array<IOps>;
  tags: any;
  validity: number;
  imageUrl: Array<string>;
  voters: number;
  votes: number;
  investedTotal: number;
  investedPoints: number;
  investNftPoint: number;
  investedTotalPoints: number;
  questionPrizePool: number;
  injectPoint: number;
  createTime: number;
  finishTime: number;
  s: number;
  prizeStatus: number;
  auth: number;
  publicSort: number;
  privateRank: number;
  reasonTotal: number;
  answerLikedTotal: null;
  inviteUsers: Array<any>;
  privateRankScore: number;
  firstQuestionScore: number;
  rankRate: number;
  privateRankBetween: number;
  lastQuestionRankBetween: number;
  isPrivateRank: boolean;
  answerUpdateCount: number;
  allowAnswerTotal: number;
  allowLikeTotal: number;
  likeLeaveCount: number;
  toPublicTime: null;
  endCountdown: number;
  showDistribution: number;
  votesMap: Object;
  voteChart: null;
  spendPoint: number;
  isShowPrexOrEnd: boolean;
  redPacket: string | null;
  userInvestedTotalPoints: number;
  userInvestedPoints: number;
  userInvestNftPoint: number;
  opsKey: string;
  hasAnswerAuth: boolean | null;
  isPointInvest: boolean;
  isNftInvest: boolean;
  qID: string;
  qStatus: 1;
  personIncome?: IPersonIncome;
  duration: string;
  totalRewards?: string;
  index?: number;
}

export async function fetchListNotLogin(params: PageParams) {
  return http.request<BaseResponse<ListData<IListItem>>>({
    url: `/qa/v1/home/notLogin`,
    method: "get",
    params,
  });
}

export async function fetchListHomeA(params: PageParams) {
  return http.request<BaseResponse<ListData<IListItem>>>({
    url: `/qa/v1/home/a`,
    method: "get",
    params,
  });
}

export async function fetchListHomeB(params: PageParams) {
  return http.request<BaseResponse<ListData<IListItem>>>({
    url: `/qa/v1/home/b`,
    method: "get",
    params,
  });
}

export async function fetchListHot(params: PageHotParams) {
  return http.request<BaseResponse<ListData<IListItem>>>({
    url: `/qa/v1/find/page/hot`,
    method: "get",
    params,
  });
}

export async function fetchListAccount(params: PageAccountParams) {
  return http.request<BaseResponse<ListData<IListItem>>>({
    url: `/qa/v1/personal/page/all`,
    method: "get",
    params,
  });
}

export async function fetchAnswerList(params: PageAccountParams) {
  return http.request<BaseResponse<ListData<IListItem>>>({
    url: `/qa/v1/personal/page/answer`,
    method: "get",
    params,
  });
}
