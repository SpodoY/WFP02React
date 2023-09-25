import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import WalletBalance from "./WalletBalance";

import Eleciton from "../artifacts/contracts/Election.sol/Election.json";
import Voting from "./Voting";
const contactAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

const provider = new ethers.BrowserProvider(window.ethereum)

const signer = provider.getSigner()

const contract = new ethers.Contract(contactAddress, Eleciton.abi)

function Home() {

    return (
        <div>
            <Voting />
        </div>
    )
}

export default Home