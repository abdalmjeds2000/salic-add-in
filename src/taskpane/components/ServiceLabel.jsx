import * as React from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";
import PropTypes from "prop-types";
import "./ServiceLabel.css";

const ServiceLabel = ({ to, icon, label, color }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }} className="service-item">
      <Space>
        <span className="icon" style={{ backgroundColor: color || "#1890ff" }}>
          {icon}
        </span>
        <Typography.Text className="label">{label}</Typography.Text>
      </Space>
    </Link>
  );
};

export default ServiceLabel;

// difine the prop types using react prop-types
ServiceLabel.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
};
