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
        id:'ZJSM023896',
        cf:'水力发电站工程',
        dw:'一级',
        jg:'工程监理JTG/T F81-01',
        jx:'监理合同',
        status: '启用',
     },
     {
       id:'ZJSM023897',
       cf:'道路桥梁建筑工程',
       dw:'一级',
       jg:'工程监理JTG/T F81-02',
       jx:'监理费用管理',
       status: '启用',
    },
    {
        id:'ZJSM023898',
        cf:'水力发电站工程',
        dw:'一级',
        jg:'工程监理JTG/T F81-03',
        jx:'监理成本管理',
        status: '启用',
     },
    {
       id:'ZJSM023891',
       cf:'楼房建筑工程',
       dw:'二级',
       jg:'工程监理JTG/T F81-04',
       jx:'监理规划细则',
       status: '启用',
    },
    {
        id:'ZJSM023892',
        cf:'道路桥梁建筑工程',
        dw:'一级',
        jg:'工程监理JTG/T F81-05',
        jx:'沟通管理',
        status: '启用',
     },
     {
        id:'ZJSM023893',
        cf:'道路桥梁建筑工程',
        dw:'一级',
        jg:'工程监理JTG/T F81-06',
        jx:'质量控制',
        status: '启用',
     },
     {
        id:'ZJSM023894',
        cf:'楼房建筑工程',
        dw:'二级',
        jg:'工程监理JTG/T F81-07',
        jx:'造价控制',
        status: '启用',
     },
     {
         id:'ZJSM023895',
         cf:'水力发电站工程',
         dw:'一级',
         jg:'工程监理JTG/T F81-08',
         jx:'进度控制',
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
            title: '监理规范',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '监理过程',
            dataIndex: 'jx',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '工程类别',
            dataIndex: 'cf',
        },
        {
            title: '工程等级',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
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
                title="监理设置"
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
