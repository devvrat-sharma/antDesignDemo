import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./content.css";
import {
  Row,
  Col,
  Button,
  Table,
  Input,
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Switch,
} from "antd";

import AddRecord from "../AddRecord/addRecord"
import {
  alphaNumericRegex,
  alphaNumericWithoutSpecialsRegex,
} from "../../constants/constants";

import { Typography } from "antd";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const { Text } = Typography;

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      loading: false,
      visible: false,
      users: [],
      confirmDirty: false,
      ticketNumber: null,
      noOfAccounts: null,
      hoursSaved: null,
      executionDate: null,
      executedBy: null,
      errors: {
        ticketNumber: "",
        noOfAccounts: "",
        hoursSaved: "",
        executionDate: "",
        executedBy: "",
      },
    };
  }

  componentDidMount() {
    let users = localStorage.getItem("users");
    this.setState({ users });
  }

  handleChange = (event) => {
    // event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "ticketNumber":
        errors.ticketNumber = !value
          ? "Please enter a value"
          : alphaNumericRegex.test(value)
          ? ""
          : "Please enter an alphanumeric value with special characters!";
        break;
      case "noOfAccounts":
        errors.noOfAccounts = !value ? "Please enter value!" : "";
        break;
      case "hoursSaved":
        errors.hoursSaved = !value ? "Please enter value!" : "";
        break;
      case "executedBy":
        errors.executedBy = !value
          ? "Please enter a value"
          : alphaNumericWithoutSpecialsRegex.test(value)
          ? ""
          : "Please enter an alphanumeric value without special characters!";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleSubmit = () => {
    let data = localStorage.getItem("data");
    let userData = {
      id: 1,
      ticketNumber: this.state.ticketNumber,
      noOfAccounts: this.state.noOfAccounts,
      hoursSaved: this.state.hoursSaved,
      executionDate: this.state.executionDate,
      executedBy: this.state.executedBy,
    };
    if (data) {
      let localStorageData = JSON.parse(data);
      userData.id = localStorageData.length + 1;
      localStorageData.push(userData);
      localStorage.setItem("data", JSON.stringify(localStorageData));
      this.setState({ visible: false });
    } else {
      let data = [];
      data.push(userData);
      localStorage.setItem("data", JSON.stringify(data));
      this.setState({ visible: false });
    }
    // this.setState({ loading: true });
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
  };

  // handleCancel = () => {
  //   this.setState({ visible: false });
  // };

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
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
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
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
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

  handleDateChange = (value, time) => {
    let errors = this.state.errors;
    console.log("asfsdv", time);
    if (!time || time === "" || time === "undefined") {
      errors.executionDate = "Please select a date!";
      this.setState({ errors });
    } else {
      errors.executionDate = "";
      this.setState({ executionDate: time });
    }
  };

  render() {
    function onChange(pagination, filters, sorter, extra) {
      console.log("params", pagination, filters, sorter, extra);
    }

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
        ...this.getColumnSearchProps("name"),
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ["descend"],
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: "20%",
        ...this.getColumnSearchProps("age"),
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        ...this.getColumnSearchProps("address"),
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (record) => (
          <React.Fragment>
            <a onClick={() => alert(record.name)}>Edit</a>
            <a style={{ marginLeft: 20 }}>Delete</a>
          </React.Fragment>
        ),
      },
    ];

    const { visible, loading, errors } = this.state;

    return (
      <div className="contentContainer" id="a">
        {this.state.visible ? <AddRecord visible={this.state.visible}/> : <React.Fragment></React.Fragment>}
        {/* <Modal
          visible={visible}
          title="Title"
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleSubmit}
            >
              Submit
            </Button>,
          ]}
        >
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            layout="horizontal"
            initialValues={{
              size: "large",
            }}
            size="large"
          >
            <Form.Item label="Ticket Number*" rules={[{ required: true }]}>
              <Input
                name="ticketNumber"
                value={this.state.ticketNumber}
                onChange={this.handleChange}
                required
              />
              {errors.ticketNumber.length > 0 && (
                <span className="error">{errors.ticketNumber}</span>
              )}
            </Form.Item>

            <Form.Item label="No of Accounts" rules={[{ required: true }]}>
              <Input
                type="number"
                name="noOfAccounts"
                value={this.state.noOfAccounts}
                onChange={this.handleChange}
                required
              />
              {errors.noOfAccounts.length > 0 && (
                <span className="error">{errors.noOfAccounts}</span>
              )}
            </Form.Item>
            <Form.Item label="Hours Saved" rules={[{ required: true }]}>
              <Input
                type="number"
                step="0.01"
                name="hoursSaved"
                value={this.state.hoursSaved}
                onChange={this.handleChange}
                required
              />
              {errors.hoursSaved.length > 0 && (
                <span className="error">{errors.hoursSaved}</span>
              )}
            </Form.Item>
            <Form.Item label="Execution Date" rules={[{ required: true }]}>
              <DatePicker
                format="DD/MM/YYYY"
                name="executionDate"
                onChange={this.handleDateChange}
                required
              />
              {errors.executionDate.length > 0 && (
                <span className="error">{errors.executionDate}</span>
              )}
            </Form.Item>
            <Form.Item label="Executed By" rules={[{ required: true }]}>
              <Input
                name="executedBy"
                value={this.state.executedBy}
                onChange={this.handleChange}
                required
              />
              {errors.executedBy.length > 0 && (
                <span className="error">{errors.executedBy}</span>
              )}
            </Form.Item>
          </Form>
        </Modal> */}
        <Row className="recordAddRow">
          <Col span={24}>
            <Button
              type="primary"
              className="recordAddButtton"
              icon={<PlusOutlined />}
              size="large"
              onClick={this.showModal}
            >
              Add Data
            </Button>
          </Col>
        </Row>
        <div className="contentTableBlock shadow">
          <Table
            columns={columns}
            dataSource={this.state.users}
            onChange={onChange}
          />
          ;
        </div>
      </div>
    );
  }
}

export default Content;
