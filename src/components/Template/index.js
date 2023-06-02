import React, { Fragment } from "react";
import { blue } from "@ant-design/colors";
import { Avatar, Dropdown, Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import { logout } from "../../redux/reducers";

const { Header, Content } = Layout;

const Template = (props) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        return state.auth.login;
    });

    const items = [
        {
            key: "1",
            label: <span onClick={() => dispatch(logout())}>Logout</span>,
            icon: <UnlockOutlined />,
        },
    ];

    return (
        <Layout className="layout">
            <Header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: blue[5],
                }}
            >
                <div
                    style={{
                        fontSize: "20px",
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    GitHub <span style={{ fontWeight: "400" }}>Jobs</span>
                </div>
                <div style={{ marginLeft: "auto" }}>
                    {state.data && (
                        <Fragment>
                            <span
                                style={{ marginRight: "5px", color: "white" }}
                            >
                                Halo, Admin
                            </span>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <Avatar
                                    shape="square"
                                    icon={<UserOutlined />}
                                />
                            </Dropdown>
                        </Fragment>
                    )}
                </div>
            </Header>
            <Content
                id="detail"
                className="site-layout"
                style={{
                    padding: "0 50px",
                    marginTop: "20px",
                    minHeight: "100vh",
                }}
            >
                {props.isAuth ? (
                    state.data ? (
                        <Outlet />
                    ) : (
                        <Navigate to={"/login"} />
                    )
                ) : state.data ? (
                    <Navigate to={`/`} />
                ) : (
                    <Outlet />
                )}
            </Content>
        </Layout>
    );
};

export default Template;
