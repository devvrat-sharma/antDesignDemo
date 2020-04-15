import React, { Component } from "react";
import {
  Button,
  Input,
  Modal,
  Form,
  DatePicker,
} from "antd";

import {
  alphaNumericRegex,
  alphaNumericWithoutSpecialsRegex,
} from "../../constants/constants";

import "./addRecord.css";

class AddRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      loading: false,
      visible: this.props.visible,
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
    this.setState({ visible: this.props.visible });
  }

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.handleCancel();
  };

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
      this.props.handleCancel();
    } else {
      let data = [];
      data.push(userData);
      localStorage.setItem("data", JSON.stringify(data));
      this.setState({ visible: false });
      this.props.handleCancel();
    }
    // this.setState({ loading: true });
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
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
        </Modal>
      </React.Fragment>
    );
  }
}

export default AddRecord;
