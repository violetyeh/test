import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Checkbox } from "antd";
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
        id: 'NRJK6121',
        fl:'www.qq.com',
        mc:'qq聊天',
        ma:'信息过滤',
        nl:'张文芳',
    },
    {
        id: 'NRJK6135',
        fl:'www.xiao.com',
        mc:'文件传输',
        ma:'行为审计',
        nl:'王芳',
    },
    {
        id: 'NRJK6138',
        fl:'www.yiersan.com',
        mc:'银行账号',
        ma:'行为审计',
        nl:'刘文',
    },
    {
        id: 'NRJK6121',
        fl:'www.liuba.com',
        mc:'淘宝密码',
        ma:'行为审计',
        nl:'赵媛',
    },
    {
        id: 'NRJK6137',
        fl:'www.qijiu.com',
        mc:'淫秽字词',
        ma:'信息过滤',
        nl:'刘冰',
    },
    {
        id: 'NRJK6135',
        fl:'www.yisan.com',
        mc:'远程登录',
        ma:'行为审计',
        nl:'汪峰',
    },
    {
        id: 'NRJK6164',
        fl:'www.wuliu.com',
        mc:'传销暴力',
        ma:'信息过滤',
        nl:'陈云',
    },
    {
        id: 'NRJK6178',
        fl:'www.ersansi.com',
        mc:'炒股信息',
        ma:'行为审计',
        nl:'王安',
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
            title: '禁止',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >禁止</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '过滤网址',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '过滤内容',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '备注',
            dataIndex: 'ma',
        },
       
        {
            title: '管理员',
            dataIndex: 'nl',
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
                title="内容监控管理"
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
