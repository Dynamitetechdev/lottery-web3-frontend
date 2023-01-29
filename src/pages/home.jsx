import React from "react";
import LotteryContract from "../components/lotteryContract";
import Nav from "../components/navigation";

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <LotteryContract />
    </div>
  );
};

export default Home;
