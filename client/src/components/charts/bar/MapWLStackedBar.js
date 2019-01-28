import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { generateCountriesData } from '@nivo/generators'
// import { colors } from '../../constants'

const colors = ['#fae04d', '#ff744c', '#789792', '#b1646a', '#efa9a1', '#8470c7', '#97a66f']

const data = [
    {
      "country": "AD",
      "hot dog": 80,
      "hot dogColor": "hsl(61, 70%, 50%)",
      "burger": 120,
      "burgerColor": "hsl(218, 70%, 50%)",
      "sandwich": 91,
      "sandwichColor": "hsl(127, 70%, 50%)",
      "kebab": 135,
      "kebabColor": "hsl(12, 70%, 50%)",
      "fries": 193,
      "friesColor": "hsl(252, 70%, 50%)",
      "donut": 196,
      "donutColor": "hsl(251, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 96,
      "hot dogColor": "hsl(257, 70%, 50%)",
      "burger": 35,
      "burgerColor": "hsl(353, 70%, 50%)",
      "sandwich": 182,
      "sandwichColor": "hsl(32, 70%, 50%)",
      "kebab": 143,
      "kebabColor": "hsl(168, 70%, 50%)",
      "fries": 160,
      "friesColor": "hsl(174, 70%, 50%)",
      "donut": 44,
      "donutColor": "hsl(144, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 61,
      "hot dogColor": "hsl(274, 70%, 50%)",
      "burger": 33,
      "burgerColor": "hsl(330, 70%, 50%)",
      "sandwich": 149,
      "sandwichColor": "hsl(223, 70%, 50%)",
      "kebab": 21,
      "kebabColor": "hsl(343, 70%, 50%)",
      "fries": 120,
      "friesColor": "hsl(32, 70%, 50%)",
      "donut": 27,
      "donutColor": "hsl(332, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 74,
      "hot dogColor": "hsl(98, 70%, 50%)",
      "burger": 27,
      "burgerColor": "hsl(103, 70%, 50%)",
      "sandwich": 95,
      "sandwichColor": "hsl(19, 70%, 50%)",
      "kebab": 103,
      "kebabColor": "hsl(321, 70%, 50%)",
      "fries": 3,
      "friesColor": "hsl(291, 70%, 50%)",
      "donut": 119,
      "donutColor": "hsl(119, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 150,
      "hot dogColor": "hsl(317, 70%, 50%)",
      "burger": 199,
      "burgerColor": "hsl(104, 70%, 50%)",
      "sandwich": 38,
      "sandwichColor": "hsl(126, 70%, 50%)",
      "kebab": 27,
      "kebabColor": "hsl(62, 70%, 50%)",
      "fries": 19,
      "friesColor": "hsl(70, 70%, 50%)",
      "donut": 86,
      "donutColor": "hsl(119, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 87,
      "hot dogColor": "hsl(11, 70%, 50%)",
      "burger": 117,
      "burgerColor": "hsl(294, 70%, 50%)",
      "sandwich": 111,
      "sandwichColor": "hsl(266, 70%, 50%)",
      "kebab": 142,
      "kebabColor": "hsl(353, 70%, 50%)",
      "fries": 107,
      "friesColor": "hsl(96, 70%, 50%)",
      "donut": 112,
      "donutColor": "hsl(295, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 160,
      "hot dogColor": "hsl(344, 70%, 50%)",
      "burger": 195,
      "burgerColor": "hsl(25, 70%, 50%)",
      "sandwich": 41,
      "sandwichColor": "hsl(220, 70%, 50%)",
      "kebab": 62,
      "kebabColor": "hsl(180, 70%, 50%)",
      "fries": 156,
      "friesColor": "hsl(224, 70%, 50%)",
      "donut": 178,
      "donutColor": "hsl(199, 70%, 50%)"
    }
  ]

const Bar = () => (
    <div>
        <ResponsiveBar
            margin={{
                top: 1.5,
                right: 10,
                bottom: 1.5,
                left: 1.5,
            }}
            padding={0.2}
            data={generateCountriesData(['rock', 'jazz', 'hip-hop', 'reggae', 'folk'], { size: 9 })}
            indexBy="country"
            enableGridX={true}
            enableGridY={true}
            keys={['rock', 'jazz', 'hip-hop', 'reggae', 'folk']}
            colors={colors}
            axisBottom={null}
            axisLeft={null}
            borderWidth={3}
            borderColor="#000"
            enableLabel={true}
            labelSkipHeight={24}
            isInteractive={false}
            animate={true}
        />
        <div className="Title">BAR</div>
    </div>
)

export default Bar