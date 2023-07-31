import * as React from "react";
import { FiSettings } from "react-icons/fi";
import { Space } from "antd";
import ServiceLabel from "../components/ServiceLabel";

const Home = () => {
  return (
    <div id="home_page">
      <div>
        <Space direction="vertical" size="middle" className="services-container">
          <ServiceLabel label="IT Service Center" icon={<FiSettings size={18} />} to="/it" color="#897ed4" />
        </Space>
      </div>
    </div>
  );
};

export default Home;
