import * as React from "react";
import { Breadcrumb, Space } from "antd";
import ServiceLabel from "../../components/ServiceLabel";
import { FaPlus } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const ITServices = () => {
  return (
    <div id="it_services_page">
      <header style={{ marginBottom: 25 }}>
        <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: "IT Service Center" }]} />
      </header>
      <div>
        <Space direction="vertical" size="middle" className="services-container">
          <ServiceLabel
            label="New IT Service Request"
            icon={<FaPlus size={18} />}
            to="/it/create-request"
            color="#6dc3b9"
          />
          <ServiceLabel
            label="Requests Assigned to Me"
            icon={<PiUserListBold size={22} />}
            to="/it/requests-assigned"
            color="#f9b26b"
          />
        </Space>
      </div>
    </div>
  );
};

export default ITServices;
