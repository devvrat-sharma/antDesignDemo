import React, { Component } from "react";
import { Button, Table, Input, Modal } from "antd";

import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const { confirm } = Modal;

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      searchText: "",
      searchedColumn: "",
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showConfirm = (id) => {
    const self = this;
    confirm({
      title: "Do you want to delete this record?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        self.deleteRecord(id);
      },
      onCancel() {},
    });
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

  deleteRecord = (id) => {
    let data = JSON.parse(localStorage.getItem("data"));
    var newData = data.filter(function (obj) {
      return obj.id !== id;
    });
    localStorage.setItem("data", JSON.stringify(newData));
    this.props.setData();
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  openEditModal = (record) => {
    this.props.setEditMode();
    this.props.showModal();
    this.props.setEditData(record)
  };

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
        sorter: (a, b) => a.executedBy.length - b.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (record) => (
          <React.Fragment>
            <a onClick={() => this.openEditModal(record)}>Edit</a>
            <a
              style={{ marginLeft: 20 }}
              onClick={() => this.showConfirm(record.id)}
            >
              Delete
            </a>
          </React.Fragment>
        ),
      },
    ];

    const { data } = this.props;

    return <Table columns={columns} dataSource={data} onChange={onChange} />;
  }
}

export default Report;
