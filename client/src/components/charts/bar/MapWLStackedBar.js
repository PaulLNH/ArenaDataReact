import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
// import { generateCountriesData } from '@nivo/generators'
// import { colors } from '../../constants'

const colors = ['#fae04d', '#ff744c', '#789792', '#b1646a', '#efa9a1', '#8470c7', '#97a66f'];

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
      "loss": 120,
      "wins": 193,
    },
    {
      "map": "DS",
      "loss": 35,
      "wins": 160,
    },
    {
      "map": "TA",
      "loss": 33,
      "wins": 120,
    },
    {
      "map": "TTP",
      "loss": 27,
      "wins": 3,
    },
    {
      "map": "BRH",
      "loss": 199,
      "wins": 19,
    },
    {
      "map": "NA",
      "loss": 117,
      "wins": 107,
    },
    {
      "map": "AF",
      "loss": 195,
      "wins": 156,
    },
    {
      "map": "BEA",
      "loss": 195,
      "wins": 156,
    },
    {
      "map": "HP",
      "loss": 195,
      "wins": 156,
    },
    {
      "map": "M",
      "loss": 195,
      "wins": 156,
    }
  ]

const Bar = () => (
        <ResponsiveBar
            data={data}
            keys={[
                "loss",
                "wins",
            ]}
            indexBy="map"
            margin={{
                "top": 50,
                "right": 130,
                "bottom": 50,
                "left": 60
            }}
            padding={0.3}
            colors="nivo"
            colorBy="id"
            borderColor="inherit:darker(1.6)"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "map",
                "legendPosition": "middle",
                "legendOffset": 32
            }}
            axisLeft={{
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "food",
                "legendPosition": "middle",
                "legendOffset": -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
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