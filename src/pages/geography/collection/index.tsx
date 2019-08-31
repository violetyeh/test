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
        fl:'#1公路基桩检测',
        mc:'PILE#1',
        ma:'信息过滤',
        nl:'张文芳',
    },
    {
        id: 'WXNR000035',
        fl:'#2公路基桩检测',
        mc:'PILE#2',
        ma:'行为审计',
        nl:'王芳',
    },
    {
        id: 'WXNR000038',
        fl:'#3公路基桩检测',
        mc:'PILE#3',
        ma:'行为审计',
        nl:'刘文',
    },
    {
        id: 'WXNR000021',
        fl:'#4公路基桩检测',
        mc:'PILE#4',
        ma:'行为审计',
        nl:'赵媛',
    },
    {
        id: 'WXNR000037',
        fl:'#5公路基桩检测',
        mc:'PILE#5',
        ma:'信息过滤',
        nl:'刘冰',
    },
    {
        id: 'WXNR000035',
        fl:'#6公路基桩检测',
        mc:'PILE#6',
        ma:'行为审计',
        nl:'汪峰',
    },
    {
        id: 'WXNR000064',
        fl:'#7公路基桩检测',
        mc:'PILE#7',
        ma:'信息过滤',
        nl:'陈云',
    },
    {
        id: 'WXNR000078',
        fl:'#8公路基桩检测',
        mc:'PILE#8',
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
            title: '工程名',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '桩号',
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
                title="基本信息设置"
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
