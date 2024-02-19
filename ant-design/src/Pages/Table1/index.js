import React, { useState, useEffect } from 'react';
import { Table, Typography, Upload, Button, Modal, Form, Input, Space,message } from 'antd';
import { UploadOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import Highlighter from 'react-highlight-words'; // Import Highlighter component


const { Column } = Table;
const { confirm } = Modal;
// const { TextArea } = Input;

function Table1() {
  const [tableData, setTableData] = useState(() => {
    const savedData = localStorage.getItem('tableData');
    return savedData ? JSON.parse(savedData) : [];
  });

  
  
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');


  const handleUpload = (file) => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const newData = result.data.filter((newItem) => {
          return !tableData.some((existingItem) => {
            return existingItem['Employee ID'] === newItem['Employee ID'];
          });
        });
  
        if (newData.length > 0) {
          setTableData((prevData) => [...prevData, ...newData]);
          localStorage.setItem('tableData', JSON.stringify([...tableData, ...newData]));
  
          // Update tableData in Table2.js
          const table2Data = localStorage.getItem('tableData2');
          if (table2Data) {
            const updatedData = JSON.parse(table2Data).concat(newData);
            localStorage.setItem('tableData2', JSON.stringify(updatedData));
          } else {
            localStorage.setItem('tableData2', JSON.stringify(newData));
          }
  
          // Update tableData in Table3.js
          const table3Data = localStorage.getItem('tableData3');
          if (table3Data) {
            const updatedData = JSON.parse(table3Data).concat(newData);
            localStorage.setItem('tableData3', JSON.stringify(updatedData));
          } else {
            localStorage.setItem('tableData3', JSON.stringify(newData));
          }
  
          // Update tableData in Table4.js
          const table4Data = localStorage.getItem('tableData4');
          if (table4Data) {
            const updatedData = JSON.parse(table4Data).concat(newData);
            localStorage.setItem('tableData4', JSON.stringify(updatedData));
          } else {
            localStorage.setItem('tableData4', JSON.stringify(newData));
          }
  
          // Update tableData in Table5.js
          const table5Data = localStorage.getItem('tableData5');
          if (table5Data) {
            const updatedData = JSON.parse(table5Data).concat(newData);
            localStorage.setItem('tableData5', JSON.stringify(updatedData));
          } else {
            localStorage.setItem('tableData5', JSON.stringify(newData));
          }
          message.success('CSV uploaded successfully');
        }
      },
      error: (err) => {
        console.error(err);
        message.error('Error uploading CSV');
      },
    });
  };
  
  const handleAdd = () => {
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditingId(record['Employee ID']);
    setVisible(true);
  };

  const handleDelete = (record) => {
    confirm({
      title: 'Are you sure you want to delete this row?',
      onOk() {
        const newData = tableData.filter(item => item['Employee ID'] !== record['Employee ID']);
        setTableData(newData);
        localStorage.setItem('tableData', JSON.stringify(newData));
      },
      onCancel() {},
    });
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingId(null);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingId) {
        const newData = tableData.map(item => item['Employee ID'] === editingId ? values : item);
        setTableData(newData);
        localStorage.setItem('tableData', JSON.stringify(newData));
        setEditingId(null);
      } else {
        setTableData([...tableData, values]);
        localStorage.setItem('tableData', JSON.stringify([...tableData, values]));
      }
      form.resetFields();
      setVisible(false);
    });
  };

  
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setTableData(JSON.parse(savedData));
    }
  }, []);


 return (
    <div>
      <Typography.Title level={3}>Employee Details</Typography.Title>
      <Button onClick={handleAdd}>Add Row</Button>
      <Upload beforeUpload={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>Upload CSV</Button>
      </Upload>
      <Table dataSource={tableData} bordered pagination={{ pageSize: 6 }}>
        <Column title="Name" dataIndex="Name" key="Name" {...getColumnSearchProps('Name')} />
        <Column title="Age" dataIndex="Age" key="Age" />
        <Column title="Email" dataIndex="Email" key="Email" />
        <Column title="Address" dataIndex="Address" key="Address" />
        <Column title="Role" dataIndex="Role" key="Role" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
              <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
            </Space>
          )}
        />
      </Table>
      <Modal
        title={editingId ? 'Edit Row' : 'Add Row'}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Age" label="Age" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Role" label="Role" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Table1;