import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, Button, Space, Tag } from 'antd';
import {  DeleteOutlined } from '@ant-design/icons';

const { Column } = Table;
const { Search } = Input;

function Table5() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('tableData5');
    if (savedData) {
      setTableData(JSON.parse(savedData));
      setFilteredData(JSON.parse(savedData));
    }
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = tableData.filter(item =>
      item['Name'].toLowerCase().includes(value.toLowerCase()) ||
      item['Leave Type'].toLowerCase().includes(value.toLowerCase()) ||
      item['Status'].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = (record) => {
    const newData = tableData.filter(item => item['Name'] !== record['Name']);
    setTableData(newData);
    localStorage.setItem('tableData5', JSON.stringify(newData));
    setFilteredData(filteredData.filter(item => item['Name'] !== record['Name']));
  };

  return (
    <div>
      <Typography.Title level={3}>Employee Leave</Typography.Title>
      <Search
        placeholder="Search by Name, Leave Type, or Status"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={filteredData} bordered pagination={{ pageSize: 6 }}>
        <Column title="Name" dataIndex="Name" key="Name" />
        <Column title="Leave Type" dataIndex="Leave Type" key="Leave Type" />
        <Column title="Number of Days" dataIndex="Number of Days" key="Number of Days" />
        <Column
          title="Status"
          dataIndex="Status"
          key="Status"
          render={(status) => (
            <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
          )}
        />
        <Column title="Feedback" dataIndex="Feedback" key="Feedback" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
}

export default Table5;
