import {
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Image, Layout, Menu, Typography } from "antd";
import logo from "../assets/logo256.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogOut, logOut, userLogOut } from "../redux";

const { Sider } = Layout;
const { Text } = Typography;

const AppSideMenu = () => {
  const [current, setCurrent] = useState(null);

  const { t } = useTranslation();
  const collapsed = useSelector((state) => state.layout.sideMenuCollapsed);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("login-type");
    navigation("/");
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
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  const onClick = ({ item, key, keyPath, domEvent }) => {
    setCurrent(key);
    switch (key) {
      case "account":
        navigation("user");
        break;
      case "cart":
        navigation("cart");
        break;
      case "logout":
        handleLogOut();
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
