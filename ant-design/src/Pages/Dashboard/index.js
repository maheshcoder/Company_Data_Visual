import { useState } from 'react';
import { Calendar, Typography, List, DatePicker, Button, Space, Input, Select } from 'antd';
import moment from 'moment';

const { Option } = Select;

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [listData, setListData] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddToList = () => {
    if (selectedDate) {
      const dateString = moment(selectedDate).format('YYYY-MM-DD');
      setListData([...listData, { date: dateString, description: 'New item', priority: 'Medium', status: 'Pending' }]);
      setSelectedDate(null);
    }
  };

  const handleDescriptionChange = (index, e) => {
    const newListData = [...listData];
    newListData[index].description = e.target.value;
    setListData(newListData);
  };

  // const handlePriorityChange = (index, value) => {
  //   const newListData = [...listData];
  //   newListData[index].priority = value;
  //   setListData(newListData);
  // };

  const handleStatusChange = (index, value) => {
    const newListData = [...listData];
    newListData[index].status = value;
    setListData(newListData);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {/* Calendar */}
      <div style={{ flex: '1 1 300px', padding: '20px' }}>
        <Typography.Title level={4}>Calendar</Typography.Title>
        <Calendar
          fullscreen={false}
          onSelect={handleDateChange}
        />
        {selectedDate && (
          <Typography.Paragraph>
            Selected Date: {moment(selectedDate).format('YYYY-MM-DD')}
          </Typography.Paragraph>
        )}
      </div>

      {/* List */}
      <div style={{ flex: '1 1 300px', padding: '20px', height: '400px', overflowY: 'scroll' }}>
        <Typography.Title level={4}>List</Typography.Title>
        <List
          dataSource={listData}
          renderItem={(item, index) => (
            <List.Item>
              <Space direction="vertical">
                <Typography.Text>Date: {item.date}</Typography.Text>
                <Input
                  placeholder="Enter description"
                  value={item.description}
                  onChange={(e) => handleDescriptionChange(index, e)}
                />
                <Select
                  value={item.status}
                  onChange={(value) => handleStatusChange(index, value)}
                >
                  <Option value="Pending">Pending</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="In Progress">In Progress</Option>
                </Select>
              </Space>
            </List.Item>
          )}
        />
        <Space direction="vertical" style={{ marginTop: '20px' }}>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
          <Button type="primary" onClick={handleAddToList} style={{ width: '100%' }}>Add to List</Button>
        </Space>
      </div>
    </div>
  );
}

export default Dashboard;
