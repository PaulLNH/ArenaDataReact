import React from "react";
import { Bar } from "@nivo/bar";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const data = [
  {
    map: "RoL",
    won: 38,
    lost: -62
  },
  {
    map: "DS",
    won: 18,
    lost: -82
  },
  {
    map: "TA",
    won: 33,
    lost: -77
  },
  {
    map: "TTP",
    won: 98,
    lost: -2
  },
  {
    map: "BRH",
    won: 81,
    lost: -19
  },
  {
    map: "NA",
    won: 52,
    lost: -48
  },
  {
    map: "AF",
    won: 56,
    lost: -44
  },
  {
    map: "BEA",
    won: 82,
    lost: -18
  },
  {
    map: "HP",
    won: 62,
    lost: -38
  },
  {
    map: "M",
    won: 58,
    lost: -42
  }
];

const axisBottom = {
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: "Map",
  legendPosition: "middle",
  legendOffset: 32
};

const axisLeft = {
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: "Wins / Loss",
  legendPosition: "middle",
  legendOffset: -40
};

const theme = {
  background: "#303030",
  axis: {
    fontSize: "14px",
    tickColor: "#eee",
    ticks: {
      line: {
        stroke: "#555555"
      },
      text: {
        fill: "#ffffff"
      }
    },
    legend: {
      text: {
        fill: "#aaaaaa"
      }
    }
  },
  grid: {
    line: {
      stroke: "#555555"
    }
  }
};

const colorBy = ({ id }) => (id === "lost" ? "#d43c3c" : "#0e843d");

const legends = [
  {
    dataFrom: "keys",
    anchor: "bottom-right",
    direction: "column",
    justify: false,
    translateX: 120,
    translateY: 0,
    itemsSpacing: 2,
    itemWidth: 100,
    itemHeight: 20,
    itemDirection: "left-to-right",
    itemOpacity: 0.85,
    itemTextColor: "#ffffff",
    symbolSize: 20,
    effects: [
      {
        on: "hover",
        style: {
          itemOpacity: 1
        }
      }
    ]
  }
];

const DivergingStacked = () => (
    <Bar
        width={600}
        height={400}
        margin={{
            top: 60,
            right: 80,
            bottom: 60,
            left: 80
        }}
        data={data}
        indexBy="map"
        keys={[
            'won',
            'lost',
        ]}
        padding={0.4}
        labelTextColor="#ffffff"
        labelSkipWidth={16}
        labelSkipHeight={16}
        minValue={-100}
        maxValue={100}
        enableGridX
        enableGridY
        // label={label}
        axisTop={{tickSize: 0,tickPadding: 12}}
        axisBottom={{
            legend: 'MAPS',
            legendPosition: 'middle',
            legendOffset: 55,
            tickSize: 0,
            tickPadding: 12
        }}
        axisLeft={{    
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Wins / Loss",
            legendPosition: "middle",
            legendOffset: 40,
            format: v => `${v} %`,    
        }}
        axisRight={null}
        markers={[{
            axis: 'y',
            value: 0,
            lineStyle: {strokeOpacity: 0},
            },{
            axis: 'y',
            value: 0,
            lineStyle: {stroke: '#f47560',strokeWidth: 1},
            }]}
        colorBy={colorBy}
        // colors={[
        //     '#0e843d',
        //     '#d43c3c',
        // ]}
        theme={theme}
        legends={legends}
        labelFormat={l => `${l}%`}
    />
);

export default DivergingStacked