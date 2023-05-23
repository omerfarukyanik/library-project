import React from "react";
import {
  Image,
  Col,
  Row,
  Typography,
  Layout,
  Form,
  Input,
  Space,
  Button,
  message,
  Card,
} from "antd";
import default_profile_image from "../assets/user_318-159711.png";

const { Text, Link, Title, Paragraph } = Typography;
const { Header, Sider, Content, Footer } = Layout;
const onFinish = () => {
  message.success("Submited successfully!");
};

const onFinishFailed = () => {
  message.error("Submit failed!");
};

const AppUserAccount = () => {
  return (
    <>
      <Row justify="start" align="middle" gutter={[48, 16]}>
        <Col span={1}>
          <Image
            src={default_profile_image}
            width={64}
            height={64}
            preview={false}
          />
        </Col>
        <Col span={2}>
          <Text>Profile Picture</Text>
        </Col>
      </Row>
      <Row
        justify="start"
        align="middle"
        style={{
          marginTop: "30px",
        }}
      >
        <Col span={16}>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="User Informations:"></Form.Item>
            <Form.Item label="Username" name="username">
              <Input placeholder="abc123"></Input>
            </Form.Item>
            <Form.Item label="E-mail" name="e-mail">
              <Input placeholder="abc@hotmail.com"></Input>
            </Form.Item>
            <Form.Item label="Change Password" name="password">
              <Input></Input>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 12,
                offset: 6,
              }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card title="Material Requests"></Card>
        </Col>
      </Row>
    </>
  );
};

export default AppUserAccount;
