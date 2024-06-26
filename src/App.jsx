import { useEffect, useMemo } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import AppRoutes from "./AppRoutes";
import { Router } from "react-router-dom";
import { initNavigator, SDKProvider as TMASDKProvider } from "@tma.js/sdk-react";
import { useIntegration } from "@tma.js/react-router-integration";

export const manifestFile = "https://raw.githubusercontent.com/real-og/traction-eye-bot/master/tonconnect-manifest.json";

function App() {
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNav] = useIntegration(navigator);

  useEffect(() => {
    if (import.meta.env.PROD) navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <TMASDKProvider acceptCustomStyles debug>
      <TonConnectUIProvider manifestUrl={manifestFile} actionsConfiguration={{ twaReturnUrl: "https://defendant-mason-hide-microphone.trycloudflare.com/" }}>
        <Router location={location} navigator={reactNav}>
          <AppRoutes />
        </Router>
      </TonConnectUIProvider>
    </TMASDKProvider>
  );
}

export default App;
