import { onMounted, ref } from "vue";
import { sortBy } from "lodash";
import { useIntervalFn } from "@vueuse/core";
import { fetchRankList } from "../apis/rank";
import { div, multipliedBy, plus } from "../utils";
import { TOTAL_AIRDROP } from "../constants";

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

export function useGetRankList() {
  const list = ref(null as Array<IRankItem> | null);
  const isLoading = ref(true);
  const total = ref(0);

  const fetchData = async () => {
    const { data } = await fetchRankList({
      page: 1,
      pageSize: 500,
    });
    const totalIncome = data.rankUserDtoList.reduce(
			(pre, cur) => plus(pre, cur.totalIncome),
			'0'
		);
    const _records = data.rankUserDtoList.map((item) => {
      const percent = div(item.totalIncome, totalIncome);
      const airdrop = multipliedBy(percent, TOTAL_AIRDROP);
      return {
        ...item,
        percent,
        airdrop
      };
    });
    list.value = sortBy(_records, (item) => item.endCountdown);
    total.value = _records.length;
  };

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
    list,
    total,
  };
}
