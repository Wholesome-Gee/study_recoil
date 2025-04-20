import { Outlet, useLocation, useMatch, useParams } from "react-router";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet"; // npm i react-helmet,  npm i --save-dev @types/react-helmet  #5.15

const Title = styled.h1`
  font-size: 36px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const HomeButton = styled.button`
  border: none;
  outline: none;
  font-size: 30px;
  font-weight: 800;
  background-color: inherit;
  color: ${(props) => props.theme.accentColor};
  position: absolute;
  left: 20px;
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.boxColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    padding: 7px 0;
    display: block;
  }
`;

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}
interface ITickersData {
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
}
/*
object의 많은 properties를 개발자도구를 활용해 쉽게 type하는 방법  #5.6
*/

function Coin() {
  const { state } = useLocation();
  const { coinId } = useParams();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: isInfoLoading, data: infoData } = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const { isLoading: isTickersLoading, data: tickersData } = useQuery<ITickersData>(["tickers", coinId], () => fetchCoinTickers(coinId));
  let loading = isInfoLoading || isTickersLoading;

  /*
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfo>();
  const [priceInfo, setPriceInfo] = useState<IPriceInfo>();
  
  useLocation()은 react-router-dom의 Link로부터 넘어온 URL의 정보를 제공한다. (pathname, state, search, hash, key 등)  #5.4
  useParams()는 react-router-dom의 route로부터 넘어온 URL Parameter를 제공한다. (ex. path=/:coinId )  #5.0
  useRouteMatch(url)은 현재 유저가 url에 위치하고 있다면 Object를, 아니라면 null을 반환한다.  #5.8
  */
  console.log("Coin.tsx 37", useLocation());
  console.log("Coin.tsx 38", useParams());
  console.log("Coin.tsx 39", priceMatch);

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <HomeButton>
          <Link to={"/"}>←</Link>
        </HomeButton>
        <Title>코인: {state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>순위:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>심볼:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>출시일:</span>
              <span>{infoData?.started_at?.slice(0, 10)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>총 공급량:</span>
              <span>{`${tickersData?.total_supply} ${infoData?.symbol}`}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최대 공급량:</span>
              <span>{`${tickersData?.max_supply} ${infoData?.symbol}`}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId, tickersData }} />
        </>
      )}
    </Container>
  );
}
/*
<Helmet>은 html의 <head>에 전달되는 내용들이다.  #5.15
<Outlet>은 Router.tsx에 지정한 nested router들이 들어올 공간이다.  #5.7 'horrorkist 댓글 참고
<Outlet>은 context를 통하여 nested route component에게 props(context)를 전달할 수 있다.  #5.12 'salt01' 댓글 참고
*/

export default Coin;
