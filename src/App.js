import {
  Stars,
  InterativeParticle,
  InfiniteScroll,
  Ascii,
  SurfaceSampling,
} from "./three";
import Plz from "./three/interativeParticle/plz";
import { GlobalStyle } from "./styles/styles";

function App() {
  return (
    <>
      <GlobalStyle />
      <SurfaceSampling />
    </>
  );
}

export default App;
