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
        id: 'BGID12',
        sp:'业务管理',
        shijian:'项目-业务管理',
        biaozhun:'管理员',
        jiance:'郑峰',
        process: 88,
        status: '启用',
    },
    {
        id: 'BGID13',
        sp:'业务邮件',
        shijian:'邮件-有关食品供应交谈的详细情况 ',
        biaozhun:'业务员',
        jiance:'王媛',
        process: 99,
        status: '启用',
    },
    {
        id: 'BGID14',
        sp:'事务提醒',
        shijian:'事务-会议提醒',
        biaozhun:'经理',
        jiance:'刘琦歌',
        process: 5,
        status: '启用',
    },
    {
        id: 'BGID15',
        sp:'便签',
        shijian:'提醒下午三点有个会议',
        biaozhun:'业务员',
        jiance:'李武雨',
        process: 95,
        status: '启用',
    },
    {
        id: 'BGID16',
        sp:'即时通讯',
        shijian:'客户通讯簿*',
        biaozhun:'总经理',
        jiance:'王可可',
        process: 100,
        status: '启用',
    },
    {
        id: 'BGID17',
        sp:'办公委托',
        shijian:'供应商联系',
        biaozhun:'管理员',
        jiance:'吴启拉',
        process: 60,
        status: '启用',
    },
    {
        id: 'BGID18',
        sp:'办公日志',
        shijian:'档案-归档日志',
        biaozhun:'业务员',
        jiance:'赵元乐',
        process: 40,
        status: '启用',
    },
    {
        id: 'BGID19',
        sp:'日程安排',
        shijian:'2019年7月11日日程安排',
        biaozhun:'经理',
        jiance:'王可媛',
        process: 30,
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
            title: '服务名称',
            dataIndex: 'sp',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '描述',
            dataIndex: 'shijian',
        },
        {
            title: '角色',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="gray">{text}</Tag>,
        },
        {
            title: '上级领导',
            dataIndex: 'jiance',
            render: (text) => <Tag color="brown">{text}</Tag>,
        },
        {
            title: '服务进度',
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
                title="业务服务"
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
