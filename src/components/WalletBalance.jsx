import { useState } from 'react';
import { ethers, formatEther } from 'ethers';

function WalletBalance() {
    const [balance, setBalance] = useState();

    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const balance = await provider.getBalance(account)
        setBalance(formatEther(balance))
    }

    return (
        <div className='card'>
            <div>
                <h3>Your balance: {balance ? balance + " ETH" : ""}</h3>
                <button onClick={() => getBalance()}>Show my balance</button>
            </div>
        </div>
    )
}

export default WalletBalance;