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
  Radio,
} from "antd";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import SelectLanguageDropdown from "../components/SelectLanguageDropdown";
import logo from "../../assets/logo256.png";
import { createUseStyles } from "react-jss";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {
  useGetSessionQuery,
  useSignUpMutation,
} from "../../redux/api/credentialsApi";
import bcryptjs from "bcryptjs";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { setCSRFToken } from "../../redux";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const SignUpPage = ({ csrfToken }) => {
  const { message } = App.useApp();
  const { t } = useTranslation();
  const classes = useStyles();
  const [signUp, signUpResult] = useSignUpMutation();
  const [accountType, setAccountType] = useState();
  const sessionResults = useGetSessionQuery() || {};
  const dispatch = useDispatch();
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
    if (signUpResult.isSuccess) {
      if (signUpResult.data?.status === "success") {
        message.success(t(signUpResult.data?.message));
        if (sessionResults.data?.type === "admin") navigate("/admin");
        else if (sessionResults.data?.type === "user") navigate("/");
      }
    }
    if (signUpResult.isError) {
      if (signUpResult.error?.data?.status === "bad-request") {
        message.error(t(signUpResult.error?.data?.message));
      }
    }
  }, [
    message,
    navigate,
    sessionResults.data?.type,
    signUpResult.data?.message,
    signUpResult.data?.status,
    signUpResult.error?.data?.message,
    signUpResult.error?.data?.status,
    signUpResult.isError,
    signUpResult.isSuccess,
    signUpResult.status,
    t,
  ]);

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
      dispatch(setCSRFToken({ csrfToken: sessionResults.data?.token }));
    }
  }, [sessionResults.isSuccess, dispatch, sessionResults.data?.token]);
  const handleFormValuesChange = ({ accountType }) => {
    setAccountType(accountType);
  };
  const handleSignUp = (e) => {
    const salt = bcryptjs.genSaltSync(10);
    e.password = bcryptjs.hashSync(e.password, salt);
    const formData = new FormData();
    Object.entries(e).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("type", accountType);
    signUp({
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
      <Content className={classes.signUpPageContainer}>
        <Space>
          <Row>
            <Col className={classes.logoAndTitleContainer}>
              <Image src={logo} preview={false} />
              <Title>E-Library Sign Up</Title>
            </Col>
          </Row>
          <Form
            className={classes.signUpPageFormContainer}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={handleSignUp}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onValuesChange={handleFormValuesChange}
          >
            <Form.Item
              label={t("account.type")}
              name="accountType"
              rules={[
                {
                  required: true,
                  message: t("account.type.validate.empty"),
                },
              ]}
            >
              <Radio.Group value={accountType}>
                <Radio.Button value="admin">Admin</Radio.Button>
                <Radio.Button value="user">User</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Username"
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
              label={t("name")}
              name="name"
              rules={[
                {
                  required: true,
                  message: t("name.validate.empty"),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("surname")}
              name="surname"
              rules={[
                {
                  required: true,
                  message: t("surname.validate.empty"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
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
              label={t("email")}
              name="email"
              rules={[
                {
                  required: true,
                  message: t("email.validate.empty"),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
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

SignUpPage.prototype = {
  csrfToken: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    csrfToken: state.credentials.csrfToken,
  };
}

export default connect(mapStateToProps)(SignUpPage);

const useStyles = createUseStyles({
  signUpPageFormContainer: {
    minWidth: "40vw",
    alignItems: "center",
    minHeight: "83vh",
    maxHeight: "90vh",
    paddingTop: "40vh !important",
  },
  signUpPageContainer: {
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
