import * as React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Typography } from "antd";
import axios from "axios";
import { AuthData } from "../../../AuthWrapper";
import { ITServiceRequestForm } from "salic-react-components";

const NewRequest = () => {
  const { user } = AuthData();
  const [issues, setIssues] = React.useState([]);
  const [emailData, setEmailData] = React.useState({});

  const fetchIssues = async () => {
    try {
      const res_issues = await axios.get(
        // "https://graph.microsoft.com/v1.0/sites/92458303-f642-487c-8328-6914b90ae9a2/lists/b2f93318-9149-4369-a74f-f3d2029f2ede/items?expand=fields(select=AttachmentFiles,*)"
        "https://graph.microsoft.com/v1.0/sites/7edaebd4-868c-4eda-9895-6bd7887cb5bc/lists/a4ef4d16-3983-4d9c-833d-a02479bbc1fa/items?expand=fields(select=AttachmentFiles,*)"
      );
      setIssues(res_issues.data.value);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchIssues();
  }, []);

  const fetchEmailData = async () => {
    const data = {};
    const emailSubject = Office.context.mailbox.item.subject;
    const emailAttachments = Office.context.mailbox.item.attachments;
    const emailDescription = await new Promise((resolve, reject) => {
      Office.context.mailbox.item.body.getAsync("text", (result) => {
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
        <Breadcrumb
          items={[
            { title: <Link to="/">Home</Link> },
            { title: <Link to="/it">IT Service Center</Link> },
            { title: "IT Service Request" },
          ]}
        />
      </header>
      <div>
        <Typography.Title level={3}>New IT Service Request</Typography.Title>
        <ITServiceRequestForm
          listOfIssue={issues.map((issue) => issue.fields)}
          Email={user.user.mail}
          initialValues={{
            Subject: emailData.emailSubject,
            Description: emailData.emailDescription,
          }}
        />
      </div>
    </div>
  );
};

export default NewRequest;
