import { ref, watchEffect } from "vue";
import { fetchUserInfo } from "../apis/user";

export function useGetUserInfo() {
  const userInfo = ref(null as UserType.User | null);

  watchEffect(async () => {
    const { data } = await fetchUserInfo();
    userInfo.value = data;
  });

  return userInfo;
}
