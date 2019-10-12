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
        id: 'MTZY012323',
        pinlv: '脚手架工程',
        date: '安全施工规章制度',
        model: '2',
        type: '18',
        process: 87,
        status: '启用',
    },
    {
        id: 'MTZY012336',
        pinlv: '基坑支护',
        date: '三级安全教育记录卡',
        model: '3',
        type: '18',
        process: 65,
        status: '启用',
    },
    {
        id: 'MTZY012315',
        pinlv: '悬挑式钢管脚手架',
        date: '安全检查记录',
        model: '3',
        type: '18',
        process: 71,
        status: '启用',
    },
    {
        id: 'MTZY012324',
        pinlv: '落地式楼板模板支架',
        date: '隐患整改通知',
        model: '6',
        type: '18',
        process: 72,
        status: '启用',
    },
    {
        id: 'MTZY012339',
        pinlv: '工具式脚手架工程',
        date: '工伤事故登记',
        model: '2',
        type: '18',
        process: 13,
        status: '启用',
    },
    {
        id: 'MTZY012340',
        pinlv: '盘扣式脚手架',
        date: '安全检查评分',
        model: '3',
        type: '18',
        process: 44,
        status: '启用',
    },
    {
        id: 'MTZY012311',
        pinlv: '悬挑式钢管脚手架',
        date: '工伤事故登记',
        model: '7',
        type: '18',
        process: 38,
        status: '启用',
    },
    {
        id: 'MTZY012314',
        pinlv: '工具式脚手架工程',
        date: '安全检查记录',
        model: '6',
        type: '18',
        process: 56,
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '单位工程名称',
            dataIndex: 'pinlv',
        },
        {
            title: '安全管理',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '报警信息数',
            dataIndex: 'model',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '监理设备启用时长（小时）',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '监理效率',
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
                title="安全监理"
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
