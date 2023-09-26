import * as React from "react";
import { useParams } from "react-router-dom";
import { PreviewItServiceRequest } from "salic-react-components";
import { AuthData } from "../../../AuthWrapper";
import axios from "axios";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { fetchITServiceRequests } from "../../../api/it_service_requests";
import { fetchITAdmins } from "../../../api/get_it_admins";
import "./PreviewRequest.css";

const PreviewReuqest = () => {
  const { user, apiUrl } = AuthData();
  const { id } = useParams();
  const [issues, setIssues] = React.useState([]);
  const [communications, setCommunications] = React.useState([]);
  const [itAdmin, setItAdmin] = React.useState({ users: [], loading: false, isAdmin: false });

  const fetchNecessaryData = async () => {
    try {
      const data = await fetchITServiceRequests();
      setIssues(data?.value || []);
      const communications = await axios.get(`${apiUrl}/User/GetCommunicationList`);
      setCommunications(communications.data?.Data || []);
    } catch (error) {
      console.log(error);
    }
  };
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
    fetchNecessaryData();
  }, []);
  React.useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <header style={{ marginBottom: 10 }}>
        <Breadcrumb
          items={[
            { title: <Link to="/">Home</Link> },
            { title: <Link to="/it">IT Service Center</Link> },
            { title: `RE #${id}` },
          ]}
        />
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/it">IT Service Center</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{`RE #${id}`}</Breadcrumb.Item>
        </Breadcrumb>
      </header>

      <PreviewItServiceRequest
        Email={user.user.mail}
        TicketId={id}
        IssueTypes={issues.map((issue) => issue.fields)}
        IsAdmin={itAdmin.isAdmin}
        organizationUsers={communications?.map((user) => ({ email: user.email, displayname: user.name }))}
      />
    </div>
  );
};

export default PreviewReuqest;
