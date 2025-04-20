const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}
export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}
export function fetchCoinHistory(coinId: string) {
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`).then((response) => response.json());
}
// api fetch 함수는 component와 분리해서 사용하는 습관을 들이자  #5.9
