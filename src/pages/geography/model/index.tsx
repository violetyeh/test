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
       id:'ZJ-001',
       cf:'长城大厦工程',
       jc:'泥浆比重',
       dw:'200',
       jg:'曹德明',
       jx:'42',
       status: '启用',
    },
    {
        id:'ZJ-002',
        cf:'中行住宅楼',
        jc:'混凝土强度',
        dw:'300',
        jg:'刘佳亚',
        jx:'52',
        status: '启用',
     },
     {
        id:'ZJ-003',
        cf:'锦城名都',
        jc:'孔深',
        dw:'700',
        jg:'赵梦雨',
        jx:'91',
        status: '启用',
     },
     {
        id:'ZJ-004',
        cf:'丽水湾商住楼',
        jc:'泥浆比重',
        dw:'200',
        jg:'王思雨',
        jx:'63',
        status: '启用',
     },
     {
         id:'ZJ-005',
         cf:'蓝光富丽花城',
         jc:'孔深',
         dw:'500',
         jg:'刘德梅',
         jx:'38',
         status: '启用',
      },
      {
         id:'ZJ-006',
         cf:'林溪美城',
         jc:'混凝土强度',
         dw:'300',
         jg:'陈新建',
         jx:'54',
         status: '启用',
      },
      {
        id:'ZJ-007',
        cf:'南充1号楼',
        jc:'桩体质量检查',
        dw:'600',
        jg:'陈照明',
        jx:'34',
        status: '启用',
     },
     {
         id:'ZJ-008',
         cf:'万科加州湾',
         jc:'承载力',
         dw:'700',
         jg:'刘万宇',
         jx:'84',
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
            title: '项目名称',
            dataIndex: 'cf',
        },
        
        {
            title: '工期（天）',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '主控项目',
            dataIndex: 'jc',
        },

        {
            title: '项目负责人',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '监理进度（%）',
            dataIndex: 'jx',
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
                title="项目信息"
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
