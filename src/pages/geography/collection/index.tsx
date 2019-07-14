import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag } from "antd";
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
        id: 'FHQ0121',
        fl:'漏洞检测',
        mc:'192.168.1.28',
        ma:'漏洞利用',
        nl:'张三石',
        dbz:'正在检测中',
    },
    {
        id: 'FHQ0135',
        fl:'垃圾清除',
        mc:'192.168.0.18',
        ma:'协议暴力攻击',
        nl:'王芳',
        dbz:'正在清除中',
    },
    {
        id: 'FHQ0138',
        fl:'漏洞检测',
        mc:'192.168.1.44',
        ma:'漏洞利用',
        nl:'刘文',
        dbz:'正在检测中',
    },
    {
        id: 'FHQ0121',
        fl:'病毒清除',
        mc:'192.168.1.110',
        ma:'病毒利用',
        nl:'赵媛',
        dbz:'正在清除中',
    },
    {
        id: 'FHQ0137',
        fl:'病毒攻击防守',
        mc:'192.168.1.53',
        ma:'协议暴力攻击',
        nl:'刘冰',
        dbz:'正在防守中',
    },
    {
        id: 'FHQ0135',
        fl:'病毒清除',
        mc:'192.168.1.26',
        ma:'病毒利用',
        nl:'汪峰',
        dbz:'正在清除中',
    },
    {
        id: 'FHQ0164',
        fl:'病毒检测',
        mc:'192.168.1.17',
        ma:'病毒利用',
        nl:'陈云',
        dbz:'正在检测中',
    },
    {
        id: 'FHQ0178',
        fl:'漏洞清除',
        mc:'192.168.1.14',
        ma:'漏洞利用',
        nl:'王安',
        dbz:'正在清除中',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '任务名称',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '目标IP',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '攻击类型',
            dataIndex: 'ma',
        },
       
        {
            title: '执行者',
            dataIndex: 'nl',
        },
        {
            title: '任务状态',
            dataIndex: 'dbz',
            render: (text) => <Tag color="red">{text}</Tag>,
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
                title="防火墙任务管理"
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
