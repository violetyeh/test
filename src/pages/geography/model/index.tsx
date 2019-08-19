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
        id: 'YID8S0J',
        date: '未初始化',
        model: '39936',
        type: '119808',
        status: '启用',
        pinlv: 'A29166AKCDN02',
        process: 23,
    },
    {
        id: 'YID72IK',
        date: '正常',
        model: '52364',
        type: '119808',
        status: '启用',
        pinlv: 'A29153WKXN -MA- JH02',
        process: 54,
    },
    {
        id: 'YID63JJ',
        date: '未初始化',
        model: '52364',
        type: '119808',
        status: '启用',
        pinlv: 'A29192WKXN -MA- JH02',
        process: 44,
    },
    {
        id: 'YIDS0191',
        date: '正常',
        model: '15000',
        type: '119808',
        status: '启用',
        pinlv: 'AE1292WKXN-QA1',
        process: 30,
    },
    {
        id: 'YIDS2SI1',
        date: '初始化完成',
        model: '13569',
        type: '119808',
        status: '启用',
        pinlv: 'AQ2837KL-IN',
        process: 88,
    },
    {
        id: 'YIDS01IOS',
        date: '正常',
        model: '43278',
        type: '562874',
        status: '启用',
        pinlv: 'AY72829-BVPO',
        process: 90,
    },
    {
        id: 'YSIW9s1',
        date: '未初始化',
        model: '52146',
        type: '119808',
        status: '启用',
        pinlv: 'A1910ZSD-FF',
        process: 70,
    },
    {
        id: 'YID80SJ',
        date: '正常',
        model: '52364',
        type: '119808',
        status: '启用',
        pinlv: 'A29192WKXN -MA- JH02',
        process: 67,
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '型号',
            dataIndex: 'pinlv',
        },
        {
            title: '状态',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '物理容量（MB）',
            dataIndex: 'model',
        },
        {
            title: '容量（MB）',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '可用容量空间',
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
                title="卷组监控管理"
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
