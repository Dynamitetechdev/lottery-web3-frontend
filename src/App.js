import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Home from "./pages/home";
function App() {
  return (
    <div className="App">
      <MoralisProvider initializeOnMount={false}>
        <NotificationProvider>
          <Home />
        </NotificationProvider>
      </MoralisProvider>
    </div>
  );
}

export default App;
