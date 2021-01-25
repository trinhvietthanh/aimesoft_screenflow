import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Radio, Select, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
export default function ModalExport({ element }) {
  let today = new Date();
  let employee = "";
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onDownloadFile = (value) => {
    console.log(value);
    if (value.decision == 1) {
      axios({
        method: "get",
        url: "/export",
        params: {
          users: employee,
          month: value.month,
          year: value.year,
        },
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "employee_report.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    } else {
      axios({
        method: "get",
        url: "/export",
        params: {
          users: "all",
          month: value.month,
          year: value.year,
        },
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "employee_report.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    }
    setVisible(false);
  };
  useEffect(() => {}, []);
  element.forEach((value) => {
    if (employee != "") {
      employee = employee + "," + String(value.$oid);
    } else {
      employee = String(value.$oid);
    }
  });
  return (
    <div>
      <Button className="export" onClick={() => setVisible(true)}>
        <DownloadOutlined />
        Xuất excel
      </Button>
      <Modal
        visible={visible}
        title="Xuất Excel"
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onDownloadFile(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        cancelText="Hủy"
        onCancel={() => setVisible(false)}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            decision: value,
            month: today.getMonth() + 1,
            year: today.getFullYear(),
          }}
          name="form_in_modal"
        >
          <Form.Item label="Xuất dữ liêu:" name="decision">
            <Radio.Group onChange={onChange} defaultValue={value}>
              <Radio value={1}>Các nhân viên đã chọn</Radio>
              <br />
              <Radio value={2}>Tất cả các nhân viên</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="RadioGroup">
            <Row>
              <Col span={12}>
                <label>Tháng: </label>
                <Form.Item name="month" className="timeline">
                  <Select
                    defaultValue={today.getMonth() + 1}
                    style={{ width: 120 }}
                  >
                    <Option value="01">1</Option>
                    <Option value="02">2</Option>
                    <Option value="03">3</Option>
                    <Option value="04">4</Option>
                    <Option value="05">5</Option>
                    <Option value="06">6</Option>
                    <Option value="07">7</Option>
                    <Option value="08">8</Option>
                    <Option value="09">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <label>Năm: </label>
                <Form.Item name="year" className="timeline">
                  <Select
                    defaultValue={today.getFullYear()}
                    style={{ width: 120 }}
                  >
                    <Option value="2017">2017</Option>
                    <Option value="2018">2018</Option>
                    <Option value="2019">2019</Option>
                    <Option value="2020">2020</Option>
                    <Option value="2021">2021</Option>
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                    <Option value="2024">2024</Option>
                    <Option value="2025">2025</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
