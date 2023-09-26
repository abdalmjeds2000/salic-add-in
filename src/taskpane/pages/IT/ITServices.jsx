import * as React from "react";
import { Breadcrumb, Space, Tooltip, Typography } from "antd";
import ServiceLabel from "../../components/ServiceLabel/ServiceLabel";
import { FaExternalLinkAlt, FaPlus } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { BsEnvelopePlus, BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { fetchITAdmins } from "../../api/get_it_admins";
import { AuthData } from "../../AuthWrapper";

const ITServices = () => {
  const { user } = AuthData();
  const [itAdmin, setItAdmin] = React.useState({ users: [], loading: false, isAdmin: false });

  console.log(itAdmin);
  async function fetchUsers() {
    try {
      setItAdmin((prev) => ({ ...prev, loading: true }));
      const response = await fetchITAdmins();
      const isAdmin = response.data?.find(
        (admin) => admin?.UserPrincipalName?.toLowerCase() === user.user.mail?.toLowerCase()
      );
      setItAdmin((prev) => ({ ...prev, users: response.data, isAdmin: !!isAdmin }));
    } catch (error) {
      console.log(error);
    } finally {
      setItAdmin((prev) => ({ ...prev, loading: false }));
    }
  }

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div id="it_services_page">
      <header style={{ marginBottom: 25, display: "flex", justifyContent: "space-between" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>IT Service Center</Breadcrumb.Item>
        </Breadcrumb>
        <Tooltip title="IT Service Center" placement="leftBottom">
          <Typography.Link
            href="https://salic.sharepoint.com/sites/portal/SitePages/Home.aspx/services-requests"
            target="_blank"
          >
            <FaExternalLinkAlt />
          </Typography.Link>
        </Tooltip>
      </header>
      <div>
        <Space direction="vertical" size="middle" className="services-container">
          <ServiceLabel
            label="Forward this Email"
            icon={<BsEnvelopePlus size={18} />}
            to="/it/foward-email"
            color="#3accc5"
          />
          <ServiceLabel
            label="New IT Service Request"
            icon={<BsPlusCircle size={18} />}
            to="/it/create-request"
            color="#3A9BCC"
          />
          {itAdmin.isAdmin && (
            <ServiceLabel
              label="Requests Assigned to Me"
              icon={<PiUserListBold size={22} />}
              to="/it/requests-assigned"
              color="#e99b4d"
            />
          )}
        </Space>
      </div>
    </div>
  );
};

export default ITServices;
