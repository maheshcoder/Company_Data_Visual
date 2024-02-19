import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { AppstoreOutlined, TableOutlined, MenuFoldOutlined, LineChartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import "../SideMenu/SideMenu.css";

function SideMenu() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="SideMenu">
      <Button type="primary" onClick={handleCollapse} style={{ marginBottom: 16 }}>
        <MenuFoldOutlined />
      </Button>
      <Menu
        mode="inline"
        onClick={(item) => {
          navigate(item.key);
        }}
        inlineCollapsed={collapsed}
        defaultSelectedKeys={['/']}
      >
        <Menu.Item key="/" icon={<AppstoreOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="/table1" icon={<TableOutlined />}>
          Table1
        </Menu.Item>
        <Menu.Item key="/table2" icon={<TableOutlined />}>
          Table2
        </Menu.Item>
        <Menu.Item key="/table3" icon={<TableOutlined />}>
          Table3
        </Menu.Item>
        <Menu.Item key="/table4" icon={<TableOutlined />}>
          Table4
        </Menu.Item>
        <Menu.Item key="/table5" icon={<TableOutlined />}>
          Table5
        </Menu.Item>
        <Menu.Item key="/graph" icon={<LineChartOutlined />}>
          Graph
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SideMenu;
