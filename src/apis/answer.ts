import http from "../service/request";
import { IOps } from "./list";

export interface IAnswerParams {
  opKey: string;
  operationType: string;
  questionId: string;
  reason?: string;
}

export interface IAnswer {
  answerCreateVo: {
    opsKey: string;
    points: number;
    userPenInfo: {
      sbtPenLevel: number;
      nftCount: number;
    };
    ops: Array<IOps>;
    votes: number;
    voters: number;
    currentVotes: number;
    showDistribution: number;
    aid: string;
    qid: string;
  };
  reasonVo: any;
  questionPrizePool: number;
}

export async function fetchAnswer(params: IAnswerParams) {
  return http.request<BaseResponse<IAnswer>>({
    url: `/qa/v1/answer`,
    method: "post",
    params,
  });
}
