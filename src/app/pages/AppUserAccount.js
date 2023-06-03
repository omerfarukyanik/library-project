import React, { useState } from "react";
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
import default_profile_image from "../../assets/user_318-159711.png";
import UploadProfilePictureDialog from "../dialog/UploadProfilePictureDialog";
import { createUseStyles } from "react-jss";

const { Text, Link, Title, Paragraph } = Typography;
const { Header, Sider, Content, Footer } = Layout;
const onFinish = () => {
  message.success("Submited successfully!");
};

const onFinishFailed = () => {
  message.error("Submit failed!");
};

const onChangeProfilePicture = ({ file, fileList, event }) => {
  if (file.status === "done") {
  }
};

const AppUserAccount = () => {
  const [uploadProfileImageModalVisible, setUploadProfileImageModalVisible] =
    useState(false);
  const classes = useStyles();
  return (
    <>
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
            <Form.Item
              label={
                <h2 className={classes.headerLabelItem}>User's Information</h2>
              }
              labelCol={{ span: 24, offset: 6 }}
              colon={false}
              className={classes.rowContainerFlex}
            ></Form.Item>
            <Form.Item label="Profile Picture:">
              <Row align={"middle"} justify={"start"}>
                <Space>
                  <Col>
                    <Image src={default_profile_image} width={64} height={64} />
                  </Col>
                  <Col>
                    <UploadProfilePictureDialog />
                  </Col>
                </Space>
              </Row>
            </Form.Item>

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

const useStyles = createUseStyles({
  headerLabelItem: {
    flexGrow: "1",
    borderBottomStyle: "solid",
    borderBottomColor: "rgb(0, 21, 41)",
    borderBottomWidth: "2px",
  },
  rowContainerFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
