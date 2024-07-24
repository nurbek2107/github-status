import React from "react";
import Chart from "react-apexcharts";

const RepoChart = ({ data }) => {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: data.map((repo) => repo.name),
    },
  };

  const series = [
    {
      name: "Stars",
      data: data.map((repo) => repo.stargazers_count),
    },
  ];

  return (
    <div className="bg-base-100 rounded-xl shadow-xl text-white ">
      <div className="row">
        <div className="mixed-chart ">
          <Chart options={options} series={series} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
};

export default RepoChart;
