import { Ref, onMounted, ref, watchEffect } from "vue";
import { isEmpty } from "lodash";
import { isGreaterThanOrEqual } from "../utils";
import { IListItem, fetchAnswerList } from "../apis/list";
import moment from "moment";
import { ElMessage } from 'element-plus';

export function useGetAnswerList(account: Ref<string>) {
  const list = ref(null as Array<IListItem> | null);
  const mark = ref(0 as number | undefined);
  const total = ref(0);
  const isHidden = ref(false);

  let results = [] as Array<IListItem>;
  const targetMark = moment().subtract(7, "days").valueOf();

  const fetchData = async () => {
    if (mark.value !== undefined) {
      const { data, code } = await fetchAnswerList({
        account: account.value,
        mark: mark.value,
        pageSize: 20,
      });

      if (code === 4001) {
        ElMessage({
          message: '需要登录',
          type: 'warning',
        })
        isHidden.value = true;
        return
      }

      if (!isEmpty(data.records)) {
        results = results.concat(data.records);
        mark.value = data.mark;
      } else {
        if (mark.value === 0) {
          ElMessage({
            message: '该用户已隐藏所参与的内容',
            type: 'warning',
          })
        }
        isHidden.value = true;
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
    isHidden,
    list,
    total,
    refetch: onRefetch
  };
}

export function useGetAnswerList2(account: Ref<string>) {
  const list = ref(null as Array<IListItem> | null);
  const mark = ref(0 as number | undefined);
  const total = ref(0);
  const isHidden = ref(false);

  let results = [] as Array<IListItem>;
  const targetMark = moment().subtract(2, "days").valueOf();

  const fetchData = async () => {
    if (mark.value !== undefined) {
      const { data, code } = await fetchAnswerList({
        account: account.value,
        mark: mark.value,
        pageSize: 20,
      });

      if (code === 4001) {
        ElMessage({
          message: '需要登录',
          type: 'warning',
        })
        isHidden.value = true;
        return
      }

      // console.log('mark.value: ', mark.value)
      // console.log('isHidden.value: ', isHidden.value)

      if (!isEmpty(data.records)) {
        results = results.concat(data.records);
        mark.value = data.mark;
      } else {
        if (mark.value === 0) {
          ElMessage({
            message: '该用户已隐藏所参与的内容',
            type: 'warning',
          })
        }
        isHidden.value = true;
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
    isHidden,
    list,
    total,
    refetch: onRefetch
  };
}
