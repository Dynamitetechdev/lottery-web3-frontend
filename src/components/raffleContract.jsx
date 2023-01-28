import React from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ABI, contractAddress } from "../constants";
const lotteryContract = () => {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const lotteryAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;
  const { runContractFunction: pay } = useWeb3Contract({
    functionName: "pay",
    msgValue: "",
    contractAddress: lotteryAddress,
    abi: ABI,
    params: {},
  });
  return (
    <div className="">
      <div className=""></div>
    </div>
  );
};

export default lotteryContract;
