import * as React from "react";
import ITServices from "./pages/IT/ITServices";
import Home from "./pages/Home";
import { Switch, Route } from "react-router-dom";
import { ConfigProvider, Layout } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const { Header, Footer, Content } = Layout;

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/it">
        <ITServices />
      </Route>
    </Switch>
  );
};

const App = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2969B0",
            fontFamily: "Arial, Helvetica, sans-serif",
            borderRadius: 5,
          },
        }}
      >
        <main className="app-container">
          <Layout>
            <Header style={{ backgroundColor: "#eee", padding: 10, textAlign: "center" }}>
              <Link to="/">
                <img src="/assets/salic-logo.png" width={200} />
              </Link>
            </Header>
            <Content style={{ padding: 10 }}>
              <AppRoutes />
            </Content>
            <Footer style={{ textAlign: "center" }}>SALIC &copy; 2023</Footer>
          </Layout>
        </main>
      </ConfigProvider>
    </div>
  );
};

export default App;
