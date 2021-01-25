import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Card } from "antd";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Login() {
  const onFinish = (values) => {
    axios({
      method: "post",
      url: "/api/auth/login",
      data: values,
    }).then(function (response) {
      localStorage.setItem("access_token", response.data);
      if (
        localStorage.getItem("access_token") !== null &&
        localStorage.getItem("access_token") !== "undefined"
      ) {
        window.location.replace("/");
      } else {
        alert(response.error);
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: 300 }}>
        <img
          className="logo"
          alt="logo"
          src="https://www.aimesoft.com/assets/aimesoft/images/logo.png"
          style={{ width: 250 }}
        ></img>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
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
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Lưu mật khẩu</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
           
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
}
