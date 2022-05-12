import { ethers } from "ethers";
import swapTokensAbi from './abi/SwapTokens.json'
import * as dotenv from 'dotenv';

dotenv.config();

// swapTokens to swap tokens on pangolin exchange
async function swapTokens() {
    try{
        console.log("tokenA",process.env.TOKEN_A)
        console.log("tokenB",process.env.TOKEN_B)
        console.log("amount",process.env.AMOUNT)
        let provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
        let currentGasPrice = await provider.getGasPrice();
        let wallet = new ethers.Wallet(String(process.env.PRIVATE_KEY), provider);
        let abijson = JSON.parse(JSON.stringify(swapTokensAbi));
        let contract = new ethers.Contract(String(process.env.CONTRACT_ADDRESS), abijson, provider);
        let contractWithSigner = contract.connect(wallet);
        var overrides = {
            // The maximum units of gas for the transaction to use
            gasLimit: 200000,
            // The price (in wei) per unit of gas
            gasPrice: currentGasPrice
        };
        console.log("Processing transacion....")
        let tx = await contractWithSigner.swapMyTokens(process.env.TOKEN_A, process.env.TOKEN_B, ethers.utils.parseUnits(String(process.env.AMOUNT), 18), overrides); 
        let txhash = "https://testnet.snowtrace.io/tx/"+tx.hash
        console.log( "txUrl:",txhash)
    }catch(error){
        console.log("Error",error)
        throw error
    }
}

swapTokens()