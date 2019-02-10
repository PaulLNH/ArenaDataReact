import React from "react";
import { Line } from '@nivo/line'

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };

// const data = [
//     {
//         timestamp: 1547732654,
//         MMR: 2240,
//         EnemyMMR: 2262,
//     },
//     {
//         timestamp: 1547732359,
//         MMR: 2282,
//         EnemyMMR: 2220,
//     },
//     {
//         timestamp: 1547731914,
//         MMR: 2308,
//         EnemyMMR: 2326,
//     },
//     {
//         timestamp: 1547731552,
//         MMR: 2275,
//         EnemyMMR: 2294,
//     },
//     {
//         timestamp: 1547731346,
//         MMR: 2244,
//         EnemyMMR: 2252,
//     },
//     {
//         timestamp: 1547731100,
//         MMR: 2277,
//         EnemyMMR: 2258,
//     },
//     {
//         timestamp: 1547730927,
//         MMR: 2307,
//         EnemyMMR: 2303,
//     },
//     {
//         timestamp: 1547730735,
//         MMR: 2330,
//         EnemyMMR: 2360,
//     },
//     {
//         timestamp: 1547730424,
//         MMR: 2300,
//         EnemyMMR: 2305,
//     },
//     {
//         timestamp: 1547729944,
//         MMR: 2324,
//         EnemyMMR: 2351,
//     },
//   ];

//   const data = [
//     {
//       id: "MMR",
//       data: [
//         {
//           timestamp: 1547732654,
//           MMR: 2240
//         },
//         {
//           timestamp: 1547732359,
//           MMR: 2282
//         },
//         {
//           timestamp: 1547731914,
//           MMR: 2308
//         },
//         {
//           timestamp: 1547731552,
//           MMR: 2275
//         },
//         {
//           timestamp: 1547731346,
//           MMR: 2244
//         },
//         {
//           timestamp: 1547731100,
//           MMR: 2277
//         }
//       ]
//     },
//     {
//         id: "EnemyMMR",
//         data: [
//           {
//             timestamp: 1547732654,
//             EnemyMMR: 2262
//           },
//           {
//             timestamp: 1547732359,
//             EnemyMMR: 2220
//           },
//           {
//             timestamp: 1547731914,
//             EnemyMMR: 2326
//           },
//           {
//             timestamp: 1547731552,
//             EnemyMMR: 2294
//           },
//           {
//             timestamp: 1547731346,
//             EnemyMMR: 2252
//           },
//           {
//             timestamp: 1547731100,
//             EnemyMMR: 2258
//           }
//         ]
//       },
//   ];

const data = [
        {
          id: "MMR",
          data: [
            {
              x: 1547732654,
              y: 2240
            },
            {
              x: 1547732359,
              y: 2282
            },
            {
              x: 1547731914,
              y: 2308
            },
            {
              x: 1547731552,
              y: 2275
            },
            {
              x: 1547731346,
              y: 2244
            },
            {
              x: 1547731100,
              y: 2277
            }
          ]
        },
        {
            id: "Enemy MMR",
            data: [
              {
                x: 1547732654,
                y: 2262
              },
              {
                x: 1547732359,
                y: 2220
              },
              {
                x: 1547731914,
                y: 2326
              },
              {
                x: 1547731552,
                y: 2294
              },
              {
                x: 1547731346,
                y: 2252
              },
              {
                x: 1547731100,
                y: 2258
              }
            ]
          },
      ];

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
const MMRLine = (props) => {
    console.log(`MMR Line Props:`);
    // console.log(props.data.data);
    return(
        <div style={styles}>
            <Line
                data={data}
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
                    "legend": "transportation",
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
            />
        </div>
    )
};

export default MMRLine;