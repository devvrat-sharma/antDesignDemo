import React, { Component } from "react";
import { Button, Input, Modal, Form, DatePicker } from "antd";

import {
  alphaNumericRegex,
  alphaNumericWithoutSpecialsRegex,
} from "../../constants/constants";

import * as moment from "moment";

import "./addRecord.css";

class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: this.props.visible,
      ticketNumber: this.props.editMode
        ? this.props.editRecordData.ticketNumber
        : null,
      noOfAccounts: this.props.editMode
        ? this.props.editRecordData.noOfAccounts
        : null,
      hoursSaved: this.props.editMode
        ? this.props.editRecordData.hoursSaved
        : null,
      executionDate: this.props.editMode
        ? this.props.editRecordData.executionDate
        : null,
      executedBy: this.props.editMode
        ? this.props.editRecordData.executedBy
        : null,
      globalError: null,
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
    this.setState({ visible: this.props.visible });
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.setData();
    this.props.setEditModeCancel();
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "ticketNumber":
        errors.ticketNumber = !value
          ? "Please enter a value"
          : alphaNumericRegex.test(value)
          ? ""
          : "Please enter a value with one lower case letter, one digit, one special characeter from !@#$%_*$ with more character between 4-15";
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

  handleDateChange = (value, time) => {
    let errors = this.state.errors;
    if (!time || time === "" || time === "undefined") {
      errors.executionDate = "Please select a date!";
      this.setState({ errors });
    } else {
      errors.executionDate = "";
      this.setState({ executionDate: time });
    }
  };

  validateAllFields = () => {
    const {
      ticketNumber,
      noOfAccounts,
      hoursSaved,
      executionDate,
      executedBy,
    } = this.state;
    if (
      !ticketNumber ||
      !noOfAccounts ||
      !hoursSaved ||
      !executionDate ||
      !executedBy
    ) {
      return true;
    } else {
      return false;
    }
  };

  handleSubmit = () => {
    let data = localStorage.getItem("data");
    let valid = this.validateAllFields();
    if (valid) {
      this.setState({ globalError: "Please enter all values!" });
    } else {
      if (this.props.editMode) {
        let dataArray = JSON.parse(data);
        let objIndex = dataArray.findIndex(
          (obj) => obj.id == this.props.editRecordData.id
        );

        dataArray[objIndex].id = this.props.editRecordData.id;
        dataArray[objIndex].ticketNumber = this.state.ticketNumber;
        dataArray[objIndex].noOfAccounts = this.state.noOfAccounts;
        dataArray[objIndex].hoursSaved = this.state.hoursSaved;
        dataArray[objIndex].executionDate = this.state.executionDate;
        dataArray[objIndex].executedBy = this.state.executedBy;

        localStorage.setItem("data", JSON.stringify(dataArray));
        this.setState({ visible: false });
        this.props.setData();
        this.props.setEditModeCancel();
      } else {
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
          this.props.setData();
          this.props.setEditModeCancel();
        } else {
          let data = [];
          data.push(userData);
          localStorage.setItem("data", JSON.stringify(data));
          this.setState({ visible: false });
          this.props.setData();
          this.props.setEditModeCancel();
        }
      }
    }
  };

  render() {
    const { visible, loading, errors } = this.state;

    return (
      <React.Fragment>
        <Modal
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
                defaultValue={
                  this.props.editMode
                    ? moment(this.state.executionDate, "DD/MM?YYYY")
                    : null
                }
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
              {this.state.globalError && this.state.globalError.length > 0 && (
                <span className="error">{this.state.globalError}</span>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddRecord;
