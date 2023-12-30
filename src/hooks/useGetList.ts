import { Ref, onMounted, ref, watchEffect } from "vue";
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
  isLessThanOrEqualTo,
  isPositive,
  isZero,
  minus,
  multipliedBy,
  plus,
} from "../utils";
import { VoteColor, DEFAULT_VOTES_ONE_TO_SECOND, Phase } from "../constants";

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

function formatRecords(data: ListData<IListItem>) {
  const _records = data.records.map((item) => {
    const phase = isLessThanOrEqualTo(item.voters, DEFAULT_VOTES_ONE_TO_SECOND)
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
    };
  });
  return sortBy(_records, (item) => item.endCountdown);
}

export function useGetListHot() {
  const list = ref(null as Array<IListItem> | null);
  const isLoading = ref(true);
  const total = ref(0);

  const fetchData = async () => {
    const { data } = await fetchListHot({
      mark: 0,
      pageSize: 1000,
      qStatusList: 1,
      version: 0,
      sortBySpendPoint: 0,
    });
    const _list = formatRecords(data);
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
  }, 10000);

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
    const _list = formatRecords(data);
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
  }, 3000);

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
  const doingMyCostPoints = ref("");

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
      isLoading.value = true;
      const { data } = await fetchListAccount({
        mark: 0,
        pageSize: 1000,
        account: account.value.account,
      });
      isLoading.value = false;
      const _list = formatRecords(data);

      // 正在进行中的
      list.value = _list.filter((item: IListItem) => {
        return isPositive(item.endCountdown);
      });
      doingCostPoints.value = list.value.reduce(
        (pre, cur) => plus(pre, cur.spendPoint),
        "0"
      );
      const _myDoingList = list.value.filter((item: IListItem) => {
        return item.opsKey !== '';
      });
      doingMyCostPoints.value = _myDoingList.reduce(
        (pre, cur) => plus(pre, cur.spendPoint),
        "0"
      );

      finishedList.value = _list.filter((item: IListItem) => {
        return !isPositive(item.endCountdown);
      });
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
        (pre, cur) =>
          plus(pre, cur.personIncome ? cur.personIncome.incomeRate : "0"),
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

  return {
    isLoading,
    list,
    finishedList,
    doingCostPoints,
    doingMyCostPoints,
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
