import { Image, Space, Typography } from "antd";

function Header() {
  return (
    <div className="Header">
      <Image
        width={40}
        src="https://tse3.mm.bing.net/th/id/OIG2.pDxVye1Pv4IOb69puU_b?pid=ImgGn" // Add your image URL here
        style={{ borderRadius: '50%', marginRight: 10, boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}
      />
      <Typography.Title level={3} style={{ margin: 0, color: '#FFFFFF' }}>
        K-Hub Ant Design
      </Typography.Title>
      <Space style={{ marginLeft: 'auto' }} />
    </div>
  );
}

export default Header;
