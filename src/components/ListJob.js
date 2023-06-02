import { blue, gray, green } from "@ant-design/colors";
import { List, Skeleton } from "antd";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ListJob = (props) => {
    return (
        <List
            loading={props.loading}
            itemLayout="horizontal"
            dataSource={props.data}
            loadMore={props.loadMore}
            renderItem={(item, index) => (
                <List.Item key={index}>
                    <Skeleton title={false} loading={props.loading} active>
                        <List.Item.Meta
                            title={
                                <Link
                                    to={`/${item.id}`}
                                    style={{ color: blue[5] }}
                                >
                                    {item.title}
                                </Link>
                            }
                            description={
                                <Fragment>
                                    {item.company} -{" "}
                                    <span
                                        style={{
                                            color: green[5],
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.type}
                                    </span>
                                </Fragment>
                            }
                        />

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                flexDirection: "column",
                            }}
                        >
                            <span style={{ color: gray[6] }}>
                                {item.location}
                            </span>
                            <span style={{ color: gray[2] }}>1 day ago</span>
                        </div>
                    </Skeleton>
                </List.Item>
            )}
        />
    );
};

export default ListJob;
