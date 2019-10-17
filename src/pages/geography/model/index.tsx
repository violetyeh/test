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
        pinlv: '冷却水压力',
        date: '±0.1MPa',
        model: '4 - 20mA',
        type: '网络调度',
        process: 30,
        status: '启用',
        gl:'0-5MPa',
    },
    {
        id: 'DD000-ZX036',
        pinlv: '冷却水流量',
        date: '±1L/M',
        model: '4 - 20 mA',
        type: '交换调度',
        process: 100,
        status: '启用',
        gl:'0-60L/M',
    },
    {
        id: 'DD000-ZX015',
        pinlv: '偶合器注水压力',
        date: '±0.1MPa',
        model: '4 - 20mA',
        type: '网络调度',
        process: 63,
        status: '启用',
        gl:'0-5MPa',
    },
    {
        id: 'DD000-ZX024',
        pinlv: '偶合器正转压力',
        date: '±10KPa',
        model: '4 - 20mA',
        type: '电路调度',
        process: 72,
        status: '启用',
        gl:'0-500KPa',
    },
    {
        id: 'DD000-ZX039',
        pinlv: '偶合器反转压力',
        date: '±10KPa',
        model: '4 - 20mA',
        type: '网络调度',
        process: 13,
        status: '启用',
        gl:'0-500KPa ',
    },
    {
        id: 'DD000-ZX040',
        pinlv: '电机绕组温度',
        date: '±1°C ',
        model: 'PT100',
        type: '交换调度',
        process: 44,
        status: '启用',
        gl:'0-200°C',
    },
    {
        id: 'DD000-ZX011',
        pinlv: '减速器油温',
        date: '±1°C ',
        model: 'PT100',
        type: '网络调度',
        process: 38,
        status: '启用',
        gl:'0-200°C',
    },
    {
        id: 'DD000-ZX014',
        pinlv: '电机轴头温度',
        date: '±1°C ',
        model: 'PT100',
        type: '电路调度',
        process: 56,
        status: '启用',
        gl:'0-200°C',
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
            title: '名称',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '量程',
            dataIndex: 'gl',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '精度',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '输入信号',
            dataIndex: 'model',
        },
       
        {
            title: '监测进度',
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
                title="监测参数"
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
