import Web3 from 'web3'

export const detectCurrentProvider = () => {
  let provider
  if (window.ethereum) {
    provider = window.ethereum
  } else if (window.web3) {
    provider = window.web3.currentProvider
  } else {
    console.log(
      'Non-Ethereum browser detected. You should consider trying MetaMask!'
    )
  }
  return provider
}

export const onConnect = async () => {
  try {
    const currentProvider = detectCurrentProvider()
    if (currentProvider) {
      if (currentProvider !== window.ethereum) {
        console.log(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        )
      }
      await currentProvider.request({ method: 'eth_requestAccounts' })
      const web3 = new Web3(currentProvider)
      const userAccount = await web3.eth.getAccounts()
      const chainId = await web3.eth.getChainId()
      const account = userAccount[0]
      let ethBalance = await web3.eth.getBalance(account) // Get wallet balance
      ethBalance = web3.utils.fromWei(ethBalance, 'ether') //Convert balance to wei
      if (userAccount.length === 0) {
        console.log('Please connect to meta mask')
      }
      return saveUserInfo(ethBalance, account, chainId)
    }
  } catch (err) {
    console.log(err)
    return [{}, false]
  }
}

export const onDisconnect = () => {
  window.localStorage.removeItem('userAccount')
  return [{}, false]
}

export const saveUserInfo = (ethBalance, account, chainId) => {
  const userAccount = {
    account: account,
    balance: ethBalance,
    connectionid: chainId,
  }
  window.localStorage.setItem('userAccount', JSON.stringify(userAccount)) //user persisted data
  const userData = JSON.parse(localStorage.getItem('userAccount'))
  return [userData, true]
}
