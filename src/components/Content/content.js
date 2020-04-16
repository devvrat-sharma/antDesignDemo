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
      editMode: false,
      editRecordData : null
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

  setEditMode = () => {
    this.setState({ editMode: true });
  };

  setEditModeCancel = () => {
    this.setState({ editMode: false });
  }

  setEditData = (record) => {
    this.setState({ editRecordData: record })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    return (
      <div className="contentContainer">
        {this.state.visible ? (
          <AddRecord
            visible={this.state.visible}
            setData={this.setData}
            editMode={this.state.editMode}
            setEditMode={this.setEditMode} 
            setEditModeCancel={this.setEditModeCancel}
            editRecordData={this.state.editRecordData}
          />
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
          <Report data={this.state.data} setData={this.setData} editMode={this.state.editMode} setEditMode={this.setEditMode} showModal={this.showModal} setEditModeCancel={this.setEditModeCancel} setEditData={this.setEditData}/>
        </div>
      </div>
    );
  }
}

export default Content;
