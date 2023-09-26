import * as React from "react";
import Home from "./pages/Home";
import ITServices from "./pages/IT/ItServices";
import NewItServiceRequest from "./pages/IT/Services/CreateRequest/NewRequest";
import ForwardItServiceRequest from "./pages/IT/Services/CreateRequest/ForwardEmail";
import PreviewReuqest from "./pages/IT/Services/PreviewReuqest";
import RequestsAssigned from "./pages/IT/Services/RequestsAssigned";
import { Switch, Route, useHistory } from "react-router-dom";
import { Avatar, Button, Image, Layout, Popover, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthData } from "./AuthWrapper";
import "./taskpane.css";

const { Header, Content } = Layout;

const AppRoutes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/it">
        <ITServices />
      </Route>
      <Route exact path="/it/foward-email">
        <ForwardItServiceRequest />
      </Route>
      <Route exact path="/it/create-request">
        <NewItServiceRequest />
      </Route>
      <Route exact path="/it/requests-assigned">
        <RequestsAssigned />
      </Route>
      <Route exact path="/it/preview/:id">
        <PreviewReuqest />
      </Route>
    </Switch>
  );
};

const App = () => {
  const { user, logout, apiUrl } = AuthData();
  let history = useHistory();

  return (
    <div>
      {/* <ConfigProvider theme={{ token: antdCustomTheme }}> */}
      <main className="app-container">
        <img src={"../../assets/world-shape.svg"} className="world-img-bg" />
        <Layout style={{ minHeight: "100vh", position: "relative", backgroundColor: "transparent" }}>
          <Header
            style={{
              backgroundColor: "#fff",
              padding: "20px 4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // boxShadow: "0 0 10px rgba(0,0,0,.1)",
              borderBottom: "1px solid #eee",
              position: "sticky",
              top: 0,
              zIndex: 999,
            }}
          >
            <div style={{ flex: 1, whiteSpace: "nowrap" }}>
              <Button type="text" shape="circle" size="small" title="click to go back" onClick={history.goBack}>
                <ArrowLeftOutlined />
              </Button>
              <Button type="text" shape="circle" size="small" title="click to go forward" onClick={history.goForward}>
                <ArrowRightOutlined />
              </Button>
            </div>
            <Link to="/" style={{ flex: 2, lineHeight: 1, textAlign: "center" }}>
              <img src="/assets/salic-logo.png" width={175} alt="logo" />
            </Link>
            <div style={{ flex: 1, textAlign: "right" }}>
              <Popover
                placement="bottomRight"
                trigger="click"
                content={
                  <div style={{ minWidth: 220 }}>
                    <div style={{ marginBottom: 15 }}>
                      <Typography.Title level={5} style={{ margin: 0, lineHeight: 1 }}>
                        {user.user?.displayName}
                      </Typography.Title>
                      <Typography.Text>{user.user?.mail}</Typography.Text>
                    </div>
                    <Typography.Link type="danger" danger style={{ fontSize: "0.9em" }} onClick={logout}>
                      <LogoutOutlined /> Logout
                    </Typography.Link>
                  </div>
                }
              >
                <Button type="text" shape="circle" style={{ padding: 0, outline: 0 }} title={user.user?.displayName}>
                  <Avatar
                    shape="circle"
                    size="small"
                    src={
                      <Image
                        title={user.user?.displayName}
                        src={`${apiUrl}/user/photo?id=${user.user?.mail}`}
                        preview={false}
                        onError={(e) =>
                          (e.currentTarget.src = "https://salicapi.com/File/7961d7c4-decf-42aa-8010-4a34d4178970.png")
                        }
                      />
                    }
                  />
                </Button>
              </Popover>
            </div>
          </Header>
          <Content style={{ padding: 12, backgroundColor: "transparent" }}>
            <AppRoutes />
          </Content>
          {/* <Footer
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" }}
          >
            <span>{user.user.displayName}</span>
            <Button type="link" danger onClick={logout}>
              Logout
            </Button>
          </Footer> */}
        </Layout>
      </main>
      {/* </ConfigProvider> */}
    </div>
  );
};

export default App;
