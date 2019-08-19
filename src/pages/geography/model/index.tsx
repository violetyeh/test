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
        date: 'RAID组1',
        type: '17',
        status: '启用',
        pinlv: 'StorPool1',
        process: 23,
    },
    {
        id: 'YID72IK',
        date: 'RAID组2',
        type: '15',
        status: '启用',
        pinlv: 'StorPool2',
        process: 54,
    },
    {
        id: 'YID63JJ',
        date: 'RAID组3',
        type: '10',
        status: '启用',
        pinlv: 'StorPool3',
        process: 44,
    },
    {
        id: 'YIDS0191',
        date: 'RAID组4',
        type: '18',
        status: '启用',
        pinlv: 'StorPool4',
        process: 30,
    },
    {
        id: 'YIDS2SI1',
        date: 'RAID组5',
        type: '11',
        status: '启用',
        pinlv: 'StorPool5',
        process: 88,
    },
    {
        id: 'YIDS01IOS',
        date: 'RAID组6',
        type: '56',
        status: '启用',
        pinlv: 'StorPool6',
        process: 90,
    },
    {
        id: 'YSIW9s1',
        date: 'RAID组7',
        type: '11',
        status: '启用',
        pinlv: 'StorPool7',
        process: 70,
    },
    {
        id: 'YID80SJ',
        date: 'RAID组8',
        type: '11',
        status: '启用',
        pinlv: 'StorPool8',
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
            title: '名称',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '物理卷',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '数据中心块大小（M）',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '存储池空间',
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
                title="存储池管理"
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
