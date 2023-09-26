import * as React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Typography } from "antd";
import { AuthData } from "../../../../AuthWrapper";
import { ITServiceRequestForm } from "salic-react-components";
import { fetchITServiceRequests } from "../../../../api/it_service_requests";
import { useHistory } from "react-router-dom";

const NewRequest = () => {
  const { user } = AuthData();
  const [issues, setIssues] = React.useState([]);
  const history = useHistory();

  const fetchIssues = async () => {
    const data = await fetchITServiceRequests();
    setIssues(data?.value || []);
  };
  React.useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div>
      <header style={{ marginBottom: 25 }}>
        <Breadcrumb>
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/it">IT Service Center</Link></Breadcrumb.Item>
          <Breadcrumb.Item>New IT Service</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <div>
        <Typography.Title level={3}>New IT Service Request</Typography.Title>
        <ITServiceRequestForm
          listOfIssue={issues.map((issue) => issue.fields)}
          Email={user.user.mail}
          Source="ADD-IN"
          afterSubmit={() => history.push("/it")}
        />
      </div>
    </div>
  );
};

export default NewRequest;
