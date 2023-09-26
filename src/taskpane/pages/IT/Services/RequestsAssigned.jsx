/* eslint-disable prettier/prettier */
import * as React from "react";
import { Breadcrumb, Pagination, Tag, Typography, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthData } from "../../../AuthWrapper";
import moment from "moment";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Loader } from "salic-react-components";

const RequestsAssigned = () => {
  const { user, apiUrl } = AuthData();
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [pagination, setPagination] = React.useState({
    current: 1,
    pageSize: 10,
  });

  async function fetchData() {
    try {
      setLoading(true);
      const start = (pagination.current - 1) * pagination.pageSize;
      const response = await axios.get(
        // `${apiUrl}/tracking/AssignedForMe?User=${user.user.mail}&draw=1&order=Status%20desc&start=0&length=-1&search[value]=&search[regex]=false&query=`
        `${apiUrl}/tracking/Get?draw=1&order=Id%20desc&start=${start}&length=${pagination.pageSize}&email=${user.user.mail}`
      );
      console.log(response);
      setData(response?.data);
    } catch (error) {
      message.error("Failed Load Data!");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, [pagination]);

  // const dataFiltered = React.useMemo(() => {
  //   const start = (pagination.current - 1) * pagination.pageSize;
  //   const end = pagination.current * pagination.pageSize;
  //   return data.slice(start, end);
  // }, [data, pagination]);


  return (
    <div>
      {loading && <div style={{ position: "fixed", backgroundColor: "#fff", padding: 20, top: "50%", left: "50%", zIndex: 99, borderRadius: 10, boxShadow: "0 4px 10px #00000011", transform: "translate(-50%, -50%)" }}><Loader /></div>}
      <header style={{ marginBottom: 25 }}>
        <Breadcrumb>
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/it">IT Service Center</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Requests Assigned</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <div>
        <Typography.Title level={3}>Requests Assigned to Me</Typography.Title>

        <Table>
          <Thead>
            <Tr>
              {/* <Th>SR. #</Th> */}
              <Th>Subject</Th>
              <Th>Created At</Th>
              <Th>Requester</Th>
              {/* <Th>Pending With</Th> */}
              <Th>Status</Th>
              <Th>Request Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data?.data?.map((item, index) => {
                return (
                  <Tr key={index}>
                    {/* <Td><Tag>#{item?.Id}</Tag></Td> */}
                    <Td><Link to={`/it/preview/${item?.Id}`}>#{item?.Id} :: {item?.Subject}</Link></Td>
                    <Td>{moment(item?.CreatedAt).format("MM/DD/YYYY H:mm A")}</Td>
                    <Td><Typography.Link href={`https://eur.delve.office.com/?p=${item?.Requester.Mail}` || " - "} target="_blank" style={{color:"#000"}}>{item?.Requester.DisplayName}</Typography.Link></Td>
                    {/* <Td>{item?.PendingWith?.DisplayName || " - "}</Td> */}
                    <Td><Tag color={item.Status === "Waiting For Approval" ? "orange" : item.Status === "SUBMITTED" ? "red" : item.Status === "PROCESSING" ? "green" : "blue"}>{item?.Status}</Tag></Td>
                    <Td>{item?.RequestType || " - "}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
        {data?.data?.length > 0 && <Pagination
          current={pagination.current}
          total={data?.recordsTotal || 0}
          pageSize={pagination.pageSize}
          style={{ textAlign: "center" }}
          disabled={loading}
          showSizeChanger
          onChange={
            (page, pageSize) => {
              setPagination({ ...pagination, current: page, pageSize: pageSize });
            }
          }
        />}
      </div>
      <style jsx>
        {`
          table {
            border-collapse: collapse;
            width: 100%;
            border: 1px solid #f4f4f4;
            margin-bottom: 25px;
          }
          th {
            background-color: #f4f4f4;
            padding: 20px 0 !important;
            color: #434343;
          }
          th, td {
            text-align: left;
            padding: 8px;
          }
          tr:nth-child(even) {background-color: #f8f8f8;}
          tr:nth-child(odd) {background-color: #ffffff;}
          tr {
            border: 1px solid #f4f4f4 !important;
          }
          tr:hover {
            background-color: #f4f4f4;
          }
        `}
      </style>
    </div>
  );
};

export default RequestsAssigned;
