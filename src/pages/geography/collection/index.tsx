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
        id: 'CWG-0035',
        fl:'存物中',
        mc:'192.168.1.26',
        ma:'密码打开',
        nl:'汪峰',
        dbz:'使用动态获取的密码',
    },
    {
        id: 'CWG-0064',
        fl:'存物中',
        mc:'192.168.1.17',
        ma:'扫码打开',
        nl:'陈云',
        dbz:'使用静态获取的密码',
    },
    {
        id: 'CWG-0078',
        fl:'空闲中',
        mc:'192.168.1.14',
        ma:'密码打开',
        nl:'王安',
        dbz:'使用动态获取的密码',
    },
    {
        id: 'CWG-0021',
        fl:'存物中',
        mc:'192.168.1.28',
        ma:'扫码打开',
        nl:'张三石',
        dbz:'使用静态获取的密码',
    },
    {
        id: 'CWG-0035',
        fl:'空闲中',
        mc:'192.168.0.18',
        ma:'密码打开',
        nl:'王芳',
        dbz:'使用动态获取的密码',
    },
    {
        id: 'CWG-0038',
        fl:'存物中',
        mc:'192.168.1.44',
        ma:'密码打开',
        nl:'刘文',
        dbz:'使用静态获取的密码',
    },
    {
        id: 'CWG-0021',
        fl:'存物中',
        mc:'192.168.1.110',
        ma:'扫码打开',
        nl:'赵媛',
        dbz:'使用动态获取的密码',
    },
    {
        id: 'CWG-0037',
        fl:'空闲中',
        mc:'192.168.1.53',
        ma:'密码打开',
        nl:'刘冰',
        dbz:'使用静态获取的密码',
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
            title: '储物柜状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
          },
        {
            title: '储物柜编号',
            dataIndex: 'id',
        },
       
       
        {
            title: '开启操作',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '空闲状态',
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
            title: '密码获取方式',
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
                title="储物柜设置"
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
