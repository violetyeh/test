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
        id:'ZJ-004',
        cf:'水泥净浆抗压强度',
        jc:'42.1',
        dw:'2',
        jg:'40x40',
        jx:'63',
        status: '启用',
     },
     {
         id:'ZJ-005',
         cf:'水泥净浆抗压强度',
         jc:'42.5',
         dw:'5',
         jg:'40x40',
         jx:'38',
         status: '启用',
      },
      {
         id:'ZJ-006',
         cf:'水泥砂浆抗压强度',
         jc:'42.3',
         dw:'3',
         jg:'41x41',
         jx:'54',
         status: '启用',
      },
      {
        id:'ZJ-007',
        cf:'水泥胶砂抗折强度',
        jc:'41.2',
        dw:'6',
        jg:'42x42',
        jx:'34',
        status: '启用',
     },
     {
         id:'ZJ-008',
         cf:'水泥胶砂抗压强度',
         jc:'42.5',
         dw:'7',
         jg:'40x40',
         jx:'84',
         status: '启用',
      },
    {
       id:'ZJ-001',
       cf:'水泥胶砂抗折强度',
       jc:'41.0',
       dw:'2',
       jg:'41x41',
       jx:'42',
       status: '启用',
    },
    {
        id:'ZJ-002',
        cf:'水泥胶砂抗压强度',
        jc:'41.3',
        dw:'3',
        jg:'40x40',
        jx:'52',
        status: '启用',
     },
     {
        id:'ZJ-003',
        cf:'水泥净浆抗折强度',
        jc:'41.6',
        dw:'7',
        jg:'41x41',
        jx:'91',
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
            title: '监测项目',
            dataIndex: 'cf',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
        {
            title: '龄期（d）',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '强度等级',
            dataIndex: 'jc',
        },

        {
            title: '受压面积（mm²）',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '质量监控进度（%）',
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
                title="健康监测"
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
