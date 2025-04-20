import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts"; // npm i --save react-apexcharts apexcharts  #5.13
import { Helmet } from "react-helmet";
import { useState } from "react";
import styled from "styled-components";

const ChartBox = styled.div`
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 10px 0px;
  margin-bottom: 20px;
`;
const ChartHeader = styled.div`
  display: flex;
  justify-content: center;
`;
const ChartTitle = styled.p`
  background-color: ${(props) => props.theme.boxColor};
  padding: 4px 8px;
  border-radius: 16px;
`;
interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
interface IContext {
  coinId: string;
  tickersData: {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_15m: number;
        percent_change_30m: number;
        percent_change_1h: number;
        percent_change_6h: number;
        percent_change_12h: number;
        percent_change_24h: number;
        percent_change_7d: number;
        percent_change_30d: number;
        percent_change_1y: number;
        ath_price: number;
        ath_date: string;
        percent_from_price_ath: number;
      };
    };
  };
}
function Chart() {
  const { coinId } = useOutletContext<IContext>();
  const { isLoading, data } = useQuery<IData[]>("ohlcv", () => fetchCoinHistory(coinId), { refetchInterval: 10000 });
  /*
  useOutletContext()는 상위 component로부터 nested route component에게 전달된 props(context)를 확인하는 방법  #5.12 'salt01' 댓글 참고
  useQuery()의 3번째 parameter인 {refetchInterval:10000}은 10000ms마다 refetch를 시도한다  #5.15
  */
  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ChartBox>
            <ChartHeader>
              <ChartTitle>일별 종가 차트</ChartTitle>
            </ChartHeader>
            <ApexChart
              type="line"
              series={[
                {
                  name: "Price",
                  data: data?.map((price) => parseFloat(price.close)) ?? [],
                },
              ]}
              options={{
                theme: {
                  mode: "dark",
                },
                chart: {
                  height: 300,
                  width: 500,
                  toolbar: {
                    show: false,
                  },
                  background: "transparent",
                },
                grid: { show: false },
                stroke: {
                  curve: "smooth",
                  width: 4,
                },
                yaxis: {
                  show: false,
                },
                xaxis: {
                  axisBorder: { show: false },
                  axisTicks: { show: false },
                  labels: { show: false },
                  type: "datetime",
                  categories: data?.map((price) => price.time_close * 1000),
                },
                fill: {
                  type: "gradient",
                  gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                },
                colors: ["#0fbcf9"],
                tooltip: {
                  y: {
                    formatter: (value) => `$${value.toFixed(2)}`,
                  },
                },
              }}
            />
          </ChartBox>
          <ChartBox>
            <ChartHeader>
              <ChartTitle>일별 시작가,최고가,최저가,종가 차트</ChartTitle>
            </ChartHeader>
            <ApexChart
              type="candlestick"
              series={[
                {
                  data:
                    data?.map((item) => {
                      return {
                        x: new Date(item.time_close * 1000).toString().slice(4, 10),
                        y: [parseFloat(item.open), parseFloat(item.high), parseFloat(item.low), parseFloat(item.close)],
                      };
                    }) ?? [],
                },
              ]}
              options={{
                theme: {
                  mode: "dark",
                },
                chart: {
                  width: 500,
                  height: 350,
                  background: "transparent",
                  toolbar: {
                    show: false,
                  },
                },
                fill: {
                  type: "solid",
                },
                xaxis: {
                  labels: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
              }}
            />
          </ChartBox>
        </>
      )}
    </>
  );
}

export default Chart;
