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
        id: 'WJ0008S0J',
        date: '218.207.107.21',
        type: '17',
        status: '启用',
        pinlv: 'TESTUSER1',
        process: 23,
    },
    {
        id: 'WJ00072IK',
        date: '218.207.107.03',
        type: '15',
        status: '启用',
        pinlv: 'TESTUSER2',
        process: 54,
    },
    {
        id: 'WJ00063JJ',
        date: '218.207.107.17',
        type: '10',
        status: '启用',
        pinlv: 'TESTUSER3',
        process: 44,
    },
    {
        id: 'WJ0000191',
        date: '218.207.107.12',
        type: '18',
        status: '启用',
        pinlv: 'TESTUSER4',
        process: 30,
    },
    {
        id: 'WJ0002SI1',
        date: '218.207.107.05',
        type: '11',
        status: '启用',
        pinlv: 'TESTUSER5',
        process: 88,
    },
    {
        id: 'WJ00001IOS',
        date: '218.207.107.56',
        type: '56',
        status: '启用',
        pinlv: 'TESTUSER6',
        process: 90,
    },
    {
        id: 'YSIW9s1',
        date: '218.207.107.24',
        type: '11',
        status: '启用',
        pinlv: 'TESTUSER7',
        process: 70,
    },
    {
        id: 'WJ00080SJ',
        date: '218.207.107.36',
        type: '11',
        status: '启用',
        pinlv: 'TESTUSER8',
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
            title: '所属用户',
            dataIndex: 'pinlv',
        },
        {
            title: '终端域名',
            dataIndex: 'date',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '文件大小（M）',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '剩余空间',
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
                title="存储文件信息"
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
