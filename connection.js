import { ethers } from './ethers-5.2.esm.min.js'

const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

const contractAddress = "0x37874Bc2dBbBC675f3c8AcF53a64FA604e2AdFc6"

const contractABI = [
  {
        "inputs": [],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
]

// The Contract object
const contract = new ethers.Contract(contractAddress, contractABI, provider)

const signer = contract.connect(provider.getSigner())

// function to check if metamask is installed
var isMetamaskInstalled = () => ethereum.isMetamaskInstalled

// function to check if metamask is connected to the current chain
var isMetamaskConnected = () => ethereum.isConnected()

// function to get metamask chainID
const getChainId = async () => {
    return await ethereum.request({method: 'eth_chainId'})
}

// function to get metamask networkId
const getNetworkId = async () => {
    return await ethereum.request({method: 'net_version'})
}

// function to get metamask account connected with dapp
const getAccount = async () => {
    try {
        let account = await ethereum.request({method: 'eth_accounts'})
        return account
    } catch (error) {
        console.log('Error getting account:\n', error)
        return error
    }
}


// function to request metamask to connect with account
const connectToAccount = async () => {
    try {
        let account = await ethereum.request({method: 'eth_requestAccounts'})
        return account
    } catch (error) {
        console.log('Error connecting to metamask account:\n',error)
        return error
    }
}

const freeMint = async () => {
    try {
        let account = await getAccount()
        if (account.length === 0) {
            alert('Connect to account first!')
            return
        }
        const reciept = signer.mint()
        console.log(reciept)
    } catch (error) {
        console.log('Free mint failed:\n', error.message)
        return error
    }
}

const goldMint = async () => {
    try {
        let account = await getAccount()
        if (account.length === 0) {
            alert('Connect to account first!')
            return
        }
        let balance = await provider.getSigner().getBalance()
        let eth = ethers.utils.formatEther(balance)
        if (eth >= 0.1) { 
            const reciept = signer.mint({value: ethers.utils.parseEther("0.1")})
            console.log(reciept)
        } else {
            alert("Insufficient funds.")
        }        
    } catch (error) {
        console.log('Gold mint failed:\n', error.message)
        alert(error.message)
    }
}

const rubyMint = async () => {
    try {

        let account = await getAccount()
        if (account.length === 0) {
            alert('Connect to account first!')
            return
        }
        let balance = await provider.getSigner().getBalance()
        let eth = ethers.utils.formatEther(balance)
        if (eth >= 0.5) { 
            const reciept = signer.mint({value: ethers.utils.parseEther("0.5")})
            console.log(reciept)
        } else {
            alert("Insufficient funds.")
        }
    } catch (error) {
        console.log('Ruby mint failed:\n', error.message)
        alert(error.message)
    }
}

export default {
    isMetamaskInstalled,
    isMetamaskConnected,
    getChainId,
    getNetworkId,
    getAccount,
    connectToAccount,
    freeMint,
    goldMint,
    rubyMint
}