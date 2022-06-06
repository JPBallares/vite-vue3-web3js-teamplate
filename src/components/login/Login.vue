<script setup>
import Web3 from "web3";
import { onMounted, ref } from "@vue/runtime-core";

const userInfo = ref({});
console.log(userInfo)
const isConnected = ref(false);

const detectCurrentProvider = () => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
  return provider;
};

const onConnect = async () => {
  try {
    const currentProvider = detectCurrentProvider();
    if (currentProvider) {
      if (currentProvider !== window.ethereum) {
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
      await currentProvider.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(currentProvider);
      const userAccount = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      const account = userAccount[0];
      let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
      ethBalance = web3.utils.fromWei(ethBalance, "ether"); //Convert balance to wei
      saveUserInfo(ethBalance, account, chainId);
      if (userAccount.length === 0) {
        console.log("Please connect to meta mask");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const saveUserInfo = (ethBalance, account, chainId) => {
  const userAccount = {
    account: account,
    balance: ethBalance,
    connectionid: chainId,
  };
  console.log(userAccount);
  window.localStorage.setItem("userAccount", JSON.stringify(userAccount)); //user persisted data
  const userData = JSON.parse(localStorage.getItem("userAccount"));
  userInfo.value = userData;
  isConnected.value = true;
};

const onDisconnect = () => {
  window.localStorage.removeItem("userAccount");
  userInfo.value = {};
  isConnected.value = false;
};

onMounted(() => {
  function checkConnectedWallet() {
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    if (userData != null) {
      userInfo.value = userData;
      isConnected.value = true;
    }
  }
  checkConnectedWallet();
});
</script>
<template>
  <div>
    
    <button @click="onConnect">Login with Metamask</button>
  </div>
</template>