import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Breadcrumb, Space, Typography } from "antd";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home">
      <header style={{ marginBottom: 25 }}>
        <Breadcrumb items={[{ title: "Home" }]} />
      </header>

      <div>
        <Typography.Title level={2}>Choose a service</Typography.Title>
        <Space direction="vertical" size="large" className="services-container">
          <Link to="/it" style={{ textDecoration: "none" }} className="service-item">
            <Space>
              <FiSettings size={18} />
              <Typography.Text>New IT Service Request</Typography.Text>
            </Space>
          </Link>
        </Space>
      </div>
    </div>
  );
};

export default Home;
