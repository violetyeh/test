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
        id:'ZJ-006',
        cf:'009地籍区',
        jc:'国家土地使用权',
        dw:'002地籍子区',
        jg:'道路规划',
        jx:'54',
        status: '启用',
     },
     {
       id:'ZJ-007',
       cf:'001地籍区',
       jc:'土地转让权',
       dw:'004地籍子区',
       jg:'建设用地使用权',
       jx:'34',
       status: '启用',
    },
    {
        id:'ZJ-008',
        cf:'005地籍区',
        jc:'国家土地使用权',
        dw:'003地籍子区',
        jg:'耕地使用权',
        jx:'84',
        status: '启用',
     },
    {
       id:'ZJ-001',
       cf:'008地籍区',
       jc:'土地转让权',
       dw:'001地籍子区',
       jg:'建设用地使用权',
       jx:'42',
       status: '启用',
    },
    {
        id:'ZJ-002',
        cf:'003地籍区',
        jc:'土地转让权',
        dw:'005地籍子区',
        jg:'耕地使用权',
        jx:'52',
        status: '启用',
     },
     {
        id:'ZJ-003',
        cf:'007地籍区',
        jc:'土地转让权',
        dw:'007地籍子区',
        jg:'道路规划',
        jx:'91',
        status: '启用',
     },
     {
        id:'ZJ-004',
        cf:'006地籍区',
        jc:'国家土地使用权',
        dw:'009地籍子区',
        jg:'建设用地使用权',
        jx:'63',
        status: '启用',
     },
     {
         id:'ZJ-005',
         cf:'000地籍区',
         jc:'国家土地使用权',
         dw:'008地籍子区',
         jg:'建设用地使用权',
         jx:'38',
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
            title: '地籍区',
            dataIndex: 'cf',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        
        {
            title: '地籍子区',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '所有权类型',
            dataIndex: 'jc',
        },

        {
            title: '宗地特征',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '调查进度（%）',
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
                title="不动产信息"
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
