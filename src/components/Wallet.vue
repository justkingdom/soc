<script setup lang="ts">
import {
	useBoard,
	useEthers,
	useWallet,
	displayChainName,
	displayEther,
	shortenAddress,
	useEthersHooks,
	MetaMaskConnector,
	WalletConnectConnector,
	CoinbaseWalletConnector,
	SafeConnector,
	Connector,
} from "vue-dapp"
import { onBeforeMount, ref, watch } from 'vue'

const isDev = import.meta.env.DEV
const infuraId = isDev ? import.meta.env.VITE_INFURA_KEY : 'ff6a249a74e048f1b413cba715f98d07'

const { open } = useBoard()
const { wallet, disconnect, onDisconnect, onAccountsChanged, onChainChanged } = useWallet()
const { address, balance, chainId, isActivated, dnsAlias } = useEthers()
const { onActivated, onChanged } = useEthersHooks()

console.log(address,'>>>',wallet,'>>>', balance,'>>>', chainId,'>>>', isActivated, '>>>',dnsAlias )
onDisconnect(() => {
	console.log('disconnect')
})

onAccountsChanged(() => {
	console.log('accounts changed')
})

onChainChanged((chainId: any) => {
	console.log('chain changed', chainId)
})

let connectors: Connector[] = [
	new MetaMaskConnector({
		appUrl: 'http://localhost:3000',
	}),
	new WalletConnectConnector({
		projectId: '3f3c98042b194264687bf59e104c534a',
		chains: [1],
		showQrModal: true,
		qrModalOptions: {
			themeMode: 'dark',
			themeVariables: undefined,
			chainImages: undefined,
			desktopWallets: undefined,
			walletImages: undefined,
			mobileWallets: undefined,
			enableExplorer: true,
			explorerAllowList: undefined,
			tokenImages: undefined,
			privacyPolicyUrl: undefined,
			explorerDenyList: undefined,
			termsOfServiceUrl: undefined,
		},
	}),
	new CoinbaseWalletConnector({
		appName: 'Vue Dapp',
		jsonRpcUrl: `https://mainnet.infura.io/v3/${infuraId}`,
	}),
]

// only check whether it's in the iframe
// if (!isNotSafeApp()) {
//   const safe = new SafeConnector()
//   connectors = [safe, connectors[0]]
// }

const connectorsCreated = ref(false)

onBeforeMount(async () => {
	const safe = new SafeConnector()
	// check SafeAppSDK is available
  console.log(safe)
	try {
		if (await safe.isSafeApp()) {
			connectors = [safe]
		}
	} catch (err: any) {
		console.error(err)
	}

	connectorsCreated.value = true
})

const { availableNetworks } = useEthers()

const supportedChainId = Object.keys(availableNetworks.value).map(key => Number(key))

const selectedChainId = ref(0)

onActivated(() => {
	selectedChainId.value = chainId.value as number
})

const isChainChanged = ref(false)
onChanged(() => {
	selectedChainId.value = chainId.value as number
	isChainChanged.value = true
})

// For turning back to previous chainId without calling switchChain() again
const switchError = ref(false)
watch(selectedChainId, async (val, oldVal) => {
	if (oldVal === 0) return // ignore initial change
	if (switchError.value) {
		switchError.value = false
		return
	}

	try {
		if (wallet.connector) {
			await wallet.connector.switchChain!(val)
		}
	} catch (e: any) {
		switchError.value = true
		selectedChainId.value = oldVal
		console.error(e)
	}
})

const connectErrorHandler = (error: any) => {
	console.error('Connect error: ', error)
}
</script>
<template>
 <div class="m-4">
  {{ shortenAddress(address) }}
			<button @click="isActivated ? disconnect() : open()" class="btn" :disabled="wallet.status === 'connecting'">
				{{
					wallet.status === 'connected'
						? 'Disconnect'
						: wallet.status === 'connecting'
						? 'Connecting...'
						: wallet.status === 'loading'
						? 'Loading...'
						: 'Connect'
				}}
			</button>
		</div>
    <vd-board v-if="connectorsCreated" :connectors="connectors" :connectErrorHandler="connectErrorHandler" dark>
		<!-- <template #loading>
      <div v-if="wallet.status === 'loading'"></div>
    </template> -->
	</vd-board>
</template>
