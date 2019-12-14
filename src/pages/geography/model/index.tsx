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
        id: 'GTOU1323',
        pinlv: '141 天然草地',
        date: '国有土地使用权',
        model: '1',
        type: '2541',
        process: 30,
        status: '启用',
    },
    {
        id: 'GTOU1336',
        pinlv: '152 设施农业用地',
        date: '集体土地所有权',
        model: '1',
        type: '2031',
        process: 45,
        status: '启用',
    },
    {
        id: 'GTOU1315',
        pinlv: '134 未成林造林地',
        date: '国有土地使用权',
        model: '3',
        type: '1520',
        process: 63,
        status: '启用',
    },
    {
        id: 'GTOU1324',
        pinlv: '131 有林地',
        date: '国有土地使用权',
        model: '1',
        type: '2599',
        process: 72,
        status: '启用',
    },
    {
        id: 'GTOU1339',
        pinlv: '121 果园',
        date: '集体土地所有权',
        model: '2',
        type: '1025',
        process: 13,
        status: '启用',
    },
    {
        id: 'GTOU1340',
        pinlv: '113 水浇地 ',
        date: '集体所有土地',
        model: '1',
        type: '3021',
        process: 44,
        status: '启用',
    },
    {
        id: 'GTOU1311',
        pinlv: '112 望天田',
        date: '集体所有土地',
        model: '3',
        type: '2789',
        process: 38,
        status: '启用',
    },
    {
        id: 'GTOU1314',
        pinlv: '111 灌溉水田',
        date: '集体所有土地',
        model: '2',
        type: '2300',
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
            title: '图斑号',
            dataIndex: 'id',
        },
        {
            title: '地类号',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '权属性质',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '坡度级别',
            dataIndex: 'model',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '面积（万²）',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '质检进度',
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
                title="图斑信息"
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
