import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import AccountInfo from "../components/Avatar";
import { cheerfulFiestaPalette } from "@mui/x-charts";

const Result = () => {
  return (
    <>
      <AccountInfo size={100} />
      <BarChart
        sx={{ width: "100%" }}
        dataset={[
          {
            candidate: "Thomas Winter",
            votes: 10,
          },
          {
            candidate: "Christina Moser",
            votes: 5,
          },
          {
            candidate: "Simon Nenning",
            votes: 2,
          },
          {
            candidate: "Maximilian Nowak",
            votes: 7,
          },
        ]}
        colors={cheerfulFiestaPalette}
        xAxis={[{ dataKey: "candidate", scaleType: 'band' }]}
        series={[{ dataKey: "votes" }]}
        height={300}
      />
      <h1> This is the result statistic page </h1>
    </>
  );
};

export default Result;
