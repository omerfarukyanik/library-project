import { Layout, Space } from "antd";
import React from "react";
import SelectLanguageDropdown from "./components/SelectLanguageDropdown";
import { Outlet } from "react-router-dom";
import { createUseStyles } from "react-jss";
import SideMenuCollapseButton from "./components/SideMenuCollapseButton";

const { Header, Content } = Layout;
const AppContent = () => {
  const useStyle = createUseStyles({
    mainPageContentContainer: {
      margin: "24px 16px",
      padding: 24,
      minHeight: 280,
    },
    mainPageHeaderContainer: {
      padding: 0,
      backgroundColor: "white !important",
    },
  });
  const classes = useStyle();
  return (
    <Layout>
      <Header className={classes.mainPageHeaderContainer}>
        <Space>
          <SideMenuCollapseButton />
          <SelectLanguageDropdown />
        </Space>
      </Header>
      <Content className={classes.mainPageContentContainer}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppContent;
