import React from 'react'
import { Bar } from '@nivo/bar'
// import { generateCountriesData } from '@nivo/generators'
// import { colors } from '../../constants'

/**
 * @Fix https://github.com/plouc/nivo/issues/443
 * @Example https://codesandbox.io/s/000mv35lxn
 * @Suggestion https://nivo.rocks/storybook/?selectedKind=Bar&selectedStory=diverging%20stacked&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs
 */

// 572 code for RoL
// 617 code for DS
// 980 code for TA
// 1134 code for TTP
// 1504 code for BRHA
// 1505 code for NA
// 1552 code for AF
// 1672 code for BEA
// 1825 code for HP
// 1911 code for M

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
  
  const data = [
    {
      map: "RoL",
      wins: 120,
      loss: 193
    },
    {
      map: "DS",
      wins: 35,
      loss: 160
    },
    {
      map: "TA",
      wins: 33,
      loss: 120
    },
    {
      map: "TTP",
      wins: 27,
      loss: 3
    },
    {
      map: "BRH",
      wins: 199,
      loss: 19
    },
    {
      map: "NA",
      wins: 117,
      loss: 107
    },
    {
      map: "AF",
      wins: 195,
      loss: 156
    },
    {
      map: "BEA",
      wins: 195,
      loss: 156
    },
    {
      map: "HP",
      wins: 195,
      loss: 156
    },
    {
      map: "M",
      wins: 195,
      loss: 156
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
  
  const colorBy = ({ id }) => (id === "loss" ? "#d43c3c" : "#0e843d");
  
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
  
  const MapWLStackedBar = () => (
    <div style={styles}>
      <Bar
        width={600}
        height={400}
        margin={{ top: 60, right: 120, bottom: 60, left: 80 }}
        data={data}
        keys={["wins", "loss"]}
        indexBy="map"
        // labelTextColor="inherit:darker(2.4)"
        labelTextColor="#ffffff"
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableGridX={false}
        axisBottom={axisBottom}
        axisLeft={axisLeft}
        colorBy={colorBy}
        theme={theme}
        legends={legends}
      />
    </div>
  );
  
  export default MapWLStackedBar