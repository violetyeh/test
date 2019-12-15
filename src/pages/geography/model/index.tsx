import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress, Checkbox } from "antd";
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
        cf:'有明显道路或大型沟渠特征（包括在建推土、搭建桥墩等）',
        dw:'21.0',
        jg:'图斑数据01',
        jx:'有植被覆盖或没有明显建设',
        status: '启用',
     },
     {
       id:'ZJSM023897',
       cf:'明显建成特征（包括路面硬化、运行使用等）',
       dw:'21.1',
       jg:'图斑数据02',
       jx:'道路或大型沟渠在建',
       status: '启用',
    },
    {
        id:'ZJSM023898',
        cf:'基本建成的道路',
        dw:'20.0',
        jg:'图斑数据03',
        jx:'未建或动土在建',
        status: '启用',
     },
    {
       id:'ZJSM023891',
       cf:'动土在建道路',
       dw:'21.3',
       jg:'图斑数据04',
       jx:'未建',
       status: '启用',
    },
    {
        id:'ZJSM023892',
        cf:'围填海造地',
        dw:'21.0',
        jg:'图斑数据05',
        jx:'海水覆盖',
        status: '启用',
     },
     {
        id:'ZJSM023893',
        cf:'仍具有明显建设特征',
        dw:'20.0',
        jg:'图斑数据06',
        jx:'往年“临时用地”',
        status: '启用',
     },
     {
        id:'ZJSM023894',
        cf:'新建或翻建',
        dw:'20.1',
        jg:'图斑数据07',
        jx:'推土或农村居民点',
        status: '启用',
     },
     {
         id:'ZJSM023895',
         cf:'拆除后重新推土建设',
         dw:'20.0',
         jg:'图斑数据08',
         jx:'农村居民点',
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
            title: '图斑数据',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '前时相影像',
            dataIndex: 'jx',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '后时相影像',
            dataIndex: 'cf',
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
                title="影像特征"
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
