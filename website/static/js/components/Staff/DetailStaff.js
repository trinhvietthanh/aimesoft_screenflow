import React, { useState, useEffect } from "react";
import { Table, Button, Select, Row, Col } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom"
import ModalEdit from "./ModalEdit";

const { Option } = Select;
const columns = [
  {
    title: "Ngày",
    dataIndex: "id",
  },
  {
    title: "Thời gian check in",
    dataIndex: "checkIn",
  },
  {
    title: "Thời gian check out",
    dataIndex: "checkOut",
  },
  {
    title: "Tổng thời gian làm việc",
    dataIndex: "total",
    key: "Total",
  },
];

function DetailStaff(props) {
  let today = new Date();
  const { match } = props;
  const [staff, setStaff] = useState({});
  const [month, setMonth] = useState(today.getMonth()+1);
  const [year, setYear] = useState(today.getFullYear());
  const [time, setTime] = useState([]);
  let { id } = match.params;
  const [visible, setVisible] = useState(false);
  const [length, setLength] = useState(0);
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/time/employee/output",
      params: {
        user: id,
      },
    })
      .then((res) => {
        setTime(res.data);
        setLength(res.data.length);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/employee/output",
      params: {
        id: id,
      },
    })
      .then((res) => setStaff(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (value) =>{
    axios
        .post(`/api/edit/employee`, value)
        .then((res) => setStaff(res.data));

  }
  const onCancel = (value) =>{
    setVisible(value)
  }
  const handleChangeMonth = (value) => {
    setMonth(value);
    axios({
      method: "get",
      url: "/api/time/employee/output",
      params: {
        user: id,
        month: value,
        year: year
      },
    })
      .then((res) => {
        setTime(res.data);
        setLength(res.data.length);
      })
      .catch((err) => console.log(err));
  };
  const onEdit = () => {
    setVisible(true)
  }
  const handleChangeYear = (value) => {
    setYear(value);
    axios({
      method: "get",
      url: "/api/time/employee/output",
      params: {
        user: id,
        month: month,
        year: value,
      },
    })
      .then((res) => {
        setTime(res.data);
        setLength(res.data.length);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Row>
        <Col span={6}>
          <label htmlFor="month">Tháng: </label>
          <Select
            name="month"
            defaultValue={today.getMonth() + 1}
            onChange={handleChangeMonth}
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
        </Col>
        <Col span={6}>
          <label htmlFor="year">Năm: </label>
          <Select
            defaultValue={today.getFullYear()}
            onChange={handleChangeYear}
            style={{ width: 120 }}
          >
            <Option value="2025">2025</Option>
            <Option value="2024">2024</Option>
            <Option value="2023">2023</Option>
            <Option value="2022">2022</Option>
            <Option value="2021">2021</Option>
            <Option value="2020">2020</Option>
            <Option value="2019">2019</Option>
            <Option value="2019">2018</Option>
            <Option value="2019">2017</Option>
          </Select>
        </Col>
        <Col span={12}>
        
          {length > 0 ? (
            <a
              href={
                "/export/excel/employee?users=" +
                id +
                "&month=" +
                month +
                "&year=" +
                year
              }
            >
              <Button className="export">
                <DownloadOutlined />
                Xuất excel
              </Button>
            </a>
          ) : null}
          <Button className="export" onClick={onEdit}>Sửa thông tin</Button>
         <Col span={6}>
          <Link to="/staff"> <Button className="export">Toàn bộ nhân viên</Button></Link>
         
          </Col>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <label htmlFor="name">
            <strong>Tên nhân viên: </strong>
          </label>
          <p>{staff.displayName}</p>
        </Col>
        <Col span={4}>
          <label htmlFor="date">
            <strong>Ngày sinh: </strong>
          </label>
          <p>{staff.birth}</p>
        </Col>
        <Col span={4}>
          <label htmlFor="">
            <strong>Vị trí</strong>
          </label>
          <p>{staff.affiliation}</p>
        </Col>
      </Row>
      <ModalEdit modal={visible} data={staff} onSubmit={onSubmit} onCancel={onCancel}></ModalEdit>
      <Table columns={columns} pagination={{ pageSize: 8 }} dataSource={time} />
    </div>
  );
}

export default DetailStaff;
