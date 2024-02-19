import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, Button, Space } from 'antd';
import {  DeleteOutlined } from '@ant-design/icons';

const { Column } = Table;
const { Search } = Input;

function Table2() {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('tableData2');
    if (savedData) {
      const uniqueData = JSON.parse(savedData).reduce((acc, current) => {
        const x = acc.find(item => item['Employee ID'] === current['Employee ID']);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setTableData(uniqueData);
      setFilteredData(uniqueData);
    }
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = tableData.filter(item =>
      item['Name'].toLowerCase().includes(value.toLowerCase()) ||
      item['Employee ID'].toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = (record) => {
    const newData = tableData.filter(item => item['Employee ID'] !== record['Employee ID']);
    setTableData(newData);
    localStorage.setItem('tableData2', JSON.stringify(newData));
    setFilteredData(filteredData.filter(item => item['Employee ID'] !== record['Employee ID']));
  };

  return (
    <div>
      <Typography.Title level={3}>Employee Details</Typography.Title>
      <Search
        placeholder="Search by Name or Employee ID"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={filteredData} bordered pagination={{ pageSize: 6 }}>
        <Column title="Name" dataIndex="Name" key="Name" />
        <Column title="Employee ID" dataIndex="Employee ID" key="Employee ID" />
        <Column title="Performance" dataIndex="Performance" key="Performance" />
        <Column
          title="Tags"
          dataIndex="Tags"
          key="Tags"
          render={(tags) => (
            <>
              {tags && tags.split(',').map((tag, index) => (
                <span key={index} style={{ margin: '0 5px' }}>{tag}</span>
              ))}
            </>
          )}
        />
        <Column title="Experience" dataIndex="Experience" key="Experience" />
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

export default Table2;
