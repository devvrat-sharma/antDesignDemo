import React, { Component } from "react";
import { Button, Table, Input } from "antd";

import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
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
    this.setState({ data: this.props.data });
  }

  // handleChange = (event) => {
  //   // event.preventDefault();
  //   const { name, value } = event.target;
  //   let errors = this.state.errors;

  //   switch (name) {
  //     case "ticketNumber":
  //       errors.ticketNumber = !value
  //         ? "Please enter a value"
  //         : alphaNumericRegex.test(value)
  //         ? ""
  //         : "Please enter an alphanumeric value with special characters!";
  //       break;
  //     case "noOfAccounts":
  //       errors.noOfAccounts = !value ? "Please enter value!" : "";
  //       break;
  //     case "hoursSaved":
  //       errors.hoursSaved = !value ? "Please enter value!" : "";
  //       break;
  //     case "executedBy":
  //       errors.executedBy = !value
  //         ? "Please enter a value"
  //         : alphaNumericWithoutSpecialsRegex.test(value)
  //         ? ""
  //         : "Please enter an alphanumeric value without special characters!";
  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState({ errors, [name]: value });
  // };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // handleSubmit = () => {
  //   let data = localStorage.getItem("data");
  //   let userData = {
  //     id: 1,
  //     ticketNumber: this.state.ticketNumber,
  //     noOfAccounts: this.state.noOfAccounts,
  //     hoursSaved: this.state.hoursSaved,
  //     executionDate: this.state.executionDate,
  //     executedBy: this.state.executedBy,
  //   };
  //   if (data) {
  //     let localStorageData = JSON.parse(data);
  //     userData.id = localStorageData.length + 1;
  //     localStorageData.push(userData);
  //     localStorage.setItem("data", JSON.stringify(localStorageData));
  //     this.setState({ visible: false });
  //   } else {
  //     let data = [];
  //     data.push(userData);
  //     localStorage.setItem("data", JSON.stringify(data));
  //     this.setState({ visible: false });
  //   }
  //   // this.setState({ loading: true });
  //   // setTimeout(() => {
  //   //   this.setState({ loading: false, visible: false });
  //   // }, 3000);
  // };

  handleCancel = () => {
    this.setState({ visible: false });
  };

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

  // handleDateChange = (value, time) => {
  //   let errors = this.state.errors;
  //   console.log("asfsdv", time);
  //   if (!time || time === "" || time === "undefined") {
  //     errors.executionDate = "Please select a date!";
  //     this.setState({ errors });
  //   } else {
  //     errors.executionDate = "";
  //     this.setState({ executionDate: time });
  //   }
  // };

  render() {
    function onChange(pagination, filters, sorter, extra) {
      console.log("params", pagination, filters, sorter, extra);
    }

    const columns = [
      {
        title: "Ticket No",
        dataIndex: "ticketNumber",
        key: "ticketNumber",
        width: "20%",
        ...this.getColumnSearchProps("ticketNumber"),
        onFilter: (value, record) => record.ticketNumber.indexOf(value) === 0,
        sorter: (a, b) => a.ticketNumber.length - b.ticketNumber.length,
        sortDirections: ["descend"],
      },
      {
        title: "Number of Accounts",
        dataIndex: "noOfAccounts",
        key: "noOfAccounts",
        width: "20%",
        ...this.getColumnSearchProps("noOfAccounts"),
        sorter: (a, b) => a.noOfAccounts - b.noOfAccounts,
      },
      {
        title: "Hours Saved",
        dataIndex: "hoursSaved",
        key: "hoursSaved",
        ...this.getColumnSearchProps("hoursSaved"),
        // onFilter: (value, record) => record.hoursSaved.indexOf(value) === 0,
        sorter: (a, b) => a.hoursSaved - b.hoursSaved,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Execution Date",
        dataIndex: "executionDate",
        key: "executionDate",
        ...this.getColumnSearchProps("executionDate"),
      },
      {
        title: "Executed By",
        dataIndex: "executedBy",
        key: "executedBy",
        ...this.getColumnSearchProps("executedBy"),
        // onFilter: (value, record) => record.hoursSaved.indexOf(value) === 0,
        sorter: (a, b) => a.executedBy.length - b.length,
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
    const { data } = this.props;
    console.log("this props", this.props.data);
    console.log("----data", data);

    return <Table columns={columns} dataSource={data} onChange={onChange} />;
  }
}

export default Report;
