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
        pinlv: '10.175.100：0023',
        date: '全局过滤模块：icmp',
        model: '5.6',
        type: 'ICMP',
        process: 30,
        status: '启用',
        gl:'结束',
    },
    {
        id: 'DD000-ZX036',
        pinlv: '10.175.170：0036',
        date: '全局过滤模块：udp',
        model: '3.24',
        type: 'FTP',
        process: 100,
        status: '启用',
        gl:'开始',
    },
    {
        id: 'DD000-ZX015',
        pinlv: '10.175.021：0015',
        date: '全局过滤模块：icmp',
        model: '1.23',
        type: 'ICMP',
        process: 63,
        status: '启用',
        gl:'开始',
    },
    {
        id: 'DD000-ZX024',
        pinlv: '10.175.100：0024',
        date: '全局过滤模块：udp',
        model: '0.01',
        type: 'UDP',
        process: 72,
        status: '启用',
        gl:'结束',
    },
    {
        id: 'DD000-ZX039',
        pinlv: '10.175.141：0039',
        date: '全局过滤模块：icmp',
        model: '12.5',
        type: 'ICMP',
        process: 13,
        status: '启用',
        gl:'开始',
    },
    {
        id: 'DD000-ZX040',
        pinlv: '10.175.253：0040',
        date: '全局过滤模块：icmp',
        model: '47.4',
        type: 'FTP',
        process: 44,
        status: '启用',
        gl:'结束',
    },
    {
        id: 'DD000-ZX011',
        pinlv: '10.175.368：0011',
        date: '全局过滤模块：icmp',
        model: '36.2',
        type: 'ICMP',
        process: 38,
        status: '启用',
        gl:'结束',
    },
    {
        id: 'DD000-ZX014',
        pinlv: '10.175.474：0014',
        date: '全局过滤模块：udp',
        model: '27.5',
        type: 'UDP',
        process: 56,
        status: '启用',
        gl:'开始',
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
            title: '服务器',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '攻击事件',
            dataIndex: 'gl',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '防护方式',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '流量（Mbps）',
            dataIndex: 'model',
        },
        {
            title: '包类型',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
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
                title="攻击日志管理"
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
