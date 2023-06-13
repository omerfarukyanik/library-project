import { SearchOutlined } from "@ant-design/icons";
import { App, Button, Input, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useTranslation } from "react-i18next";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../redux/api/adminApi";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stringSortLambdaFunction } from "../utils";
import UserDetailTableFooter from "../components/UserDetailTableFooter";
import { useGetSessionQuery } from "../../redux/api/credentialsApi";
const AdminUsersDetailPage = ({ username, csrfToken }) => {
  const { modal, message } = App.useApp();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { t } = useTranslation();
  const formData = new FormData();
  formData.append("username", username);
  const userResults = useGetUsersQuery();
  const [deleteUser, deleteUserResults] = useDeleteUserMutation();
  const [selectedRow, setSelectedRow] = useState();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    if (deleteUserResults.isSuccess) {
      message.success(deleteUserResults.data?.message);
    } else if (deleteUserResults.isError) {
      message.error(deleteUserResults.error?.data?.message);
    }
  }, [deleteUserResults, message]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            {t("search")}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            {t("reset")}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            {t("filter")}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            {t("close")}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: t("username"),
      dataIndex: "user_name",
      key: "username",
      ...getColumnSearchProps("username"),
      sorter: stringSortLambdaFunction,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("name"),
      dataIndex: "first_name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: stringSortLambdaFunction,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("surname"),
      dataIndex: "last_name",
      key: "surname",
      width: "20%",
      ...getColumnSearchProps("surname"),
      sorter: stringSortLambdaFunction,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
      sorter: stringSortLambdaFunction,
      sortDirections: ["descend", "ascend"],
    },
  ];
  const handleOk = async (e) => {
    const formData = new FormData();
    await formData.append("user_name", selectedRow.user_name);
    await deleteUser({
      formData,
      headers: {
        "X-CSRFToken": csrfToken,
      },
    });
    e();
  };
  const handleOnRowClick = (event, record, rowIndex) => {
    console.log(record);
    setSelectedRow(record);
    modal.confirm({
      title: t("confirm.delete.user"),
      content: record.user_name,
      cancelText: t("cancel"),
      okText: t("ok"),
      onOk: handleOk,
    });
  };
  return (
    <Table
      columns={columns}
      dataSource={userResults.data?.data}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            handleOnRowClick(event, record, rowIndex);
          },
        };
      }}
      footer={() => <UserDetailTableFooter />}
    />
  );
};

AdminUsersDetailPage.prototype = {
  username: PropTypes.string,
  csrfToken: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    username: state.credentials.username,
    csrfToken: state.credentials.csrfToken,
  };
}

export default connect(mapStateToProps)(AdminUsersDetailPage);
