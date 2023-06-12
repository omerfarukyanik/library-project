import React, { useEffect } from "react";
import {
  App,
  Button,
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
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import {
  useGetSessionQuery,
  useLoginMutation,
} from "../../redux/api/credentialsApi";
import { adminLogin, setCSRFToken, userLogin } from "../../redux";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;
const { Footer, Content, Header } = Layout;
const LoginPage = ({ userLoggedIn, adminLoggedIn, csrfToken }) => {
  const { message, modal, notification } = App.useApp();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const [login, loginResult] = useLoginMutation();
  const sessionResults = useGetSessionQuery();
  const navigate = useNavigate();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    errorInfo.errorFields.forEach((value, index, array) => {
      value.errors.forEach((value, index, array) => {
        message.error(value);
      });
    });
  };
  useEffect(() => {
    if (sessionResults.isSuccess) {
      dispatch(setCSRFToken({ csrfToken: sessionResults.data.token }));
    }
  }, [sessionResults.isSuccess]);
  useEffect(() => {
    if (loginResult.isSuccess) {
      message.success(t("login.success"));

      localStorage.setItem("login-type", "admin");
      dispatch(adminLogin());

      navigate(`/home`);
    }
  }, [loginResult.isSuccess]);

  const handleSubmit = async (e) => {
    const formData = new FormData();
    Object.entries(e).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await login({
      formData,
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });
  };
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
            onFinish={handleSubmit}
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

LoginPage.prototype = {
  userLoggedIn: PropTypes.bool,
  adminLoggedIn: PropTypes.bool,
  csrfToken: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    userLoggedIn: state.credentials.userLoggedIn,
    adminLoggedIn: state.credentials.adminLoggedIn,
    csrfToken: state.credentials.csrfToken,
  };
}

export default connect(mapStateToProps)(LoginPage);
