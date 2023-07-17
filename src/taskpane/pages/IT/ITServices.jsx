import * as React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Form, Input, Select, Typography, message } from "antd";

const ITServices = () => {
  const [form] = Form.useForm();
  const [issueTypeField, setIssueTypeField] = React.useState("");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div>
      <header style={{ marginBottom: 25 }}>
        <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: "IT Service Request" }]} />
      </header>
      <div>
        <Typography.Title level={3}>IT Service Request</Typography.Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={() => message.error("Please, fill all required fields.")}
        >
          <Form.Item name="Subject" label="Subject" rules={[{ required: true }]}>
            <Input size="large" placeholder="write breif subject" />
          </Form.Item>
          <Form.Item name="IssueType" label="Issue Type">
            <Select placeholder="Select Issue Type" size="large" value={issueTypeField} onChange={setIssueTypeField}>
              <Select.Option value="Incident">Incident</Select.Option>
              <Select.Option value="Software">Software</Select.Option>
              <Select.Option value="Hardware">Hardware</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="Description" label="Descriptions / Justifications" rules={[{ required: true }]}>
            <Input.TextArea size="large" rows={4} placeholder="write a brief description" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ITServices;
