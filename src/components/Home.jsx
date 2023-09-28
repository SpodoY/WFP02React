import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import WalletBalance from "./WalletBalance";

import Eleciton from "../artifacts/contracts/Election.sol/Election.json";
const contactAddress = '0x31516Af046aaaacA9d75c0427787dd69490A2aC4'

import Voting from "./Voting";

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