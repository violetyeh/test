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
        id: 'DD000-ZX023',
        pinlv: 'CDN智能调度线路0023',
        date: '智能调度线路提交方式',
        model: '采纳调度设置',
        type: '网络调度',
        process: 30,
        status: '启用',
        gl:'07F-00-12-5M',
    },
    {
        id: 'DD000-ZX036',
        pinlv: 'CDN智能调度线路0036',
        date: '智能调度线路保存方式',
        model: '收集调度设置',
        type: '交换调度',
        process: 100,
        status: '启用',
        gl:'07F-W6-12-19',
    },
    {
        id: 'DD000-ZX015',
        pinlv: 'CDN智能调度线路0015',
        date: '智能调度线路提交方式',
        model: '收集调度设置',
        type: '网络调度',
        process: 63,
        status: '启用',
        gl:'07F-74-12-AS',
    },
    {
        id: 'DD000-ZX024',
        pinlv: 'CDN智能调度线路0024',
        date: '智能调度线路保存方式',
        model: '收集调度设置',
        type: '电路调度',
        process: 72,
        status: '启用',
        gl:'03X-25-69-14',
    },
    {
        id: 'DD000-ZX039',
        pinlv: 'CDN智能调度线路0039',
        date: '智能调度线路提交方式',
        model: '采纳调度设置',
        type: '网络调度',
        process: 13,
        status: '启用',
        gl:'16Q-63-24-02',
    },
    {
        id: 'DD000-ZX040',
        pinlv: 'CDN智能调度线路0040',
        date: '智能调度线路提交方式',
        model: '收集调度设置',
        type: '交换调度',
        process: 44,
        status: '启用',
        gl:'06J-14-69-08',
    },
    {
        id: 'DD000-ZX011',
        pinlv: 'CDN智能调度线路0011',
        date: '智能调度线路提交方式',
        model: '采纳调度设置',
        type: '网络调度',
        process: 38,
        status: '启用',
        gl:'09F-00-12-19',
    },
    {
        id: 'DD000-ZX014',
        pinlv: 'CDN智能调度线路0014',
        date: '智能调度线路保存方式',
        model: '收集调度设置',
        type: '电路调度',
        process: 56,
        status: '启用',
        gl:'07F-00-12-19',
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
            title: '调度线路',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '线路管理',
            dataIndex: 'gl',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '调度线路',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '调度设置',
            dataIndex: 'model',
        },
        {
            title: '调度定向',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '调度进度',
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
                title="调度智能管理"
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
