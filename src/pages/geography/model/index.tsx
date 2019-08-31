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
        cf:'1.41',
        dw:'21.0',
        jg:'公路JTG/T F81-01',
        jx:'扇测法',
        status: '启用',
     },
     {
       id:'ZJSM023897',
       cf:'1.08',
       dw:'21.1',
       jg:'公路JTG/T F81-02',
       jx:'扇测法',
       status: '启用',
    },
    {
        id:'ZJSM023898',
        cf:'1.12',
        dw:'20.0',
        jg:'公路JTG/T F81-03',
        jx:'平测法',
        status: '启用',
     },
    {
       id:'ZJSM023891',
       cf:'1.28',
       dw:'21.3',
       jg:'公路JTG/T F81-04',
       jx:'平测法',
       status: '启用',
    },
    {
        id:'ZJSM023892',
        cf:'1.36',
        dw:'21.0',
        jg:'公路JTG/T F81-05',
        jx:'平测法',
        status: '启用',
     },
     {
        id:'ZJSM023893',
        cf:'1.115',
        dw:'20.0',
        jg:'公路JTG/T F81-06',
        jx:'扇测法',
        status: '启用',
     },
     {
        id:'ZJSM023894',
        cf:'1.025',
        dw:'20.1',
        jg:'公路JTG/T F81-07',
        jx:'斜测法',
        status: '启用',
     },
     {
         id:'ZJSM023895',
         cf:'1.63',
         dw:'20.0',
         jg:'公路JTG/T F81-08',
         jx:'平测法',
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
            title: '测试规范',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '测试方法',
            dataIndex: 'jx',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '采样间隔（μs）',
            dataIndex: 'cf',
        },
        {
            title: '发射脉宽（μs）',
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
                title="参数设置"
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
