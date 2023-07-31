import * as React from "react";
import { Breadcrumb, Space, Table, Typography, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthData } from "../../../AuthWrapper";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const RequestsAssigned = () => {
  const { user, apiUrl } = AuthData();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiUrl}/tracking/AssignedForMe?User=${user.user.mail}&draw=1&order=Status%20desc&start=0&length=-1&search[value]=&search[regex]=false&query=`
      );
      console.log(response);
      setData(response?.data?.Data);
    } catch (error) {
      message.error("Failed Load Data!");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "SR. #",
      dataIndex: "Id",
      width: "5%",
      render: (val) => <b>{`SR[#${val}]`}</b>,
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      width: "33%",
      render: (val, record) => (
        <div style={{ minWidth: 250 }}>
          <Space direction="horizontal">
            <InfoCircleOutlined style={{ color: record.Priority === "1" ? "#0c508c" : "#ff272b" }} />
            <Link to={`/it/${record.Id}`}>{val}</Link>
          </Space>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "CreatedAt",
      width: "12%",
      render: (val) => <div style={{ minWidth: 140 }}>{moment(val).format("MM/DD/YYYY H:mm A")}</div>,
    },
    {
      title: "Requester",
      dataIndex: "Requester",
      width: "16%",
      render: (val) => <div style={{ minWidth: 100 }}>{val?.DisplayName}</div>,
    },
    {
      title: "Pending With",
      dataIndex: "PendingWith",
      width: "16%",
      render: (val) => <div style={{ minWidth: 100 }}>{val?.DisplayName}</div>,
    },
    {
      title: "Status",
      dataIndex: "Status",
      width: "8%",
      render: (val) => <div style={{ minWidth: 80 }}>{val}</div>,
    },
    {
      title: "Request Type",
      dataIndex: "RequestType",
      width: "10%",
      render: (val) => <div style={{ minWidth: 80 }}>{val}</div>,
    },
  ];

  return (
    <div>
      <header style={{ marginBottom: 25 }}>
        <Breadcrumb
          items={[
            { title: <Link to="/">Home</Link> },
            { title: <Link to="/it">IT Service Center</Link> },
            { title: "Requests Assigned" },
          ]}
        />
      </header>
      <div>
        <Typography.Title level={3}>Requests Assigned to Me</Typography.Title>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          style={{ backgroundColor: "#fff", overflowX: "auto" }}
          rowClassName={(record) =>
            record.Status === "PROCESSING"
              ? "PROCESSING"
              : record.Status === "Waiting For Approval"
              ? "Waiting_For_Approval"
              : record.Status === "SUBMITTED"
              ? "SUBMITTED"
              : ""
          }
        />
      </div>
    </div>
  );
};

export default RequestsAssigned;
