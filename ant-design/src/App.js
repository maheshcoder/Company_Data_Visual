  import { Space } from "antd";
  import "./App.css";
  import Header from "./Components/Header";
  import Footer from "./Components/Footer";
  import Content from "./Components/Content";
  import SideMenu from "./Components/SideMenu";
  
  function App() {
    return (
    <div className="App">
      <Header />
      <Space className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <Content></Content>
      </Space>
      <Footer />
    </div>
    );
  }
  export default App;