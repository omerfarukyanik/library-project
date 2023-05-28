import {
    UserOutlined, ShoppingCartOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined
} from "@ant-design/icons";
import React, {useState} from "react";
import {Menu, Layout, theme, Button, Image, Typography} from "antd";
import "./AppSideMenu.css";
import logo from "../assets/logo256.png";
import AppUserAccount from "./AppUserAccount";

const {Header, Sider, Content} = Layout;
const {Text} = Typography;
const menuItems = [{
    label: "Hesap", key: "account", icon: <UserOutlined/>,
}, {
    label: "Sepet", key: "cart", icon: <ShoppingCartOutlined/>,
}, {
    label: "Çıkış Yap", key: "log-out", icon: <LogoutOutlined />,
},];

const AppSideMenu = () => {
    const [current, setCurrent] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [pageContent, setPageContent] = useState(null);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const onClick = ({item, key, keyPath, domEvent}) => {
        setCurrent(key);
        switch (key) {
            case "account":
                setPageContent(<AppUserAccount/>);
                break;
            case "cart":
                break;
            case "log-out":
                break;
            default:
                break;
        }
    };
    return (<Layout style={{minHeight: "100vh"}}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
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
                {collapsed ? null : (<Text
                    style={{
                        fontSize: "24px", marginLeft: "10%", color: "#ffffffa6", overflow: "hidden",
                    }}
                >
                    E-Library
                </Text>)}
            </div>

            <Menu
                theme="dark"
                mode="inline"
                onClick={onClick}
                selectedKeys={[current]}
                items={menuItems}
            />
        </Sider>
        <Layout>
            <Header
                style={{
                    padding: 0, background: colorBgContainer,
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: "16px", width: 64, height: 64,
                    }}
                />
            </Header>
            <Content
                id="default-page-content"
                style={{
                    margin: "24px 16px", padding: 24, minHeight: 280, background: colorBgContainer,
                }}
            >
                {pageContent}
            </Content>
        </Layout>
    </Layout>);
};

export default AppSideMenu;
