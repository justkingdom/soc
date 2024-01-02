import { Ref, onMounted, ref, watchEffect } from "vue";
import store2 from "store2";
import {
  IAccount,
  IListItem,
  IOps,
  fetchListAccount,
  fetchListHomeB,
  fetchListHot,
  fetchListNotLogin,
} from "../apis/list";
import { isEqual, maxBy, minBy, sortBy } from "lodash";
import { useIntervalFn } from "@vueuse/core";
import {
  div,
  formatDuration,
  isLessThan,
  isPositive,
  isZero,
  minus,
  multipliedBy,
  plus,
  toDecimalPlaces,
} from "../utils";
import {
  VoteColor,
  DEFAULT_VOTES_ONE_TO_SECOND,
  Phase,
  GLOBAL_INTERVAL_TIME,
  STORAGE_KEY_HOT_LIST,
  PAGE_MAX_SIZE,
} from "../constants";
import Decimal from "decimal.js";

export function useGetList() {
  const list = ref(null as ListData<IListItem> | null);

  watchEffect(async () => {
    const { data } = await fetchListHomeB({
      page: 1,
      pageSize: 100,
    });
    list.value = data;
  });

  return list;
}

function formatRecords(records: Array<IListItem>, index?: number) {
  const _records = records.map((item) => {
    const questionPrizePool = +toDecimalPlaces(item.questionPrizePool, 4);
    let totalRewards = "0";
    if (isZero(item.endCountdown) && item.personIncome) {
      const {
        answerReward,
        victoryReward,
        likeReward,
        investReward,
        reasonReward,
        askShareReward,
        askTrendReward,
      } = item.personIncome;
      totalRewards = new Decimal(answerReward)
        .add(victoryReward)
        .add(likeReward)
        .add(investReward)
        .add(reasonReward)
        .add(askShareReward)
        .add(askTrendReward)
        .toFixed();
    }
    const phase = isLessThan(item.voters, DEFAULT_VOTES_ONE_TO_SECOND)
      ? Phase.StepOne
      : Phase.StepN;
    let ops = item.ops;
    if (phase === Phase.StepN) {
      const minOption = minBy(item.ops, "opsVoteTotal");
      const maxOption = maxBy(item.ops, "opsVoteTotal");
      ops = item.ops.map((option: IOps) => {
        let color = VoteColor.Warning;
        if (isEqual(minOption, option)) {
          color = VoteColor.Exception;
        }
        if (isEqual(maxOption, option)) {
          color = VoteColor.Success;
        }
        return {
          ...option,
          percent: +multipliedBy(div(option.opsVoteTotal, item.votes), 100),
          color,
        };
      });
    }
    const duration = formatDuration(item.createTime, item.finishTime);
    return {
      ...item,
      phase,
      ops,
      duration,
      questionPrizePool,
      totalRewards,
      index,
    } as IListItem;
  });
  return sortBy(_records, (item) => item.endCountdown);
}

export function useGetIndexList(index: Ref<number>) {
  const list = ref(null as Array<IListItem> | null);
  const isLoading = ref(true);
  const total = ref(0);

  const fetchData = async () => {
    console.log("index.value: ", index.value);
    const { data } = await fetchListHot({
      mark: index.value,
      pageSize: 20,
      qStatusList: 1,
      version: 0,
      sortBySpendPoint: 0,
    });
    const _list = formatRecords(data.records);
    list.value = _list;
    total.value = _list.length;
    isLoading.value = false;
  };

  onMounted(async () => {
    isLoading.value = true;
    await fetchData();
    isLoading.value = false;
  });

  useIntervalFn(() => {
    fetchData();
  }, 1500);

  return {
    isLoading,
    list,
    total,
    fetchData,
  };
}

export function useGetListHot() {
  const list = ref(null as Array<IListItem> | null);
  const isLoading = ref(true);
  const total = ref(0);

  const fetchData = async () => {
    const requests = [];

    for (let i = 0; i <= PAGE_MAX_SIZE; i++) {
      const request = fetchListHot({
        mark: i,
        pageSize: 20,
        qStatusList: 1,
        version: 0,
        sortBySpendPoint: 0,
      });
      requests.push(request);
    }

    try {
      console.log("hots begin ...");
      const reps = await Promise.all(requests);
      console.log("hots end ...");
      let results = [] as Array<IListItem>;
      reps.forEach((rep: BaseResponse<ListData<IListItem>>, index: number) => {
        const { records } = rep.data;
        if (records.length > 0) {
          const _list = formatRecords(records, index);
          results = results.concat(_list);
        } else {
          console.warn("The empty index is ", index);
        }
      });

      list.value = sortBy(results, (item) => item.endCountdown);
      store2.set(STORAGE_KEY_HOT_LIST, list.value);
      total.value = results.length;
      isLoading.value = false;
    } catch (error) {
      console.error("Error:", error);
      const results = store2.has(STORAGE_KEY_HOT_LIST)
        ? store2.get(STORAGE_KEY_HOT_LIST)
        : [] as Array<IListItem>;
      const _list = formatRecords(results);
      list.value = sortBy(_list, (item) => item.endCountdown);
      total.value = results.length;
      isLoading.value = false;
    }
  };

  onMounted(async () => {
    isLoading.value = true;
    await fetchData();
    isLoading.value = false;
  });

  useIntervalFn(() => {
    fetchData();
  }, 60000);

  return {
    isLoading,
    list,
    total,
  };
}

export function useGetListNotLogin() {
  const list = ref(null as Array<IListItem> | null);
  const isLoading = ref(true);
  const total = ref(0);

  const fetchData = async () => {
    const { data } = await fetchListNotLogin({
      page: 1,
      pageSize: 20,
    });
    const _list = formatRecords(data.records);
    list.value = _list;
    total.value = _list.length;
    isLoading.value = false;
  };

  onMounted(async () => {
    isLoading.value = true;
    await fetchData();
    isLoading.value = false;
  });

  useIntervalFn(() => {
    fetchData();
  }, GLOBAL_INTERVAL_TIME);

  return {
    isLoading,
    list,
    total,
  };
}

export function useGetListByAccount(account: Ref<IAccount | null>) {
  const list = ref(null as Array<IListItem> | null);
  const finishedList = ref(null as Array<IListItem> | null);
  const isLoading = ref(true);
  const total = ref(0);

  // 进行中的问题中，已投入
  const doingCostPoints = ref("");

  // 结束的问题中，正确的数量
  const finishedTotalCorrect = ref(0);
  // 结束的问题中，错误的数量
  const finishedTotalError = ref(0);
  // 结束的问题中，正确率
  const finishedCorrectRate = ref("");

  // 结束的问题中，积分收益率
  const finishedIncomeRate = ref("");

  // 结束的问题中，总投入积分
  const finishedTotalCostPoints = ref("");
  // 结束的问题中，正确的投入积分
  const finishedCorrectCostPoints = ref("");
  // 结束的问题中，错误的投入积分
  const finishedErrorCostPoints = ref("");
  // 结束的问题中，正确的收益
  const finishedTotalCorrectIncome = ref("");

  const fetchData = async () => {
    if (account && account.value) {
      const { data } = await fetchListAccount({
        mark: 0,
        pageSize: 20,
        account: account.value.account,
      });
      isLoading.value = false;
      const _list = formatRecords(data.records);

      // 正在进行中的
      list.value = _list.filter((item: IListItem) => {
        return isPositive(item.endCountdown);
      });
      doingCostPoints.value = list.value.reduce(
        (pre, cur) => plus(pre, cur.spendPoint),
        "0"
      );

      const _finishedList = _list.filter((item: IListItem) => {
        return !isPositive(item.endCountdown);
      });
      finishedList.value = sortBy(
        _finishedList,
        (item) => +item.finishTime,
        "desc"
      ).reverse();
      // 总投入
      finishedTotalCostPoints.value = finishedList.value.reduce(
        (pre, cur) => plus(pre, cur.spendPoint),
        "0"
      );
      const _correctList = _list.filter((item: IListItem) => {
        return isPositive(item.personIncome?.incomeRate);
      });
      finishedTotalCorrect.value = _correctList.length;
      finishedCorrectCostPoints.value = _correctList.reduce(
        (pre, cur) => plus(pre, cur.spendPoint),
        "0"
      );
      const _finishedTotalCorrectIncome = _correctList.reduce(
        (pre, cur) => plus(pre, cur.totalRewards || "0"),
        "0"
      );
      finishedTotalCorrectIncome.value = minus(
        _finishedTotalCorrectIncome,
        finishedCorrectCostPoints.value
      );
      const _errorList = finishedList.value.filter((item: IListItem) => {
        return isZero(item.personIncome?.incomeRate);
      });
      finishedTotalError.value = _errorList.length;
      finishedErrorCostPoints.value = _errorList.reduce(
        (pre, cur) => plus(pre, cur.spendPoint),
        "0"
      );
      total.value = _list.length;
      finishedCorrectRate.value = div(
        _correctList.length,
        finishedList.value.length
      );
      finishedIncomeRate.value = div(
        finishedTotalCorrectIncome.value,
        finishedTotalCostPoints.value
      );
    }
  };

  watchEffect(async () => {
    if (account.value) {
      isLoading.value = true;
      await fetchData();
      isLoading.value = false;
    }
  });

  useIntervalFn(() => {
    fetchData();
  }, GLOBAL_INTERVAL_TIME);

  return {
    isLoading,
    list,
    finishedList,
    doingCostPoints,
    finishedTotalCorrect,
    finishedTotalError,
    finishedCorrectRate,
    finishedIncomeRate,
    finishedTotalCostPoints,
    finishedTotalCorrectIncome,
    finishedErrorCostPoints,
    finishedCorrectCostPoints,
    total,
    refetch: fetchData,
  };
}
