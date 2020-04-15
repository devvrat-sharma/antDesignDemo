import React, { Component } from "react";
import "./content.css";
import { Row, Col, Button } from "antd";

import AddRecord from "../AddRecord/addRecord";
import Report from "../Report/report";

import { PlusOutlined } from "@ant-design/icons";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: false,
      data: [],
    };
  }

  componentDidMount() {
    let usersData = localStorage.getItem("data");
    this.setState({ data: JSON.parse(usersData) });
  }

  setData = () => {
    let usersData = localStorage.getItem("data");
    this.setState({ data: JSON.parse(usersData), visible: false });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
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

    return (
      <div className="contentContainer">
        {this.state.visible ? (
          <AddRecord visible={this.state.visible} setData={this.setData} />
        ) : (
          <React.Fragment></React.Fragment>
        )}
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
          <Report data={this.state.data} />
        </div>
      </div>
    );
  }
}

export default Content;
