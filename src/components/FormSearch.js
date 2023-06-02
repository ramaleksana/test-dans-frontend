import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";

const FormSearch = (props) => {
    return (
        <Form>
            <Row gutter={16}>
                <Col span={8}>
                    <label>Job Description</label>
                    <Input
                        placeholder="Filter by title, benefits, companies, expertise"
                        prefix={<FontAwesomeIcon icon={faBuilding} />}
                        name="description"
                        value={props.data.description}
                        onChange={(e) =>
                            props.setData({
                                ...props.data,
                                description: e.target.value,
                            })
                        }
                    />
                </Col>
                <Col span={8}>
                    <label>Job Description</label>
                    <Input
                        placeholder="Filter by city, state, zip code or country"
                        prefix={<GlobalOutlined />}
                        name="location"
                        value={props.data.location}
                        onChange={(e) =>
                            props.setData({
                                ...props.data,
                                location: e.target.value,
                            })
                        }
                    />
                </Col>
                <Col
                    span={4}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Checkbox
                        name="full_time"
                        checked={props.data.full_time}
                        onChange={(e) =>
                            props.setData({
                                ...props.data,
                                full_time: e.target.checked,
                            })
                        }
                    >
                        Full Time Only
                    </Checkbox>
                </Col>
                <Col
                    span={4}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button loading={props.loading} onClick={props.onFinish}>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FormSearch;
