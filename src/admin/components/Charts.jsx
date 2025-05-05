import React from "react";
import StatusChart from "./charts/StatusChart";

const Charts = () => {
  return (
    <div id="charts" class="flex flex-row w-full gap-2.5 justify-start content-start flex-wrap mb-8">
      <div class="chart h-auto max-w-[300px] flex-[0_1_300px]">
        <StatusChart/>
      </div>
    </div>
  );
};

export default Charts;
