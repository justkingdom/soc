import { Ref, onMounted, ref, watchEffect } from "vue";
import { isEmpty, sortBy } from "lodash";
import { useIntervalFn } from "@vueuse/core";
import { fetchRankList } from "../apis/rank";
import {
  div,
  isGreaterThanOrEqual,
  isLessThanOrEqualTo,
  multipliedBy,
  plus,
} from "../utils";
import { TOTAL_AIRDROP } from "../constants";
import { IListItem, fetchAnswerList } from "../apis/list";
import moment from "moment";

interface IRankItem {
  account: string;
  nickname: string;
  photo: string;
  badge: null;
  status: number;
  totalIncome: number;
  order: number;
  percent: string;
  airdrop: string;
}

export function useGetAnswerList(account: Ref<string>) {
  const list = ref(null as Array<IListItem> | null);
  const mark = ref(0 as number | undefined);
  const total = ref(0);

  let results = [] as Array<IListItem>;
  const targetMark = moment().subtract(7, "days").valueOf();

  const fetchData = async () => {
    if (mark.value !== undefined) {
      const { data } = await fetchAnswerList({
        account: account.value,
        mark: mark.value,
        pageSize: 20,
      });

      if (!isEmpty(data.records)) {
        results = results.concat(data.records);
        mark.value = data.mark;
      } else {
        mark.value = undefined;
      }
    }
  };

  watchEffect(() => {
    if (
      account.value &&
      mark.value !== undefined &&
      (mark.value === 0 || isGreaterThanOrEqual(mark.value, targetMark))
    ) {
      fetchData();
    } else {
      list.value = results;
    }
  });

  onMounted(() => {
    mark.value = 0;
    results = [];
  });

  return {
    list,
    total,
  };
}
