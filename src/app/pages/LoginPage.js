import React from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Space,
  Typography,
} from "antd";
import { createUseStyles } from "react-jss";
import logo from "../../assets/logo256.png";
import { useTranslation } from "react-i18next";
import SelectLanguageDropdown from "../components/SelectLanguageDropdown";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const { Text, Link, Paragraph, Title } = Typography;
const { Sider, Footer, Content, Header } = Layout;
const LoginPage = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Layout>
      <Header>
        <SelectLanguageDropdown />
      </Header>
      <Content className={classes.loginPageContainer}>
        <Space>
          <Row>
            <Col className={classes.logoAndTitleContainer}>
              <Image src={logo} preview={false} />
              <Title>E-Library</Title>
            </Col>
            <Col></Col>
          </Row>

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              minWidth: "40vw",
              alignItems: "center",
              minHeight: "90vh",
              paddingTop: "40vh",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={t("username")}
              name="username"
              rules={[
                {
                  required: true,
                  message: t("username.validate.empty"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                {
                  required: true,
                  message: t("password.validate.empty"),
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                {t("submit")}
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Content>
      <Footer className={classes.footerContainer}>
        <Layout></Layout>
        <Space>
          <Divider type={"vertical"} />
          <Text>BBM471 Project</Text>
          <Divider type={"vertical"} />
          <Text>Ömer Faruk Yanık</Text>
          <Divider type={"vertical"} />
          <Text>21827976</Text>
          <Divider type={"vertical"} />
        </Space>
      </Footer>
    </Layout>
  );
};

export default LoginPage;

const useStyles = createUseStyles({
  loginPageContainer: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  logoAndTitleContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "20vw",
  },
  footerContainer: {
    display: "flex",
    minHeight: "10vh",
    justifyContent: "center",
  },
});
export const loginLoader = () => {
  return null;
};
