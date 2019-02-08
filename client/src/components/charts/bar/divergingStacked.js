import React from "react";
import { Bar } from "@nivo/bar";

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

const colorBy = ({ id }) => (id === "lost" ? "#d43c3c" : "#557A95");

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
    ],
  }
];

const DivergingStacked = (props) => {

    return (
        <Bar
            width={600}
            height={400}
            margin={{
                top: 60,
                right: 80,
                bottom: 60,
                left: 80
            }}
            data={[
                {
                map: "RoL",
                won: Math.round((props.data.RoL.wins / (props.data.RoL.wins + props.data.RoL.losses))*100),
                lost: -Math.round((props.data.RoL.losses / (props.data.RoL.wins + props.data.RoL.losses))*100),
                },
                {
                map: "DS",
                won: Math.round((props.data.DS.wins / (props.data.DS.wins + props.data.DS.losses))*100),
                lost: -Math.round((props.data.DS.losses / (props.data.DS.wins + props.data.DS.losses))*100),
                },
                {
                map: "TA",
                won: Math.round((props.data.TA.wins / (props.data.TA.wins + props.data.TA.losses))*100),
                lost: -Math.round((props.data.TA.losses / (props.data.TA.wins + props.data.TA.losses))*100),
                },
                {
                map: "TTP",
                won: Math.round((props.data.TTP.wins / (props.data.TTP.wins + props.data.TTP.losses))*100),
                lost: -Math.round((props.data.TTP.losses / (props.data.TTP.wins + props.data.TTP.losses))*100),
                },
                {
                map: "BRHA",
                won: Math.round((props.data.BRHA.wins / (props.data.BRHA.wins + props.data.BRHA.losses))*100),
                lost: -Math.round((props.data.BRHA.losses / (props.data.BRHA.wins + props.data.BRHA.losses))*100),
                },
                {
                map: "NA",
                won: Math.round((props.data.NA.wins / (props.data.NA.wins + props.data.NA.losses))*100),
                lost: -Math.round((props.data.NA.losses / (props.data.NA.wins + props.data.NA.losses))*100),
                },
                {
                map: "AF",
                won: Math.round((props.data.AF.wins / (props.data.AF.wins + props.data.AF.losses))*100),
                lost: -Math.round((props.data.AF.losses / (props.data.AF.wins + props.data.AF.losses))*100),
                },
                {
                map: "BEA",
                won: Math.round((props.data.BEA.wins / (props.data.BEA.wins + props.data.BEA.losses))*100),
                lost: -Math.round((props.data.BEA.losses / (props.data.BEA.wins + props.data.BEA.losses))*100),
                },
                {
                map: "HP",
                won: Math.round((props.data.HP.wins / (props.data.HP.wins + props.data.HP.losses))*100),
                lost: -Math.round((props.data.HP.losses / (props.data.HP.wins + props.data.HP.losses))*100),
                },
                {
                map: "M",
                won: Math.round((props.data.M.wins / (props.data.M.wins + props.data.M.losses))*100),
                lost: -Math.round((props.data.M.losses / (props.data.M.wins + props.data.M.losses))*100),
                }
            ]}
            indexBy="map"
            keys={[
                'won',
                'lost',
            ]}
            padding={0.4}
            labelTextColor="#ffffff"
            labelSkipWidth={16}
            labelSkipHeight={16}
            minValue={-100} //-(props.data.total/10)}
            maxValue={100} //props.data.total/10}
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
                legendOffset: -40,
                format: v => `${v} %`, // Labels on the axis  || v => `${v} %` to display percent
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
            labelFormat={l => `${l}%`} // Labels on the bar
        />
    );
};

export default DivergingStacked