import {
  UserOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Menu, Layout, Image, Typography } from "antd";
import "./AppSideMenu.css";
import logo from "../assets/logo256.png";
import AppUserAccount from "./pages/AppUserAccount";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setPageContent } from "../redux/store";

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

const AppSideMenu = () => {
  const [current, setCurrent] = useState(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.layout.sideMenuCollapsed);
  const handleChangePageContent = (pageContent) => {
    dispatch(setPageContent(pageContent));
  };

  const menuItems = [
    {
      label: t("account"),
      key: "account",
      icon: <UserOutlined />,
    },
    {
      label: t("cart"),
      key: "cart",
      icon: <ShoppingCartOutlined />,
    },
    {
      label: t("log.out"),
      key: "log-out",
      icon: <LogoutOutlined />,
    },
  ];

  const onClick = ({ item, key, keyPath, domEvent }) => {
    setCurrent(key);
    switch (key) {
      case "account":
        handleChangePageContent(<AppUserAccount />);
        break;
      case "cart":
        break;
      default:
        break;
    }
  };
  return (
    <Sider trigger={null} collapsible collapsed={!!collapsed}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "50px",
          alignItems: "center",
          marginTop: "8px",
          marginLeft: "15px",
          marginBottom: "10%",
          width: "100%",
        }}
      >
        <Image width={50} height={50} preview={false} src={logo} />
        {collapsed ? null : (
          <Text
            style={{
              fontSize: "24px",
              marginLeft: "10%",
              color: "#ffffffa6",
              overflow: "hidden",
            }}
          >
            E-Library
          </Text>
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        selectedKeys={[current]}
        items={menuItems}
      />
    </Sider>
  );
};

export default AppSideMenu;
