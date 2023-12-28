import { onMounted, ref, watchEffect } from "vue";
import { fetchListHomeB, fetchListHot } from "../apis/list";
import { sortBy } from "lodash";
import { useIntervalFn } from "@vueuse/core";

interface IOps {
  k: string;
  v: string;
  opsVoteTotal: number;
  opsVoteTotalSnapshot: string | null;
  opsVoteTotalFinal: string | null;
  voteTrend: Object;
}

interface IAccount {
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

interface ListItem {
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
}

export function useGetList() {
  const list = ref(null as ListData<any> | null);

  watchEffect(async () => {
    const { data } = await fetchListHomeB({
      page: 1,
      pageSize: 100,
    });
    // console.log("data: ", data);
    list.value = data;
  });

  return list;
}

export function useGetListHot() {
  const list = ref(null as Array<ListItem> | null);
  const isLoading = ref(true);
  const total = ref(null as number | null);

  const fetchData = async () => {
    const { data } = await fetchListHot({
      mark: 0,
      pageSize: 1000,
      qStatusList: 1,
      version: 0,
      sortBySpendPoint: 0,
    });
    // console.log("data: ", data);
    const _records = data.records.map((item) => {
      return {
        ...item,
      }
    });
    list.value = sortBy(_records, item => item.endCountdown);
    total.value = _records.length;
  }

  onMounted(async () => {
    isLoading.value = true;
    await fetchData();
    isLoading.value = false;
  });

  useIntervalFn(() => {
    fetchData();
  }, 30000);

  return {
    isLoading,
    list
  };
}
