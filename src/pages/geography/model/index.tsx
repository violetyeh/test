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
        id: 'CLGL9s1',
        date: '通畅',
        type: '125',
        status: '启用',
        pinlv: '南通高速',
        process: '50',
    },
    {
        id: 'CLGL80SJ',
        date: '堵塞',
        type: '147',
        status: '启用',
        pinlv: '成渝高速',
        process: '42',
    },
    {
        id: 'CLGL8S0J',
        date: '通畅',
        type: '156',
        status: '启用',
        pinlv: '南通高速',
        process: '45',
    },
    {
        id: 'CLGL72IK',
        date: '通畅',
        type: '134',
        status: '启用',
        pinlv: '广绍高速',
        process: '35',
    },
    {
        id: 'CLGL63JJ',
        date: '通畅',
        type: '125',
        status: '启用',
        pinlv: '无锡高速',
        process: '54',
    },
    {
        id: 'CLGL191',
        date: '堵塞',
        type: '174',
        status: '启用',
        pinlv: '无锡高速',
        process: '62',
    },
    {
        id: 'CLGL2SI1',
        date: '通畅',
        type: '162',
        status: '启用',
        pinlv: '南通高速',
        process: '37',
    },
    {
        id: 'CLGL1IOS',
        date: '通畅',
        type: '145',
        status: '启用',
        pinlv: '广绍高速',
        process: '45',
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
            title: '高速名称',
            dataIndex: 'pinlv',
        },
        {
            title: '状态',
            dataIndex: 'date',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '车流量（辆/小时）',
            dataIndex: 'type',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '占有率',
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
                title="高速路信息管理"
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
