import "@fontsource/golos-ui/400.css";
import "@fontsource/golos-ui/500.css";
import "@fontsource/golos-ui/600.css";

import { createApp } from "vue";
import { VueDapp } from "vue-dapp";
import { ethers } from "ethers";
import VueCountdown from "@chenfengyuan/vue-countdown";
import App from "./App.vue";
import store from "./store";
import router from "./router";

// 引入全局样式
import "@/styles/index.scss";
import "highlight.js/styles/atom-one-dark.css";
import * as buffer from "buffer";

if (typeof (window as any).global === "undefined") {
  (window as any).global = window;
}
if (typeof (window as any).Buffer === "undefined") {
  (window as any).Buffer = buffer.Buffer;
}

const app = createApp(App);

app.use(router);
app.use(store);
app.component(VueCountdown.name, VueCountdown);
app.use(VueDapp, {
  connectTimeout: 5000,
  autoConnect: true,
  dumb: false,
  networks: {
    137: {
      chainId: ethers.utils.hexValue(137),
      blockExplorerUrls: ["https://polygonscan.com"],
      chainName: "Polygon",
      rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
      nativeCurrency: {
        name: "Matic",
        decimals: 18,
        symbol: "MATIC",
      },
    },
    80001: {
      chainId: ethers.utils.hexValue(80001),
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      chainName: "Mumbai",
      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
      nativeCurrency: {
        name: "Mumbai",
        decimals: 18,
        symbol: "MATIC",
      },
    },
    42161: {
      chainId: ethers.utils.hexValue(42161),
      blockExplorerUrls: ["https://arbiscan.io"],
      chainName: "Arbitrum One",
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      nativeCurrency: {
        name: "Arbitrum",
        symbol: "ETH",
        decimals: 18,
      },
    },
  },
});
app.mount("#app");
