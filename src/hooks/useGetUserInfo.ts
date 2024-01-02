import { Ref, ref, watchEffect } from "vue";
import { IPeronsal, fetchPersonal } from "../apis/user";

export function useGetPersonal(account: Ref<string>) {
  const personInfo = ref(null as IPeronsal | null);

  watchEffect(async () => {
    const { data } = await fetchPersonal(account.value);
    personInfo.value = data;
  });

  return personInfo;
}
