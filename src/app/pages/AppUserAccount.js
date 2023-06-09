import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Layout,
  message,
  Row,
  Space,
  Typography,
} from "antd";
import default_profile_image from "../../assets/user_318-159711.png";
import UploadProfilePictureDialog from "../dialog/UploadProfilePictureDialog";
import { createUseStyles } from "react-jss";
import i18n from "../localization/i18n";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const { t } = i18n;
const { Text, Link, Title, Paragraph } = Typography;
const { Header, Sider, Content, Footer } = Layout;
const onFinish = () => {
  message.success(t("submit.success"));
};

const onFinishFailed = () => {
  message.error(t("submit.failed"));
};

const AppUserAccount = ({ preferredLanguage }) => {
  const classes = useStyles();

  return (
    <>
      <Divider orientation={"left"}>
        <h2>{t("users.information")}</h2>
      </Divider>
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
            <Form.Item label={t("profile.picture")}>
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

            <Form.Item label={t("username")} name="username">
              <Input placeholder="abc123"></Input>
            </Form.Item>
            <Form.Item label={t("email")} name="email">
              <Input placeholder="abc@hotmail.com"></Input>
            </Form.Item>
            <Form.Item label={t("change.password")} name="password">
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
                  {t("submit")}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Divider orientation={"left"}>
        <h2>{t("material.requests")} </h2>
      </Divider>
      <Row>
        <Col>
          <Card title={t("material.requests")}></Card>
        </Col>
      </Row>
    </>
  );
};

AppUserAccount.prototype = {
  preferredLanguage: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    preferredLanguage: state.layout.preferredLanguage,
  };
}

export default connect(mapStateToProps)(AppUserAccount);

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
