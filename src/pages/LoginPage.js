import React, { useEffect } from "react";
import { Button, Card, Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginPost, resetErrorLogin } from "../redux/reducers";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = (props) => {
    const dispatch = useDispatch();

    const [api, contextHolder] = notification.useNotification();

    const state = useSelector((state) => {
        return state.auth.login;
    });

    const onFinish = (values) => {
        dispatch(loginPost(values));
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (state.error) {
            api["error"]({
                message: "Gagal Login",
                description: "Username atau password anda salah",
            });
            dispatch(resetErrorLogin());
        }
    }, [dispatch, state.error, api]);

    return (
        <Card
            title="Login"
            style={{
                maxWidth: 300,
                margin: "auto",
                marginBottom: "10px",
            }}
        >
            {contextHolder}
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    // label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    // label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        loading={state.loading}
                    >
                        Login
                    </Button>
                    <br />
                    or
                    <br />
                    <Link to={"/register"}>Register</Link>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default LoginPage;
