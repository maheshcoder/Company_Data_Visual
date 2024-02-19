import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, Button, Space } from 'antd';
import {  DeleteOutlined } from '@ant-design/icons';

const { Column } = Table;
const { Search } = Input;

function Table4() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('tableData4');
    if (savedData) {
      setTableData(JSON.parse(savedData));
      setFilteredData(JSON.parse(savedData));
    }
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = tableData.filter(item =>
      item['Employee ID'].toLowerCase().includes(value.toLowerCase()) ||
      item['Team'].toLowerCase().includes(value.toLowerCase()) ||
      item['Work Status'].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = (record) => {
    const newData = tableData.filter(item => item['Employee ID'] !== record['Employee ID']);
    setTableData(newData);
    localStorage.setItem('tableData4', JSON.stringify(newData));
    setFilteredData(filteredData.filter(item => item['Employee ID'] !== record['Employee ID']));
  };

  return (
    <div>
      <Typography.Title level={3}>Employee Work Status</Typography.Title>
      <Search
        placeholder="Search by Employee ID, Team, or Work Status"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={filteredData} bordered pagination={{ pageSize: 6 }}>
        <Column title="Employee ID" dataIndex="Employee ID" key="Employee ID" />
        <Column title="Team" dataIndex="Team" key="Team" />
        <Column title="Project Role" dataIndex="Project Role" key="Project Role" />
        <Column title="Work Status" dataIndex="Work Status" key="Work Status" />
        <Column title="Start Date" dataIndex="Start Date" key="Start Date" />
        <Column title="End Date" dataIndex="End Date" key="End Date" />
        <Column title="Performance" dataIndex="Performance" key="Performance" />
        <Column title="Rate" dataIndex="Rate" key="Rate" />
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

export default Table4;
