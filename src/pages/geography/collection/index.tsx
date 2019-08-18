import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Progress } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";
import { Chart, View, Geom, Label } from "bizcharts";
import DataSet from '@antv/data-set';
import dituData from "./mockdata";


interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    currentItem: any;
    data: any[];
}

const mockData = [
    {
        id: 'KFWH0000000021',
        fl:'开发项目漏洞检测',
        mc:'192.168.1.28',
        ma:'bug查找',
        nl:'张三石',
        dbz:'维护完成',
        jd:'100',
    },
    {
        id: 'KFWH0000000035',
        fl:'开发项目垃圾清除',
        mc:'192.168.0.18',
        ma:'bug检测',
        nl:'王芳',
        dbz:'维护中',
        jd:'10',
    },
    {
        id: 'KFWH0000000038',
        fl:'开发项目漏洞检测',
        mc:'192.168.1.44',
        ma:'bug查找',
        nl:'刘文',
        dbz:'维护完成',
        jd:'100',
    },
    {
        id: 'KFWH0000000021',
        fl:'开发项目病毒清除',
        mc:'192.168.1.110',
        ma:'bug修改',
        nl:'赵媛',
        dbz:'维护中',
        jd:'55',
    },
    {
        id: 'KFWH0000000037',
        fl:'开发项目病毒检测',
        mc:'192.168.1.53',
        ma:'bug检测',
        nl:'刘冰',
        dbz:'维护中',
        jd:'78',
    },
    {
        id: 'KFWH0000000035',
        fl:'开发项目病毒清除',
        mc:'192.168.1.26',
        ma:'bug修改',
        nl:'汪峰',
        dbz:'维护中',
        jd:'56',
    },
    {
        id: 'KFWH0000000064',
        fl:'开发项目病毒检测',
        mc:'192.168.1.17',
        ma:'bug修改',
        nl:'陈云',
        dbz:'维护完成',
        jd:'100',
    },
    {
        id: 'KFWH0000000078',
        fl:'开发项目漏洞清除',
        mc:'192.168.1.14',
        ma:'bug查找',
        nl:'王安',
        dbz:'维护中',
        jd:'36',
    },
    
]

class Type extends Component<TypeProps, TypeState>{

    state: TypeState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: '任务序号',
            dataIndex: 'id',
        },
        {
            title: '任务名称',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'mc',
        },
        {
            title: '开发项目维护类型',
            dataIndex: 'ma',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
       
        {
            title: '管理员',
            dataIndex: 'nl',
        },
        {
            title: '维护状态',
            dataIndex: 'dbz',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '维护进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
        console.log(record, 'res');
        this.setState({
            currentItem: record,
            saveVisible: true,
        });
    }

    delete = (record: any) => {
        message.error('核心数据，无法删除');
    }

    render() {
        const { saveVisible, currentItem, data } = this.state;

        return (
            <PageHeaderWrapper
                title="开发维护任务管理"
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
            </PageHeaderWrapper >
        );
    }
}

export default Type;
