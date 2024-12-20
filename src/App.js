import "./App.css";
import { isMobile } from "react-device-detect";
import MobileRouting from "./Routing/MobileRouting";
import DekstopAdmin from "./Routing/DekstopAdmin";

function App() {
  return (
    <div className="App">{isMobile ? <MobileRouting /> : <DekstopAdmin />}</div>
  );
}

export default App;
