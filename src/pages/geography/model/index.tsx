import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    {
        id: 'YIDS0122',
        date: '60.00',
        model: '623.00',
        type: '5002.00',
        status: '启用',
        pinlv: '川A125A1',
        process: 3,
    },
    {
        id: 'YIDS2S12',
        date: '45.00',
        model: '400.00',
        type: '3500.00',
        status: '启用',
        pinlv: '京A120B1',
        process: 8,
    },
    {
        id: 'YIDS01IOS',
        date: '25.00',
        model: '456.00',
        type: '2320.00',
        status: '启用',
        pinlv: '赣B23K63',
        process: 9,
    },
    {
        id: 'YSIW9s1',
        date: '35.00',
        model: '236.00',
        type: '1300.00',
        status: '启用',
        pinlv: '湘A113AA',
        process: 7,
    },
    {
        id: 'YID80SJ',
        date: '20.00',
        model: '853.00',
        type: '2000.00',
        status: '启用',
        pinlv: '渝B23Z14',
        process: 6,
    },
    {
        id: 'YIDS0191',
        date: '33.00',
        model: '320.00',
        type: '2200.00',
        status: '启用',
        pinlv: '渝A230I3',
        process: 3,
    },
    {
        id: 'YIDS2SI1',
        date: '25.00',
        model: '300.00',
        type: '1230.00',
        status: '启用',
        pinlv: '浙B236K1',
        process: 8,
    },

]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '车牌号',
            dataIndex: 'pinlv',
        },
        {
            title: '标准用时',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '公里数',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '车辆使用率',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },

        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.edit(record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.delete(record)}>删除</a>
                </Fragment>
            ),
        },
    ];

    edit = (record: any) => {
        this.setState({
            currentItem: record,
            saveVisible: true,
        });
    }

    delete = (record: any) => {
        message.error('核心数据，无法删除');
    }
    render() {
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="车辆里程统计"
            >
                <Card bordered={false}>
                    <div className={styles.tableListForm}><Search handleSave={() => this.setState({ currentItem: {}, saveVisible: true })} /></div>
                    <Table
                        dataSource={data}
                        columns={this.columns}
                        rowKey={item => item.id}
                    />
                </Card>
                {
                    saveVisible &&
                    <Save
                        currentItem={currentItem}
                        handleSaveVisible={() => this.setState({ saveVisible: false })}
                    />
                }
            </PageHeaderWrapper>
        );
    }
}

export default Model;
