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
        zl: 'SZY018',
        mc:'固体颗粒物',
        sj:'电法去离子（EDI）',
        zb:3.1,
        process: 89,
        status: '启用',
    },
    {
        zl: 'SZY019',
        mc:'气体',
        sj:'离子交换',
        zb:2.2,
        process: 78,
        status: '启用',
    },
    {
        zl: 'SZY020',
        mc:'无机物',
        sj:'过滤',
        zb:3.6,
        process: 100,
        status: '启用',
    },
    {
        zl: 'SZY021',
        mc:'有机物',
        sj:'微孔过滤（超滤）',
        zb:3,
        process: 99,
        status: '启用',
    },
    
    {
        zl: 'SZY022',
        mc:'微生物',
        sj:'反渗透',
        zb:2,
        process: 65,
        status: '启用',
    },
    {
        zl: 'SZY023',
        mc:'有机物',
        sj:'软化',
        zb:1,
        process: 100,
        status: '启用',
    },
    {
        zl: 'SZY024',
        mc:'无机物',
        sj:'吸附',
        zb:3,
        process: 32,
        status: '启用',
    },
    {
        zl: 'SZY025',
        mc:'固体颗粒物',
        sj:'过滤',
        zb:2,
        process: 28,
        status: '启用',
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
            title: '水质仪编号',
            dataIndex: 'zl',
        },
        {
            title: '污染物类型',
            dataIndex: 'mc',
        },
        {
            title: '净水操作',
            dataIndex: 'sj',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '污染物占比',
            dataIndex: 'zb',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '监测结果进度',
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
                title="水质监测"
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
