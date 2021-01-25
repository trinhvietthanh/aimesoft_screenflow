import React, { useState } from "react";
import {
  MailTwoTone,
  LockTwoTone,
  UserOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Card, Row } from "antd";
import axios from "axios";

// // import * as actions from '../auth';

// const FormItem = Form.Item;
// class RegistrationForm extends React.Component {
//   state = {
//     confirmDirty: false,
//   };
//   handleSubmit = (item) => {
//     console.log(item.name);
// axios({
//   method: "post",
//   url: "/api/auth/signup",
//   data: item,
// });
//   };
//   onFinish = (values) => {
//     console.log(values);
//   };

//   validateToNextPassword = (values, pass, item3) => {
//     return true; // for simplicity
//   };
//   render() {
//     return (
//       <div>
//         <Row
//           type="flex"
//           justify="center"
//           align="middle"
//           style={{ minHeight: "100vh" }}
//         >
//           <Card style={{ width: 300 }}>
//             <Form onFinish={this.onFinish} className="sign-up-form">
//               <FormItem
//                 name="fist_name"
//                 rules={[
//                   { required: true, message: "Please input your Username!" },
//                 ]}
//               >
//                 <Input
//                   prefix={
//                     <UserOutlined
//                       type="user"
//                       style={{ color: "rgba(0,0,0,.25)" }}
//                     />
//                   }
//                   placeholder="fist_name"
//                 />
//               </FormItem>
//               <FormItem
//                 name="last_name"
//                 rules={[
//                   { required: true, message: "Please input your Username!" },
//                 ]}
//               >
//                 <Input
//                   prefix={
//                     <UserOutlined
//                       type="user"
//                       style={{ color: "rgba(0,0,0,.25)" }}
//                     />
//                   }
//                   placeholder="last_name"
//                 />
//               </FormItem>
//               <FormItem
//                 name="dob"
//                 rules={[
//                   { required: true, message: "Please input your Username!" },
//                 ]}
//               >
//                 <Input placeholder="dob" />
//               </FormItem>
//               <FormItem
//                 name="email"
//                 rules={[
//                   {
//                     type: "email",
//                     message: "The input is not valid E-mail!",
//                   },
//                   {
//                     required: true,
//                     message: "Please input your E-mail!",
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={
//                     <MailTwoTone
//                       type="mail"
//                       style={{ color: "rgba(0,0,0,.25)" }}
//                     />
//                   }
//                   placeholder="Email"
//                 />
//               </FormItem>

//               <FormItem
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your Password!",
//                   },
//                   {
//                     validator: this.validateToNextPassword,
//                   },
//                 ]}
//               >
//                 <Input
//                   prefix={
//                     <LockTwoTone
//                       type="lock"
//                       style={{ color: "rgba(0,0,0,.25)" }}
//                     />
//                   }
//                   type="password"
//                   placeholder="Password"
//                 />
//               </FormItem>

//               <FormItem
//                 name="confirm"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please confirm your password!",
//                   },
//                   ({ getFieldValue }) => ({
//                     validator(rule, value) {
//                       if (!value || getFieldValue("password") === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject("password does not match!");
//                     },
//                   }),
//                 ]}
//               >
//                 <Input
//                   prefix={
//                     <LockTwoTone
//                       type="lock"
//                       style={{ color: "rgba(0,0,0,.25)" }}
//                     />
//                   }
//                   type="password"
//                   placeholder="Confirm Password"
//                   onBlur={this.handleConfirmBlur}
//                 />
//               </FormItem>

//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form>
//           </Card>
//         </Row>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     loading: state.loading,
//     error: state.error,
//   };
// };
// // const mapDispatchToProps = dispatch => {
// // return {
// //     onAuth: (username, email, password1, password2) =>
// // dispatch(actions.authSignup(username, email, password1, password2))
// // }
// // }
// export default RegistrationForm;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const RegistrationForm = () => {
  const [confirmDirty, SetConfirmDirty] = useState(false);
  const onFinish = (item) => {
    axios({
      method: "post",
      url: "/api/auth/signup",
      data: item,
    });
  };
  const validateToNextPassword = (values, pass, item3) => {
    return true; // for simplicity
  };
  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    SetConfirmDirty(confirmDirty || !!value);
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "200vh" }}
    >
      <Card style={{ width: 500 }}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"first_name"}
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined
                  type="user"
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              placeholder="first_name"
            />
          </Form.Item>
          <Form.Item
            name={"last_name"}
            label="Last Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"dob"}
            label="dob"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              prefix={
                <MailTwoTone type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
              }
            />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                validator: validateToNextPassword,
              },
            ]}
          >
            <Input
              prefix={
                <LockTwoTone type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
          label="Confirm Password"
            name="confirm"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("password does not match!");
                },
              }),
            ]}
          >
            <Input
              prefix={
                <LockTwoTone type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              type="password"
              placeholder="Confirm Password"
              onBlur={handleConfirmBlur}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};

export default RegistrationForm;
