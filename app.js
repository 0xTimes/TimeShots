import metamaskConfig from './connection.js'

const network = document.getElementById('networkId')
const chainId = document.getElementById('chainId')
const account = document.getElementById('accountId')

const connect = document.getElementById('connectToWallet')

const freeMint = document.getElementById('freeMint')
const goldMint = document.getElementById('goldMint')
const rubyMint = document.getElementById('rubyMint')

// check if metamask is installed in browser
if (metamaskConfig.isMetamaskInstalled) {
    console.log('Metamask is installed!')
}
else {
    alert('Install Metamask extension to connect with DApp!')
}

// if metamask is connected do this
const checkOnLoad = async () => {
    if (metamaskConfig.isMetamaskConnected) {
        ethereum.autoRefreshOnNetworkChange = false
        let networkId = await metamaskConfig.getNetworkId()
        let chainId = await metamaskConfig.getChainId()
        await metamaskConfig.connectToAccount()
        console.log('Metamask connected:', await metamaskConfig.isMetamaskConnected())
    } else {
        alert('Connect to available ethereum network!')
        console.log('Connect to available ethereum network!')
    }
}

checkOnLoad()

// event triggered when account is changed in metamask
ethereum.on('accountsChanged', async (accounts) => {
    console.log('Account changed from', account)
    account.innerHTML = await metamaskConfig.getAccount()
})

// event triggered when metamask is connected to chain and can make rpc request
ethereum.on('connect', (chainId) => {
    console.log(chainId)
    console.log('Metamask Connected:', ethereum.isConnected())
})

// event triggered when metamask is disconnected from chain and can not make rpc request
ethereum.on('disconnect', (chainId) => {
    console.log(chainId)
    console.log('Metamask Connected:', ethereum.isConnected())
    alert('Metamask is not connected to ethereum network. Retry!')
})

// add click event listener on the connect button
connect.addEventListener('click', async (e) => {
    e.preventDefault()

    let getAccountAddress = await metamaskConfig.getAccount()
    if (getAccountAddress.length < 1) {
        getAccountAddress = await metamaskConfig.connectToAccount()
        account.innerHTML = getAccountAddress
    } else {
        account.innerHTML = getAccountAddress
    }
    console.log(getAccountAddress)
})

// add click event listener on the mint button

freeMint.addEventListener('click', async (e) => {
    e.preventDefault()
    metamaskConfig.freeMint()
})

goldMint.addEventListener('click', async (e) => {
    e.preventDefault()
    metamaskConfig.goldMint()
})

rubyMint.addEventListener('click', async (e) => {
    e.preventDefault()
    metamaskConfig.rubyMint()
})