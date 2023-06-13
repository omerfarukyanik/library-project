import {
  DatabaseOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Image, Layout, Menu, Typography } from "antd";
import logo from "../assets/logo256.png";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../redux";

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
  const handleMenuItems = () => {
    if (localStorage.getItem("login-type") === "admin") {
      return [
        {
          label: t("account"),
          key: "admin-account",
          icon: <UserOutlined />,
        },
        {
          label: t("logs"),
          key: "logs",
          icon: <UnorderedListOutlined />,
        },
        {
          label: t("users"),
          key: "user.details",
          icon: <TeamOutlined />,
        },
        {
          label: t("material.list"),
          key: "material.list",
          icon: <DatabaseOutlined />,
        },
        {
          label: t("log.out"),
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ];
    } else if (localStorage.getItem("login-type") === "user") {
      return [
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
    }
    return [];
  };
  const menuItems = handleMenuItems();

  const onClick = ({ item, key, keyPath, domEvent }) => {
    setCurrent(key);
    switch (key) {
      case "account":
        navigation("user");
        break;
      case "cart":
        navigation("cart");
        break;
      case "admin-account":
        navigation("admin-account");
        break;
      case "logs":
        navigation("logs");
        break;
      case "user.details":
        navigation("user-details");
        break;
      case "material.list":
        navigation("material-list");
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
