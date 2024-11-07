import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  LogoutOutlined,
  MoneyCollectOutlined,
  ProfileOutlined,
  SolutionOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import LogoSrc from "../../assets/logo.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/user-store";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../http/api";
const { Content, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const Styles = {
  image: {
    width: "120px",
    height: "80px",
    objectFit: "cover",
  },
};

const DashBoardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const { user } = useAuthStore();

  let sideBarItems = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/worker",
      icon: <SolutionOutlined />,
      label: <Link to="/worker">Workers</Link>,
    },
    {
      key: "/problem",
      icon: <AppstoreAddOutlined />,
      label: <Link to="/problem">Problem</Link>,
    },
    {
      key: "/become-worker",
      icon: <UserAddOutlined />,
      label: <Link to="/become-worker">Become Worker</Link>,
    },
    {
      key: "/profile",
      icon: <ProfileOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
  ].map((item) => ({
    key: String(item.key),
    icon: item.icon,
    label: item.label,
  }));

  if (user.role === "worker") {
    sideBarItems = [
      {
        key: "/",
        icon: <AppstoreOutlined />,
        label: <Link to="/">Dashboard</Link>,
      },
      {
        key: "/worker",
        icon: <SolutionOutlined />,
        label: <Link to="/worker">Workers</Link>,
      },
      {
        key: "/problem",
        icon: <AppstoreAddOutlined />,
        label: <Link to="/problem">Problem</Link>,
      },
      {
        key: "/my-bids",
        icon: <MoneyCollectOutlined />,
        label: <Link to="/my-bids">My Bids</Link>,
      },
      {
        key: "/profile",
        icon: <ProfileOutlined />,
        label: <Link to="/profile">Profile</Link>,
      },
    ].map((item) => ({
      key: String(item.key),
      icon: item.icon,
      label: item.label,
    }));
  }

  const { setUser } = useAuthStore();
  const handleLogout = async () => {
    const { data } = await logout();
    return data;
  };

  const navigation = useNavigate();
  const { mutate } = useMutation({
    mutationKey: "logout",
    mutationFn: handleLogout,
    onSuccess: () => {
      navigation("/auth/login");
      setUser(null);
    },
  });

  return (
    <Layout hasSider>
      <Sider
        style={{
          ...siderStyle,
          ...{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            // alignItems: "self-end",
          },
        }}
        theme="light"
      >
        <div className="demo-logo-vertical">
          <img src={LogoSrc} style={Styles.image} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={sideBarItems}
        />

        <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Menu
            theme="light"
            mode="inline"
            items={[
              {
                key: "5",
                icon: <LogoutOutlined />,
                label: <Button onClick={() => mutate()}>Logout</Button>,
                href: "/auth/login",
              },
            ]}
          />
        </div>
      </Sider>
      <Layout
        style={{
          marginInlineStart: 200,
        }}
      >
        <Content
          style={{
            margin: "12px 12px",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: "15px 20px",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashBoardLayout;
