import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryLabel,
  VictoryTooltip,
  VictoryScatter,
} from "victory";
import { monthlyPatient, monthlyYoutube } from "../../data/data1";

export function PatientAndViewsChart() {
  return (
    <>
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        height={250}
      >
        {/* x축 */}
        <VictoryAxis
          tickFormat={monthlyYoutube.map(m => `${m.month}`)}
          tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
        />
        {/* y축 */}
        <VictoryAxis
          dependentAxis
          tickFormat={x => `${x / 1000000}M`}
          orientation="left"
        />
        {/* 그래프  라벨 */}
        <VictoryLabel
          x={0}
          y={35}
          text={"인기동영상 조회수(백만)"}
          style={[{ fontSize: 8, fontFamily: "paybooc-Medium" }]}
        />
        <VictoryLabel
          x={250}
          y={30}
          text={"인기동영상 조회수"}
          backgroundStyle={[{ fill: "red", opacity: 0.2 }]}
          textAnchor="start"
          backgroundPadding={[{ left: 5, right: 40, top: 3 }]}
        />
        <VictoryLabel
          x={298}
          y={50}
          text={"확진자 수"}
          backgroundStyle={[{ fill: "purple", opacity: 0.2 }]}
          textAnchor="start"
          backgroundPadding={[{ left: 5, right: 20, top: 3 }]}
        />

        {/* 확진자 수 차트 */}

        <VictoryBar
          data={monthlyPatient}
          x="monthly"
          y={datum => datum.patient * 1.2}
          labels={({ datum }) => datum.patient / 100 + "명"}
          labelComponent={<VictoryTooltip />}
          style={{
            data: {
              fill: "#b979b7",
            },
          }}
        />

        {/* 유튜브 조회수 차트 */}
        <VictoryLine
          data={monthlyYoutube}
          x="monthy"
          y="Avg_view_count"
          labels={({ datum }) => Math.floor(datum.Avg_view_count) / 10}
          labelComponent={<VictoryTooltip />}
          style={{ data: { stroke: "#f8a0a0", strokeWidth: 3 } }}
        />
        <VictoryScatter
          data={monthlyYoutube}
          x="qoo"
          y={"Avg_view_count"}
          size={2.5}
          style={{ data: { fill: "#8e0b0b" } }}
          labels={monthlyYoutube.map(x => `${Math.floor(x.Avg_view_count)}회`)}
          labelComponent={<VictoryTooltip renderInPortal />}
        />
      </VictoryChart>
    </>
  );
}
