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
        id: 'GGJG0023',
        pinlv: '规划设计工程0023',
        date: '多功能全电子式电能表(10kV侧) 0.5S',
        model: '级 100V 三相三线',
        type: '抗震、防火、通风',
        process: 30,
        status: '启用',
    },
    {
        id: 'GGJG0036',
        pinlv: '规划设计工程0036',
        date: '多功能全电子式电能表(0.4kV侧) 1.0',
        model: '级 220 /380V 三相四线',
        type: '防洪、防潮、防尘、防毒',
        process: 45,
        status: '启用',
    },
    {
        id: 'GGJG0015',
        pinlv: '规划设计工程0015',
        date: '电压互感器 0.5',
        model: '级 10/0.1kV，V/V接线',
        type: '抗震、防火、防潮、防尘、防毒',
        process: 63,
        status: '启用',
    },
    {
        id: 'GGJG0024',
        pinlv: '规划设计工程0024',
        date: '电流互感器（专用线圈） 0.5S',
        model: '级，10kV，**/5A',
        type: '抗震、防尘、防毒',
        process: 72,
        status: '启用',
    },
    {
        id: 'GGJG0039',
        pinlv: '规划设计工程0039',
        date: '电流互感器（专用线圈） 0.66kV',
        model: '0.5S级，**/5A',
        type: '抗震、防火、通风',
        process: 13,
        status: '启用',
    },
    {
        id: 'GGJG0040',
        pinlv: '规划设计工程0040',
        date: '采集器 485',
        model: '通讯采集',
        type: '抗震、防火、通风、防洪、防潮',
        process: 44,
        status: '启用',
    },
    {
        id: 'GGJG0011',
        pinlv: '规划设计工程0011',
        date: '表用接线盒',
        model: '三相四线',
        type: '抗震、防火',
        process: 38,
        status: '启用',
    },
    {
        id: 'GGJG0014',
        pinlv: '规划设计工程0014',
        date: '电流二次回路',
        model: '单芯铜质绝缘线不小于4mm2',
        type: '防洪、防潮、防尘',
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
            title: '工程名称',
            dataIndex: 'pinlv',
        },
        {
            title: '计量装置配置',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '主要技术条件',
            dataIndex: 'model',
        },
        {
            title: '满足要求',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '设计进度',
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
                title="工程概况"
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
