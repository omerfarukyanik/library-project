import React, { useEffect, useState } from "react";
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
import { setCSRFToken, userLogin } from "../../redux";
import { useNavigate } from "react-router-dom";
import bcryptjs from "bcryptjs";

const { Text, Title } = Typography;
const { Footer, Content, Header } = Layout;
const LoginPage = ({ userLoggedIn, adminLoggedIn, csrfToken }) => {
  const { message } = App.useApp() || {};
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  const [login, loginResult] = useLoginMutation() || {};
  const sessionResults = useGetSessionQuery() || {};
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
    setInterval(() => {
      if (csrfToken == null) {
        try {
          sessionResults.refetch();
        } catch (e) {
          console.log(e);
        }
      }
    }, 60000);
  });
  useEffect(() => {
    if (sessionResults.isSuccess) {
      dispatch(setCSRFToken({ csrfToken: sessionResults?.data?.token }));
    }
  }, [sessionResults.isSuccess, dispatch, sessionResults?.data?.token]);
  useEffect(() => {
    if (loginResult.isSuccess) {
      if (bcryptjs.compareSync(password, "" + loginResult?.data?.password)) {
        localStorage.setItem("login-type", "user");
        dispatch(userLogin({ username: username }));
        navigate(`/home`);
        message.success(t("login.success"));
      } else {
        message.error(t("password.incorrect"));
      }
    }
    if (loginResult.isError) {
      message.error(t(loginResult.error?.data?.message));
    }
  }, [
    dispatch,
    loginResult?.data?.password,
    loginResult.error?.data?.message,
    loginResult.isError,
    loginResult.isSuccess,
    message,
    navigate,
    password,
    t,
    username,
  ]);

  const handleSubmit = (e) => {
    const salt = bcryptjs.genSaltSync(10);
    setPassword(e.password);
    setUsername(e.username);
    e.password = bcryptjs.hashSync(e.password, salt);
    const formData = new FormData();
    Object.entries(e).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.delete("password");
    formData.append("type", "user");
    login({
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
          </Row>

          <Form
            className={classes.loginPageFormContainer}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
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
            <Form.Item
              wrapperCol={{
                offset: 16,
                span: 8,
              }}
            >
              <Typography.Link onClick={() => navigate("/admin")}>
                {t("go.to.admin.login.page")}
              </Typography.Link>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 16,
                span: 8,
              }}
            >
              <Typography.Link onClick={() => navigate("/signup")}>
                {t("go.to.sign.up.page")}
              </Typography.Link>
            </Form.Item>
          </Form>
        </Space>
      </Content>
      <Footer className={classes.footerContainer}>
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
  loginPageFormContainer: {
    minWidth: "40vw",
    alignItems: "center",
    minHeight: "83vh",
    maxHeight: "90vh",
    paddingTop: "40vh !important",
  },
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
    minHeight: "10vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
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
