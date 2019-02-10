import React from "react";
import { Line } from '@nivo/line'

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
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

  const colorBy = ({ id }) => (id === "Enemy MMR" ? "#d43c3c" : "#557A95");

// DATA STRUCTURE FOR MMR LINE:
// const data = [
//     {
//         id: "MMR",
//         data: [
//             {
//                 x: 1547732654,
//                 y: 2240
//             },
//             {
//                 x: 1547732359,
//                 y: 2282
//             },
//             {
//                 x: 1547731914,
//                 y: 2308
//             },
//             {
//                 x: 1547731552,
//                 y: 2275
//             },
//             {
//                 x: 1547731346,
//                 y: 2244
//             },
//             {
//                 x: 1547731100,
//                 y: 2277
//             }
//         ]
//     },
//     {
//         id: "Enemy MMR",
//         data: [
//             {
//                 x: 1547732654,
//                 y: 2262
//             },
//             {
//                 x: 1547732359,
//                 y: 2220
//             },
//             {
//                 x: 1547731914,
//                 y: 2326
//             },
//             {
//                 x: 1547731552,
//                 y: 2294
//             },
//             {
//                 x: 1547731346,
//                 y: 2252
//             },
//             {
//                 x: 1547731100,
//                 y: 2258
//             }
//         ]
//     },
// ];

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
const MMRLine = (props) => {
    console.log(`MMR Line Props:`);
    console.log(props.data.data);
    return(
        <div style={styles}>
            <Line
                data={props.data.data}
                width={600}
                height={400}
                margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
                // axisBottom={{
                //   orient: "bottom",
                //   tickSize: 0,
                //   tickPadding: 10,
                //   tickRotation: 0,
                //   tickValues: [1.1, 2.1, 3.5, 5.5]
                // }}
                axisBottom={{
                    "orient": "bottom",
                    "tickSize": 5,
                    "tickPadding": 5,
                    "tickRotation": 0,
                    "legend": "TIME",
                    "legendOffset": 36,
                    "legendPosition": "middle"
                }}
                xScale={{
                    "type": "point"
                }}
                yScale={{
                    "type": "linear",
                    "min": "auto",
                    "max": "auto"
                }}
                theme={theme}
                colorBy={colorBy}
            />
        </div>
    )
};

export default MMRLine;