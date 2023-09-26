import * as React from "react";
import { Button } from "antd";
import axios from "axios";
import jwtDecode from "jwt-decode";
import App from "./App";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "/assets/Salic_centered_logo-01.png";

const apiUrl = "https://salicapi.com/api";
// const apiUrl = "https://dev.salic.com/api";
// const deployment_url = "https://localhost:3000";
const deployment_url = "https://addin.salic.com";

const AuthContext = React.createContext();
export const AuthData = () => React.useContext(AuthContext);

const AuthWrapper = () => {
  const [user, setUser] = React.useState({ user: null, isAuthenticated: false, token: null });
  const [loading, setLoading] = React.useState(false);
  const [isRedirectPage, setIsRedirectPage] = React.useState(false);

  const login = async () => {
    let dialog;
    Office.context.ui.displayDialogAsync(
      `https://login.microsoftonline.com/bea1b417-4237-40b8-b020-57fce9abdb43/oauth2/v2.0/authorize?client_id=7226099e-6a81-415c-9cb4-99be43745d3a&response_type=code&redirect_uri=${deployment_url}/taskpane.html&response_mode=query&scope=user.read%20Sites.Read.All&state=12345`,
      { height: 90, width: 50 },
      function (asyncResult) {
        dialog = asyncResult.value;
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, async (arg) => {
          dialog.close();
          const tokenResponse = arg.message;
          if (tokenResponse === "false") {
            return;
          }
          const parseToken = JSON.parse(tokenResponse);
          const token = parseToken.access_token;
          setAuthToken(token);
        });
      }
    );
  };

  const fetchAccessToken = async (code) => {
    const payload = {
      code: code,
      redirect_uri: `${deployment_url}/taskpane.html`,
      client_id: "7226099e-6a81-415c-9cb4-99be43745d3a",
      url: "https://login.microsoftonline.com/bea1b417-4237-40b8-b020-57fce9abdb43/oauth2/v2.0/token",
      scope: "User.Read Sites.Read.All",
      // scope: "User.Read User.Read.All User.ReadBasic.All Sites.Read.All GroupMember.Read.All Group.Read.All Directory.Read.All",
      client_secret: "Tds8Q~dvuLiqQIyMZ~4birzcMl_TEnlPIvgCxc85",
    };
    const res = await axios.post(`https://salicapi.com/api/user/GetAccessToken`, payload);
    return res;
  };

  const setAuthToken = async (token) => {
    setLoading(true);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("salic-addin-auth-token", token);
      const currentuser = await axios.get("https://graph.microsoft.com/v1.0/me");
      // currentuser.data.mail = "akmal.eldahdouh@salic.com";
      // currentuser.data.displayName = "Akmal Eldahdouh";
      setUser({ user: currentuser.data, isAuthenticated: true, token: token });
      setLoading(false);
      return;
    }
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("salic-addin-auth-token");
    setUser({ user: null, isAuthenticated: false, token: null });
    setLoading(false);
  };

  const getCurrentUser = () => {
    const token = localStorage.getItem("salic-addin-auth-token");
    console.log("token: ", token);
    if (!token) return null;
    return jwtDecode(token);
  };

  const logout = () => {
    setUser({ user: null, isAuthenticated: false, token: null });
    setAuthToken(false);
  };

  React.useEffect(() => {
    const userLoggedIn = getCurrentUser();
    if (userLoggedIn) {
      const token = localStorage.getItem("salic-addin-auth-token");
      const parseToken = jwtDecode(token);
      const isvalid = parseToken.exp > Date.now() / 1000;
      if (!isvalid) {
        logout();
        return;
      }
      setAuthToken(token);
    } else {
      login();
    }
  }, []);

  React.useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setIsRedirectPage(true);
      const token = await fetchAccessToken(code);
      Office.context.ui.messageParent(token.data?.token || false.toString());
    }
  }, []);

  if (loading) {
    return <div className="app-loader"></div>;
  }
  if (isRedirectPage) {
    return (
      <h1 style={{ textAlign: "center", padding: "50px 0 0" }}>
        <LoadingOutlined /> Redirecting...
      </h1>
    );
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, apiUrl }}>
      {user.isAuthenticated ? (
        <App />
      ) : (
        <div
          style={{
            padding: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <img src={logo} width={100} />
          <Button type="primary" size="large" onClick={login} style={{ borderRadius: 4 }}>
            Sign In
          </Button>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
