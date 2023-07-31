import * as React from "react";
import Home from "./pages/Home";
import ITServices from "./pages/IT/ItServices";
import NewRequestItService from "./pages/IT/Services/NewRequest";
import RequestsAssigned from "./pages/IT/Services/RequestsAssigned";
import { Switch, Route } from "react-router-dom";
import { Button, ConfigProvider, Layout } from "antd";
import { Link } from "react-router-dom";
import { AuthData } from "./AuthWrapper";
const { Header, Footer, Content } = Layout;
import "./taskpane.css";

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/it">
        <ITServices />
      </Route>
      <Route exact path="/it/create-request">
        <NewRequestItService />
      </Route>
      <Route exact path="/it/requests-assigned">
        <RequestsAssigned />
      </Route>
    </Switch>
  );
};

const App = () => {
  const { user, logout } = AuthData();
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0C508C",
            fontFamily: "Arial, Helvetica, sans-serif",
            borderRadius: 5,
          },
        }}
      >
        <main className="app-container">
          <img src={"../../assets/world-shape.svg"} className="world-img-bg" />
          <Layout style={{ minHeight: "100vh", position: "relative", backgroundColor: "transparent" }}>
            <Header style={{ backgroundColor: "#f4f4f4", padding: 10, textAlign: "center" }}>
              <Link to="/">
                <img src="/assets/salic-logo.png" width={200} />
              </Link>
            </Header>
            <Content style={{ padding: 12, backgroundColor: "transparent" }}>
              <AppRoutes />
            </Content>
            <Footer
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" }}
            >
              <span>{user.user.displayName}</span>
              <Button type="link" danger onClick={logout}>
                Logout
              </Button>
            </Footer>
          </Layout>
        </main>
      </ConfigProvider>
    </div>
  );
};

export default App;
