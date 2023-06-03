import { Button, Dropdown, Layout, Space, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCollapseSideMenu } from "../redux/store";
import { useTranslation } from "react-i18next";

const { Header, Sider, Content, Footer } = Layout;
const AppContent = () => {
  const dispatch = useDispatch();
  const sideMenuCollapsed = useSelector(
    (state) => state.layout.sideMenuCollapsed
  );
  const pageContent = useSelector((state) => state.layout.pageContent);
  const { t } = useTranslation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleToggleClick = () => {
    dispatch(toggleCollapseSideMenu());
  };

  const handleLanguageClick = (e) => {};

  const flagLabels = {
    turkish: (
      <span>
        <span className={"fi fi-tr"}></span>
        {" " + t("turkish")}
      </span>
    ),
    english: (
      <span>
        <span className={"fi fi-gb"}></span>
        {" " + t("english")}
      </span>
    ),
  };
  const availableLanguages = [
    {
      key: "turkish",
      label: flagLabels.turkish,
      onClick: (e) => console.log(e),
    },
    {
      key: "english",
      label: flagLabels.english,
      onClick: (e) => console.log(e),
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <Space>
          <Button
            type="text"
            icon={
              sideMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
            onClick={handleToggleClick}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            menu={{ items: availableLanguages }}
            placement={"bottom"}
            arrow
          >
            <Button>Turkish</Button>
          </Dropdown>
        </Space>
      </Header>
      <Content
        id="default-page-content"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        {pageContent}
      </Content>
    </Layout>
  );
};

export default AppContent;
