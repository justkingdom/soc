import { Ref, onMounted, ref, watchEffect } from "vue";
import { isEmpty } from "lodash";
import { isGreaterThanOrEqual } from "../utils";
import { IListItem, fetchAnswerList } from "../apis/list";
import moment from "moment";

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

  const onRefetch = () => {
    mark.value = 0;
    results = [];
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
    refetch: onRefetch
  };
}

export function useGetAnswerList2(account: Ref<string>) {
  const list = ref(null as Array<IListItem> | null);
  const mark = ref(0 as number | undefined);
  const total = ref(0);

  let results = [] as Array<IListItem>;
  const targetMark = moment().subtract(1, "days").valueOf();

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

  const onRefetch = () => {
    mark.value = 0;
    // results = [];
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
    refetch: onRefetch
  };
}
