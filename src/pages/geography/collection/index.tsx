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
        id: 'WXNR000021',
        fl:'eth2.100',
        mc:'10.50.0.3/54',
        ma:'信息过滤',
        nl:'张文芳',
    },
    {
        id: 'WXNR000035',
        fl:'eth2.200',
        mc:'10.50.0.0/01',
        ma:'行为审计',
        nl:'王芳',
    },
    {
        id: 'WXNR000038',
        fl:'eth2.310',
        mc:'10.50.0.1/32',
        ma:'行为审计',
        nl:'刘文',
    },
    {
        id: 'WXNR000021',
        fl:'eth2.199',
        mc:'10.50.0.1/52',
        ma:'行为审计',
        nl:'赵媛',
    },
    {
        id: 'WXNR000037',
        fl:'eth2.215',
        mc:'10.50.0.0/16',
        ma:'信息过滤',
        nl:'刘冰',
    },
    {
        id: 'WXNR000035',
        fl:'eth2.177',
        mc:'10.50.0.0/16',
        ma:'行为审计',
        nl:'汪峰',
    },
    {
        id: 'WXNR000064',
        fl:'eth2.023',
        mc:'10.50.0.16/52',
        ma:'信息过滤',
        nl:'陈云',
    },
    {
        id: 'WXNR000078',
        fl:'eth2.014',
        mc:'10.50.0.2/32',
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
            title: 'VLAN接口',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '目标网络',
            dataIndex: 'mc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '检测操作',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '检测管理员',
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
                title="威胁内容信息"
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
