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
        id: 'PG007',
        sp:'刘思杰',
        shijian:'笔试抽查',
        biaozhun:'2019年8月16日',
        jiance:'吴启拉',
        process: 60,
        status: '启用',
    },
    {
        id: 'PG008',
        sp:'孙梦雨',
        shijian:'现场抽查',
        biaozhun:'2019年8月15日',
        jiance:'赵元乐',
        process: 40,
        status: '启用',
    },
    {
        id: 'PG009',
        sp:'王孙怡',
        shijian:'笔试',
        biaozhun:'2019年8月24日',
        jiance:'王可媛',
        process: 30,
        status: '启用',
    },
    {
        id: 'PG002',
        sp:'赵思言',
        shijian:'口试',
        biaozhun:'2019年8月21日',
        jiance:'郑峰',
        process: 88,
        status: '启用',
    },
    {
        id: 'PG003',
        sp:'李媛媛',
        shijian:'笔试抽查 ',
        biaozhun:'2019年8月20日',
        jiance:'王媛',
        process: 99,
        status: '启用',
    },
    {
        id: 'PG004',
        sp:'齐天雷',
        shijian:'现场抽查',
        biaozhun:'2019年8月19日',
        jiance:'刘琦歌',
        process: 5,
        status: '启用',
    },
    {
        id: 'PG005',
        sp:'吴磊',
        shijian:'笔试',
        biaozhun:'2019年8月18日',
        jiance:'李武雨',
        process: 95,
        status: '启用',
    },
    {
        id: 'PG006',
        sp:'赵倩',
        shijian:'口试',
        biaozhun:'2019年8月17日',
        jiance:'王可可',
        process: 100,
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '被评估人',
            dataIndex: 'sp',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '评估方式',
            dataIndex: 'shijian',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '评估日期',
            dataIndex: 'biaozhun',
        },
        {
            title: '评估老师',
            dataIndex: 'jiance',
            render: (text) => <Tag color="BROWN">{text}</Tag>,
        },
        {
            title: '评估进度',
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
                title="培训效果评估"
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
