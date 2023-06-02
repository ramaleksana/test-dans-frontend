import React, { useEffect } from "react";
import { Button, Card, Form, Input, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { registerPost, resetErrorRegister } from "../redux/reducers";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const RegisterPage = (props) => {
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    const state = useSelector((state) => {
        return state.auth.register;
    });

    const onFinish = (values) => {
        dispatch(registerPost(values));
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (state.error) {
            api["error"]({
                message: "Gagal Register",
                description: "Data yang digunakan duplikat",
            });
            dispatch(resetErrorRegister());
        }
    }, [dispatch, state.error, api]);

    useEffect(() => {
        if (state.success) {
            api["success"]({
                message: "Berhasil Register",
                description: "Data berhasil disimpan",
            });
            dispatch(resetErrorRegister());
            form.resetFields();
        }
    }, [dispatch, state.success, api, form]);

    return (
        <Card
            title="Register"
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
                form={form}
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
                    // label="Username"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
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
                        Register
                    </Button>
                    <br />
                    or
                    <br />
                    <Link to={"/login"}>Login</Link>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default RegisterPage;
