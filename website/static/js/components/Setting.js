import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, TimePicker } from "antd";
import { Helmet } from "react-helmet";
import axios from "axios";
import moment from "moment";

export default function Setting() {
  const [form] = Form.useForm();
  const [time, setTime] = useState([]);
  const hoursFormat = "HH:mm:ss";
  const [time_line, setTimeLine] = useState({});

  useEffect(() => {
    axios
      .get("/api/time/output")
      .then((res) => {
        setTime(res.data);
        setTimeLine({
          time_start_am: moment(moment(res.data.time_start_am['$date']).format()),
          time_end_am: moment(moment(res.data.time_end_am['$date']).format()),
          time_start_pm: moment(moment(res.data.time_start_pm['$date']).format()),
          time_end_pm: moment(moment(res.data.time_end_pm['$date']).format()),
        });
       
      })
      .catch((err) => console.log(err));
    
    
    form.setFieldsValue(time_line);
  }, []);

  const onChange = (values) => {
    axios
      .put(`api/time/update?id=${time._id.$oid}`, values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cài đặt</title>
        <link rel="canonical" href="http://127.0.0.1:5000/setting" />
      </Helmet>
      <h2>Thời gian làm việc</h2>
      
      {time_line.time_start_pm != undefined ? (
        <Form
          form={form}
          layout="horizontal"
          onFinish={onChange}
          initialValues={time_line}
        >
          
          <Row>
            <Col xs={24} xl={6}>
              <Form.Item label="Từ:" name="time_start_am">
                <TimePicker format={hoursFormat} size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} xl={6}>
              <Form.Item label="Đến:" name="time_end_am">
                <TimePicker format={hoursFormat} size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} xl={6}>
              <Form.Item label="Từ:" name="time_start_pm">
                <TimePicker format={hoursFormat} size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} xl={6}>
              <Form.Item label="Đến:" name="time_end_pm">
                <TimePicker format={hoursFormat} size="large" />
              </Form.Item>
            </Col>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sửa
              </Button>
            </Form.Item>
          </Row>
        </Form>
      ) : null}
    </>
  );
}
