import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, Button, Space, Tag } from 'antd';
import {  DeleteOutlined } from '@ant-design/icons';

const { Column } = Table;
const { Search } = Input;

function Table3() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('tableData3');
    if (savedData) {
      setTableData(JSON.parse(savedData));
      setFilteredData(JSON.parse(savedData));
    }
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = tableData.filter(item =>
      item['Employee ID'].toLowerCase().includes(value.toLowerCase()) ||
      item['Role'].toLowerCase().includes(value.toLowerCase()) ||
      item['Status'].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = (record) => {
    const newData = tableData.filter(item => item['Employee ID'] !== record['Employee ID']);
    setTableData(newData);
    localStorage.setItem('tableData3', JSON.stringify(newData));
    setFilteredData(filteredData.filter(item => item['Employee ID'] !== record['Employee ID']));
  };

  return (
    <div>
      <Typography.Title level={3}>Employee skill</Typography.Title>
      <Search
        placeholder="Search by Employee ID, Role, or Status"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={filteredData} bordered pagination={{ pageSize: 6 }}>
        <Column title="Employee ID" dataIndex="Employee ID" key="Employee ID" />
        <Column title="Role" dataIndex="Role" key="Role" />
        <Column title="Performance" dataIndex="Performance" key="Performance" />
        <Column title="Current Work" dataIndex="Current Work" key="Current Work" />
        <Column
          title="Status"
          dataIndex="Status"
          key="Status"
          render={(status) => (
            <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
          )}
        />
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

export default Table3;
