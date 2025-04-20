// react-router-dom으로 route설정하기  #5.0
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

function Router({ isDark }: { isDark: boolean }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/" element={<Coins isDark={isDark} />} />
      </Routes>
    </BrowserRouter>
  );
}
/*
10. path="/:coinId" 는 url에서 coinId라는 parameter를 받을 수 있고, Component에서 useParams로 parameter를 받을 수 있다.  #5.0
Route내부에 Route를 쓴것을 nested route라고 한다. /:coinId/chart 와 같다.  #5.7 'horrorkist' 댓글참고
*/
export default Router;
