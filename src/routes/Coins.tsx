import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0 20px;
  margin: 0 auto;
  max-width: 480px;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins({ isDark }: { isDark: boolean }) {
  const { isLoading, data: coins } = useQuery<ICoin[]>("allcoins", fetchCoins);
  /*
  react-query의 useQuery('data Id', fetch function)은 fetch function을 실행 후 isLoading과 data를 반환한다.  #5.9
  또한, react-query는 한번 불러온 데이터를 캐시에 저장해둔다.  #5.9
  */
  /* 
  useQuery 사용전 coins를 fetch로 받아오는 함수
  const [coins, setCoins] = useState<ICoin[]>([]); // <ICoin[]> 배열 state에 type하는 방법  #5.3
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCoins() {
      const response = await (await fetch("https://api.coinpaprika.com/v1/coins")).json();
      setCoins(response.slice(0, 100));
      setLoading(false);
    }
    fetchCoins();
  }, []);
  // useEffect를 사용하여 api data 요청  #5.3
  */
  console.log("Coins.tsx 71", isLoading);
  console.log("Coins.tsx 71", coins);

  return (
    <Container>
      <Header>
        <Title>코인리스트</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} alt="코인 심볼 이미지" />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
/*
JSX에서 조건문 사용할 땐 삼항연산자  #5.3
JSX에서 반복문 사용할 땐 map  #5.2
map의 item에는 key가 있어야한다.  #5.2
<Link>는 새로고침 기능이 없는 a태그의 역할  #5.2
state={{ key:value }}는 react-router-dom의 Link로 state 변수를 같이 전달하는 방법이다. 
useLocation()을 사용하여 state를 사용할 수 있다.  #5.4
*/

export default Coins;
