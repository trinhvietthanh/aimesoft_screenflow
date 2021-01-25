import React from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { SearchOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import ModalExport from "./ExportExcel/ModalExport";
import axios from "axios";
import ModalEdit from "./Staff/ModalEdit";

export default class TableStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      selectedRowIDs: [],
      modal: false,
      dataEdit: {
        _id: "",
        name: "",
        birth: "",
        position: "",
      },
      data: [],
      users:""
    };
  }

  componentDidMount() {
    this.refreshList();
  }
  refreshList() {
    axios
      .get("/api/data/output")
      .then((res) => this.setState({ data: res.data }))
      .catch((err) => console.log(err));
  }
  onSelectChange = (selectedRowIDs) => {
    this.setState({ selectedRowIDs });
    
  };
  onEdit = (value) => {
    this.setState({ dataEdit: value });
    this.setState({ modal: true });
  };
  onSubmit = (value) =>{
    axios
        .post(`/api/edit/employee`, value, localStorage.getItem("access_token"))
        .then((res) => this.refreshList());
      return;
  }
  onCancel = (value) =>{
    this.setState({ modal: value })
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    // const match = useRouteMatch();
    const columns = [
      {
        title: "Tên nhân viên",
        dataIndex: "displayName",
        key: "displayName",
        width: "30%",
        ...this.getColumnSearchProps("displayName"),
      },
      {
        title: "Ngày sinh",
        dataIndex: "birth",
        key: "birth",
        width: "20%",
      },
      {
        title: "Vị tí",
        dataIndex: "affiliation",
        key: "affiliation",
        filters: [
          {
            text: "LTV",
            value: "LTV",
          },
          {
            text: "Kế Toán",
            value: "Kế Toán",
          },
        ],
        onFilter: (value, record) => record.position.indexOf(value) === 0,
      },
      {
        key: "action",
        render: (item) => (
          <>
            <Link
              to={{
                pathname: `/detail-staff/${item._id.$oid}`,
                param: item,
              }}
            >
              <EyeOutlined />
            </Link>

            <Button
              onClick={() => {
                this.onEdit(item);
              }}
            >
              <EditTwoTone />
            </Button>
          </>
        ),
      },
    ];
    const { selectedRowIDs } = this.state;
    const rowSelection = {
      selectedRowIDs,
      onChange: this.onSelectChange,
      
    };
    
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Nhân viên</title>
          <link rel="canonical" href="http://127.0.0.1:5000/staff" />
        </Helmet>
        <ModalExport element={this.state.selectedRowIDs} />

        <Table
          key={this.state.data._id}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          pagination={{ pageSize: 8 }}
          rowKey="_id"
        />

        <ModalEdit modal={this.state.modal} data={this.state.dataEdit} onSubmit={this.onSubmit} onCancel={this.onCancel}/>
      </>
    );
  }
}
