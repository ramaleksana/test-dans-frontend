import { Button, Divider, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../redux/reducers";
import { FormSearch, ListJob } from "../components";

const HomePage = (props) => {
    const dispatch = useDispatch();
    const [dataForm, setDataForm] = useState({
        page: 1,
        description: "",
        location: "",
        full_time: false,
    });
    const [data, setData] = useState([]);
    const state = useSelector((state) => {
        return state.jobs.view;
    });

    useEffect(() => {
        dispatch(getJobs("?page=1&description=&location="));
    }, [dispatch]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onFinish = () => {
        let r = `?page=1&description=${dataForm.description}&location=${dataForm.location}`;

        r += dataForm.full_time ? `&full_time=true` : "";
        setDataForm({
            ...dataForm,
            page: 1,
        });
        setData([]);
        dispatch(getJobs(r));
    };

    const onLoadMore = () => {
        let page = dataForm.page + 1;
        setDataForm({
            ...dataForm,
            page: page,
        });
        let r = `?page=${page}&description=${dataForm.description}&location=${dataForm.location}`;
        r += dataForm.full_time ? `&full_time=true` : "";
        setData(state.data);
        dispatch(getJobs(r));
    };

    const loadMore = !state.loading ? (
        <div
            style={{
                textAlign: "center",
                marginTop: 12,
                height: 32,
                lineHeight: "32px",
            }}
        >
            <Button onClick={onLoadMore}>loading more</Button>
        </div>
    ) : null;

    return (
        <div
            style={{
                padding: 24,
                minHeight: 380,
                background: colorBgContainer,
            }}
        >
            <FormSearch
                data={dataForm}
                setData={setDataForm}
                onFinish={onFinish}
                loading={state.loading}
            />
            <Divider
                style={{ borderBlockStart: "1px solid rgba(5, 5, 5, 0.2)" }}
            />
            <ListJob
                loading={state.loading}
                loadMore={!state.data.some((f) => f === null) ? loadMore : null}
                data={data.concat(state.data.filter((f) => f !== null))}
            />
        </div>
    );
};

export default HomePage;
