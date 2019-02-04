import { render } from 'react-dom'
import { ResponsiveLine } from '@nivo/line'


const data = [
    {
        timestamp: 1547732654,
        MMR: 2240,
        EnemyMMR: 2262,
    },
    {
        timestamp: 1547732359,
        MMR: 2282,
        EnemyMMR: 2220,
    },
    {
        timestamp: 1547731914,
        MMR: 2308,
        EnemyMMR: 2326,
    },
    {
        timestamp: 1547731552,
        MMR: 2275,
        EnemyMMR: 2294,
    },
    {
        timestamp: 1547731346,
        MMR: 2244,
        EnemyMMR: 2252,
    },
    {
        timestamp: 1547731100,
        MMR: 2277,
        EnemyMMR: 2258,
    },
    {
        timestamp: 1547730927,
        MMR: 2307,
        EnemyMMR: 2303,
    },
    {
        timestamp: 1547730735,
        MMR: 2330,
        EnemyMMR: 2360,
    },
    {
        timestamp: 1547730424,
        MMR: 2300,
        EnemyMMR: 2305,
    },
    {
        timestamp: 1547729944,
        MMR: 2324,
        EnemyMMR: 2351,
    },
  ];
// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
const MMRLine = () => (
render(
    <div>
    <ResponsiveLine
        data={data}
        margin={{
            "top": 50,
            "right": 110,
            "bottom": 50,
            "left": 60
        }}
        xScale={{
            "type": "point"
        }}
        yScale={{
            "type": "linear",
            "stacked": true,
            "min": "auto",
            "max": "auto"
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "transportation",
            "legendOffset": 36,
            "legendPosition": "middle"
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "count",
            "legendOffset": -40,
            "legendPosition": "middle"
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
            {
                "anchor": "bottom-right",
                "direction": "column",
                "justify": false,
                "translateX": 100,
                "translateY": 0,
                "itemsSpacing": 0,
                "itemDirection": "left-to-right",
                "itemWidth": 80,
                "itemHeight": 20,
                "itemOpacity": 0.75,
                "symbolSize": 12,
                "symbolShape": "circle",
                "symbolBorderColor": "rgba(0, 0, 0, .5)",
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemBackground": "rgba(0, 0, 0, .03)",
                            "itemOpacity": 1
                        }
                    }
                ]
            }
        ]}
    />
    </div>
)
);

export default MMRLine;