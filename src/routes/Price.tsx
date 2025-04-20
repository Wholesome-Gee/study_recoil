import { log } from "console";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const ATHBox = styled.div`
  border: 1px solid ${(props) => props.theme.textColor};
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const ATHTitle = styled.p`
  margin: 4px 0;
  font-size: 20px;
  color: ${(props) => props.theme.accentColor};
`;
const ATHContents = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
`;
const ATHPrice = styled.p`
  font-size: 32px;
  margin-right: 16px;
`;
const ATHDate = styled.p`
  opacity: 0.5;
`;
const PriceContainer = styled(ATHBox)`
  height: 500px;
  border: none;
  padding: 0;
`;
const PriceInner = styled.div`
  width: 100%;
  display: grid;
  column-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;
const PriceBox = styled(ATHBox)``;
const PriceTitle = styled.p`
  opacity: 0.8;
  margin-bottom: 16px;
`;
const PriceContents = styled(ATHContents)``;
const PricePercent = styled.p`
  font-size: 32px;
`;
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

function Price() {
  const {
    tickersData: {
      quotes: { USD },
    },
  } = useOutletContext<IContext>();
  console.log(USD);
  const date = new Date(USD.ath_date);

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}년 ${month}월 ${day}일 ${hours}시${minutes}분`;
  }

  return (
    <>
      <ATHBox>
        <ATHTitle>역대 최고가</ATHTitle>
        <ATHContents>
          <ATHPrice>${Math.floor(USD.ath_price * 100) / 100}</ATHPrice>
          <ATHDate>{`${formatDate(date)}`}</ATHDate>
        </ATHContents>
      </ATHBox>
      <PriceContainer>
        <PriceInner>
          <PriceBox>
            <PriceTitle>30분전 보다</PriceTitle>
            <PriceContents>
              {USD.percent_change_30m >= 0 ? <PricePercent style={{ color: "red" }}>{`${USD.percent_change_30m}% ▲`}</PricePercent> : <PricePercent style={{ color: "green" }}>{`${USD.percent_change_30m}% ▼`}</PricePercent>}
            </PriceContents>
          </PriceBox>
          <PriceBox>
            <PriceTitle>1시간전 보다</PriceTitle>
            <PriceContents>{USD.percent_change_1h >= 0 ? <PricePercent style={{ color: "red" }}>{`${USD.percent_change_1h}% ▲`}</PricePercent> : <PricePercent style={{ color: "green" }}>{`${USD.percent_change_1h}% ▼`}</PricePercent>}</PriceContents>
          </PriceBox>
          <PriceBox>
            <PriceTitle>6시간전 보다</PriceTitle>
            <PriceContents>{USD.percent_change_6h >= 0 ? <PricePercent style={{ color: "red" }}>{`${USD.percent_change_6h}% ▲`}</PricePercent> : <PricePercent style={{ color: "green" }}>{`${USD.percent_change_6h}% ▼`}</PricePercent>}</PriceContents>
          </PriceBox>
          <PriceBox>
            <PriceTitle>12시간전 보다</PriceTitle>
            <PriceContents>
              {USD.percent_change_12h >= 0 ? <PricePercent style={{ color: "red" }}>{`${USD.percent_change_12h}% ▲`}</PricePercent> : <PricePercent style={{ color: "green" }}>{`${USD.percent_change_12h}% ▼`}</PricePercent>}
            </PriceContents>
          </PriceBox>
          <PriceBox>
            <PriceTitle>1일전 보다</PriceTitle>
            <PriceContents>
              {USD.percent_change_24h >= 0 ? <PricePercent style={{ color: "red" }}>{`${USD.percent_change_24h}% ▲`}</PricePercent> : <PricePercent style={{ color: "green" }}>{`${USD.percent_change_24h}% ▼`}</PricePercent>}
            </PriceContents>
          </PriceBox>
          <PriceBox>
            <PriceTitle>7일전 보다</PriceTitle>
            <PriceContents>{USD.percent_change_7d >= 0 ? <PricePercent style={{ color: "red" }}>{`${USD.percent_change_7d}% ▲`}</PricePercent> : <PricePercent style={{ color: "green" }}>{`${USD.percent_change_7d}% ▼`}</PricePercent>}</PriceContents>
          </PriceBox>
          <PriceBox>
            <PriceTitle>1개월전 보다</PriceTitle>
            <PriceContents>
              {USD.percent_change_30d >= 0 ? <PricePercent style={{ color: "red" }}>{`${USD.percent_change_30d}% ▲`}</PricePercent> : <PricePercent style={{ color: "green" }}>{`${USD.percent_change_30d}% ▼`}</PricePercent>}
            </PriceContents>
          </PriceBox>
          <PriceBox>
            <PriceTitle>1년전 보다</PriceTitle>
            <PriceContents>{USD.percent_change_1y >= 0 ? <PricePercent style={{ color: "red" }}>{`${USD.percent_change_1y}% ▲`}</PricePercent> : <PricePercent style={{ color: "green" }}>{`${USD.percent_change_1y}% ▼`}</PricePercent>}</PriceContents>
          </PriceBox>
        </PriceInner>
      </PriceContainer>
    </>
  );
}

export default Price;
