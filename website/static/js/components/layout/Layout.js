import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import Setting from "../Setting";
import {
  LeftCircleOutlined,
  RightCircleOutlined,
  UserOutlined,
  SettingFilled,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from "../Home";
import TableStaff from "../TableStaff";
import DetailStaff from "../Staff/DetailStaff";
import {deleteTokens} from "../auth"
const { Header, Sider, Content, SubMenu } = Layout;


function LayoutPage() {


  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
    setHidden(!hidden);
  };
  

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        {/* {windowDimensions.width > 760 ? ( */}
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Link to="/">
              {hidden ? null : (
                <img
                  className="logo"
                  alt="logo"
                  src="https://www.aimesoft.com/assets/aimesoft/images/logo.png"
                ></img>
              )}
            </Link>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
              {hidden ? (
                <Menu.Item key="0" icon={<HomeOutlined />}>
                  <Link to="/">Home</Link>
                </Menu.Item>
              ) : null}
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/staff">Nhân viên</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<SettingFilled />} placement="bottom">
                <Link to="/setting">Cài đặt</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => {
            deleteTokens();
            window.location.replace("/")
          }} placement="bottom">
                Đăng xuất
              </Menu.Item>
            </Menu>
          </Sider>
        {/* // ) : (
        //   <SubMenu
        //     key="SubMenu"
        //     icon={<SettingOutlined />}
        //     title="Navigation Three - Submenu"
        //   >
        //     <Menu.ItemGroup title="Item 1">
        //       <Menu.Item key="setting:1">Option 1</Menu.Item>
        //       <Menu.Item key="setting:2">Option 2</Menu.Item>
        //     </Menu.ItemGroup>
        //     <Menu.ItemGroup title="Item 2">
        //       <Menu.Item key="setting:3">Option 3</Menu.Item>
        //       <Menu.Item key="setting:4">Option 4</Menu.Item>
        //     </Menu.ItemGroup>
        //   </SubMenu>
        // )} */}

        <Layout className="site-layout">
          
            <Header className="site-layout-background" style={{ padding: 0 }}>
              {React.createElement(
                collapsed ? RightCircleOutlined : LeftCircleOutlined,
                {
                  style: {
                    fontSize: "30px",
                    color: "#08c",
                  },
                  className: "trigger",
                  onClick: toggle,
                }
              )}
            </Header>
        

          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Route exact path="/" component={Home} />
            <Route exact path="/staff" component={TableStaff} />
            <Route exact path="/setting" component={Setting} />
            <Route
              exact
              path="/detail-staff/:id"
              component={DetailStaff}
            />
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default LayoutPage;
