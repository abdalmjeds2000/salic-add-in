import * as React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Typography } from "antd";
import { AuthData } from "../../../../AuthWrapper";
import { ITServiceRequestForm } from "salic-react-components";
import { fetchITServiceRequests } from "../../../../api/it_service_requests";
import { useHistory } from "react-router-dom";
import "./styles.css";

const ForwardEmail = () => {
  const { user } = AuthData();
  const [issues, setIssues] = React.useState([]);
  const [emailData, setEmailData] = React.useState({});
  const history = useHistory();

  const fetchIssues = async () => {
    const data = await fetchITServiceRequests();
    setIssues(data?.value || []);
  };
  React.useEffect(() => {
    fetchIssues();
  }, []);

  const fetchEmailData = async () => {
    const data = {};
    const emailSubject = Office.context.mailbox.item.subject;
    const emailAttachments = Office.context.mailbox.item.attachments;
    const emailDescription = await new Promise((resolve, reject) => {
      Office.context.mailbox.item.body.getAsync("html", (result) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve(result.value);
        } else {
          reject("No description");
        }
      });
    });
    data["emailSubject"] = emailSubject;
    data["emailDescription"] = emailDescription;
    data["emailAttachments"] = emailAttachments;
    setEmailData(data);
  };
  React.useEffect(() => {
    fetchEmailData();
  }, []);

  if (Object.keys(emailData).length === 0) return null;
  return (
    <div>
      <header style={{ marginBottom: 25 }}>
        <Breadcrumb>
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/it">IT Service Center</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Forward Email</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <div>
        <Typography.Title level={3}>Forward Email</Typography.Title>
        <ITServiceRequestForm
          listOfIssue={issues.map((issue) => issue.fields)}
          Email={user.user.mail}
          Source="ADD-IN"
          afterSubmit={() => history.push("/it")}
          emailDescription={emailData.emailDescription} // to put it in rich text editor
          initialValues={{
            Subject: emailData.emailSubject,
            // Description: emailData.emailDescription, // not necessary, => description is in rich text editor
          }}
        />
      </div>
    </div>
  );
};

export default ForwardEmail;
