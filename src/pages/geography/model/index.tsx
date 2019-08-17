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
        sp:'个人文件柜',
        shijian:'档案-文件管理',
        biaozhun:'管理员',
        jiance:'郑峰',
        process: 88,
        status: '启用',
    },
    {
        id: 'BGID13',
        sp:'政务邮件',
        shijian:'邮件-新修订《纳税服务投诉管理办法》 ',
        biaozhun:'书记',
        jiance:'王媛',
        process: 99,
        status: '启用',
    },
    {
        id: 'BGID14',
        sp:'事务提醒',
        shijian:'事务-会议提醒',
        biaozhun:'政协会长',
        jiance:'刘琦歌',
        process: 5,
        status: '启用',
    },
    {
        id: 'BGID15',
        sp:'便签',
        shijian:'提醒下午三点有个会议',
        biaozhun:'人大代表',
        jiance:'李武雨',
        process: 95,
        status: '启用',
    },
    {
        id: 'BGID16',
        sp:'即时通讯',
        shijian:'通讯簿*',
        biaozhun:'书记',
        jiance:'王可可',
        process: 100,
        status: '启用',
    },
    {
        id: 'BGID17',
        sp:'办公委托',
        shijian:'有关区县道路维修...',
        biaozhun:'管理员',
        jiance:'吴启拉',
        process: 60,
        status: '启用',
    },
    {
        id: 'BGID18',
        sp:'办公日志',
        shijian:'档案-归档日志',
        biaozhun:'文员',
        jiance:'赵元乐',
        process: 40,
        status: '启用',
    },
    {
        id: 'BGID19',
        sp:'日程安排',
        shijian:'2019年7月11日日程安排',
        biaozhun:'书记',
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
            title: '办公编号',
            dataIndex: 'id',
        },
        {
            title: '办公名称',
            dataIndex: 'sp',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '描述',
            dataIndex: 'shijian',
        },
        {
            title: '办公角色',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="gray">{text}</Tag>,
        },
        {
            title: '上级领导',
            dataIndex: 'jiance',
            render: (text) => <Tag color="brown">{text}</Tag>,
        },
        {
            title: '办公进度',
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
                title="办公任务设置"
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
