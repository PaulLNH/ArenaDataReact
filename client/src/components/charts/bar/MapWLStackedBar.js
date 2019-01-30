import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
// import { generateCountriesData } from '@nivo/generators'
// import { colors } from '../../constants'

/**
 * @Fix https://github.com/plouc/nivo/issues/443
 * @Example https://codesandbox.io/s/000mv35lxn
 * @Suggestion https://nivo.rocks/storybook/?selectedKind=Bar&selectedStory=diverging%20stacked&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs
 */

// const colors = ['#fae04d', '#ff744c', '#789792', '#b1646a', '#efa9a1', '#8470c7', '#97a66f'];

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

const data = [
    {
      "map": "RoL",
      "wins": 120,
      "loss": 193,
    },
    {
      "map": "DS",
      "wins": 35,
      "loss": 160,
    },
    {
      "map": "TA",
      "wins": 33,
      "loss": 120,
    },
    {
      "map": "TTP",
      "wins": 27,
      "loss": 3,
    },
    {
      "map": "BRH",
      "wins": 199,
      "loss": 19,
    },
    {
      "map": "NA",
      "wins": 117,
      "loss": 107,
    },
    {
      "map": "AF",
      "wins": 195,
      "loss": 156,
    },
    {
      "map": "BEA",
      "wins": 195,
      "loss": 156,
    },
    {
      "map": "HP",
      "wins": 195,
      "loss": 156,
    },
    {
      "map": "M",
      "wins": 195,
      "loss": 156,
    }
  ]

const Bar = () => (
        <ResponsiveBar
            data={data}
            keys={[
                "wins",
                "loss",
            ]}
            indexBy="map"
            margin={{
                "top": 50,
                "right": 130,
                "bottom": 50,
                "left": 60
            }}
            padding={0.3}
            colors="dark2"
            colorBy="id"
            borderColor="inherit:darker(1.6)"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "Map",
                "legendPosition": "middle",
                "legendOffset": 32,
            }}
            axisLeft={{
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "Wins / Loss",
                "legendPosition": "middle",
                "legendOffset": -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            // labelTextColor="inherit:darker(1.6)"
            labelTextColor="#ffffff"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            theme={{
                axis: {
                //   textColor: '#ffffff',
                  fontSize: '14px',
                  tickColor: '#eee',
                  ticks: {
                    line: {
                      stroke: "gray"
                    },
                    text: {
                      fill: "#ffffff",
                    //   color: "#ffffff",
                    },
                  },
                },
                // grid: {
                //   line: {
                //     stroke: "white",
                //     strokeWidth: 2,
                //     strokeDasharray: "4 4"
                //   }
                // }
              }}
            legends={[
                {
                    "dataFrom": "keys",
                    "anchor": "bottom-right",
                    "direction": "column",
                    "justify": false,
                    "translateX": 120,
                    "translateY": 0,
                    "itemsSpacing": 2,
                    "itemWidth": 100,
                    "itemHeight": 20,
                    "itemDirection": "left-to-right",
                    "itemOpacity": 0.85,
                    "itemTextColor": '#ffffff',
                    "symbolSize": 20,
                    "effects": [
                        {
                            "on": "hover",
                            "style": {
                                "itemOpacity": 1
                            }
                        }
                    ]
                }
            ]}
        />
)

export default Bar