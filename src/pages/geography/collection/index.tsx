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
        id: 'FHQ-010035',
        fl:'病毒清除',
        mc:'192.168.1.26',
        ma:'只禁止列表中MAC地址接入',
        nl:'汪峰',
        dbz:'使用动态获取的DNS',
    },
    {
        id: 'FHQ-010064',
        fl:'病毒检测',
        mc:'192.168.1.17',
        ma:'只允许列表中MAC地址接入',
        nl:'陈云',
        dbz:'使用静态获取的DNS',
    },
    {
        id: 'FHQ-010078',
        fl:'漏洞清除',
        mc:'192.168.1.14',
        ma:'只允许列表中MAC地址接入',
        nl:'王安',
        dbz:'使用动态获取的DNS',
    },
    {
        id: 'FHQ-010021',
        fl:'漏洞检测',
        mc:'192.168.1.28',
        ma:'只禁止列表中MAC地址接入',
        nl:'张三石',
        dbz:'使用静态获取的DNS',
    },
    {
        id: 'FHQ-010035',
        fl:'垃圾清除',
        mc:'192.168.0.18',
        ma:'只允许列表中MAC地址接入',
        nl:'王芳',
        dbz:'使用动态获取的DNS',
    },
    {
        id: 'FHQ-010038',
        fl:'漏洞检测',
        mc:'192.168.1.44',
        ma:'只允许列表中MAC地址接入',
        nl:'刘文',
        dbz:'使用静态获取的DNS',
    },
    {
        id: 'FHQ-010021',
        fl:'病毒清除',
        mc:'192.168.1.110',
        ma:'只禁止列表中MAC地址接入',
        nl:'赵媛',
        dbz:'使用动态获取的DNS',
    },
    {
        id: 'FHQ-010037',
        fl:'病毒攻击防守',
        mc:'192.168.1.53',
        ma:'只允许列表中MAC地址接入',
        nl:'刘冰',
        dbz:'使用静态获取的DNS',
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
            title: 'MAC地址过滤开启',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
          },
        {
            title: '过滤规则',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '防火墙操作',
            dataIndex: 'fl',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: ' 管理员',
            dataIndex: 'nl',
        },
        {
            title: 'DNS方式',
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
                title="防火墙设置"
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
