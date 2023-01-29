import React, { useEffect, useState } from "react";
import console from "console-browserify";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { Bell, useNotification } from "web3uikit";
import { ABI, contractAddress } from "../constants";
import { ethers } from "ethers";
const LotteryContract = () => {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const [entranceFee, setEntranceFee] = useState("0");
  const [players, setPlayers] = useState("0");
  const [lotteryWinner, setLotteryWinner] = useState("");
  const [state, setState] = useState(null);
  const [balance, setBalance] = useState(0);
  const chainId = parseInt(chainIdHex);
  const lotteryAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;
  const { runContractFunction: pay } = useWeb3Contract({
    functionName: "pay",
    msgValue: entranceFee,
    contractAddress: lotteryAddress,
    abi: ABI,
    params: {},
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    functionName: "getEntranceFee",
    abi: ABI,
    contractAddress: lotteryAddress,
    params: {},
  });

  const { runContractFunction: getPlayers } = useWeb3Contract({
    functionName: "getPlayers",
    abi: ABI,
    contractAddress: lotteryAddress,
    params: {},
  });

  const { runContractFunction: getWinner } = useWeb3Contract({
    functionName: "getWinner",
    abi: ABI,
    contractAddress: lotteryAddress,
    params: {},
  });

  const { runContractFunction: lotteryState } = useWeb3Contract({
    functionName: "lotteryState",
    abi: ABI,
    contractAddress: lotteryAddress,
    params: {},
  });

  const { runContractFunction: getBalance } = useWeb3Contract({
    functionName: "getBalance",
    abi: ABI,
    contractAddress: lotteryAddress,
    params: {},
  });

  const updateUI = async () => {
    const getEntranceFeetx = (await getEntranceFee()).toString();
    const getPlayersTx = (await getPlayers()).toString();
    const getWinnerTx = (await getWinner()).toString();
    const lotteryStateTx = (await lotteryState()).toString();
    const getBalanceTx = (await getBalance()).toString();
    setEntranceFee(getEntranceFeetx);
    setPlayers(getPlayersTx);
    setLotteryWinner(getWinnerTx);
    setState(lotteryStateTx);
    setBalance(getBalanceTx);
  };

  const dispatch = useNotification();
  const handleEnterLottery = async () => {
    await pay({
      onSuccess: handleSuccess,
      onError: (e) => {
        if (e.message.includes("denied transaction")) {
          handleFailedNotification();
        }
      },
    });
  };

  const handleSuccess = async (TX) => {
    await TX.wait(1);
    handleSuccessNotification();
    updateUI();
  };

  const handleSuccessNotification = () => {
    dispatch({
      type: "success",
      message: "Transaction Successful",
      position: "topR",
      icon: Bell,
    });
  };

  const handleFailedNotification = () => {
    dispatch({
      type: "error",
      message: "Transaction Denied",
      position: "topR",
    });
  };
  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  return (
    <div className="">
      {lotteryAddress ? (
        <div className="">
          <button onClick={handleEnterLottery}>Enter Lottery</button>

          <h1>
            Entrance Fee:
            {entranceFee && ethers.utils.formatUnits(entranceFee, "ether")}
          </h1>
          <h1>
            Contract Balance:{" "}
            {balance && ethers.utils.formatUnits(balance, "ether")}
          </h1>
          <p>
            {state == 0
              ? "Lottery is Open. Try your luck"
              : "Lottery is CLose. Wait a bit"}
          </p>
          <h1>Number of Players: {players}</h1>
          <h1>Lottery Winner: {lotteryWinner}</h1>
        </div>
      ) : (
        <div className="notFound">
          <h1>No Wallet Connected</h1>
        </div>
      )}
    </div>
  );
};

export default LotteryContract;
