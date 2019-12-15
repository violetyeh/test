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
        id:'ZY-ID06',
        cf:'1：236000',
        cpu:'标准(一般)显示',
        dw:'白背景',
        jg:'8m',
        jx:'正北方向',
        status: '启用',
     },
     {
       id:'ZY-ID07',
       cf:'1：88888',
       cpu:'全部(高等级)显示',
       dw:'黑背景 ',
       jg:'10m',
       jx:'艏方向',
       status: '启用',
    },
    {
        id:'ZY-ID08',
        cf:'1：200000',
        cpu:'标准(一般)显示',
        dw:'夜间',
        jg:'14m',
        jx:'正北方向',
        status: '启用',
     },
    {
       id:'ZY-ID01',
       cf:'1：10000',
       cpu:'底层(基本)显示',
       dw:'黄昏',
       jg:'15m',
       jx:'艏方向',
       status: '启用',
    },
    {
        id:'ZY-ID02',
        cf:'1：200000',
        cpu:'全部(高等级)显示',
        dw:'黑背景 ',
        jg:'12m',
        jx:'正北方向',
        status: '启用',
     },
     {
        id:'ZY-ID03',
        cf:'1：3200000',
        cpu:'底层(基本)显示',
        dw:'夜间',
        jg:'21m',
        jx:'艏方向',
        status: '启用',
     },
     {
        id:'ZY-ID04',
        cf:'1：10000',
        cpu:'全部(高等级)显示',
        dw:'明亮',
        jg:'23m',
        jx:'正北方向',
        status: '启用',
     },
     {
         id:'ZY-ID05',
         cf:'1：8888',
         cpu:'底层(基本)显示',
         dw:'明亮',
         jg:'10m',
         jx:'艏方向',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '安全深度',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '比例尺',
            dataIndex: 'cf',
        },
        {
            title: '海图显示类别',
            dataIndex: 'cpu',
        },
        {
            title: '背景模式',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '本船方向',
            dataIndex: 'jx',
            render: (text) => <Tag color="blue">{text}</Tag>,
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
                title="海图数据"
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
