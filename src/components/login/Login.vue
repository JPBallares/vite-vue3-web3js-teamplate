<script setup>
import { onMounted, ref } from '@vue/runtime-core'
import { onConnect } from '@utils/web3/auth'

const userInfo = ref({})
const isConnected = ref(false)

onMounted(() => {
  function checkConnectedWallet() {
    const userData = JSON.parse(localStorage.getItem('userAccount'))
    if (userData != null) {
      userInfo.value = userData
      isConnected.value = true
    }
  }
  checkConnectedWallet()
})
</script>
<template>
  <div>
    <button @click="onConnect">Login with Metamask</button>
  </div>
</template>
