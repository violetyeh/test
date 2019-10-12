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
        id: 'JL221',
        fl:'#1工程现场监理',
        mc:'PILE#1',
        ma:'26.00',
        nl:'张文芳',
    },
    {
        id: 'JL235',
        fl:'#2工程现场监理',
        mc:'PILE#2',
        ma:'25.00',
        nl:'王芳',
    },
    {
        id: 'JL238',
        fl:'#3工程现场监理',
        mc:'PILE#3',
        ma:'27.00',
        nl:'刘文',
    },
    {
        id: 'JL221',
        fl:'#4工程现场监理',
        mc:'PILE#4',
        ma:'26.00',
        nl:'赵媛',
    },
    {
        id: 'JL237',
        fl:'#5工程现场监理',
        mc:'PILE#5',
        ma:'25.00',
        nl:'刘冰',
    },
    {
        id: 'JL235',
        fl:'#6工程现场监理',
        mc:'PILE#6',
        ma:'26.00',
        nl:'汪峰',
    },
    {
        id: 'JL264',
        fl:'#7工程现场监理',
        mc:'PILE#7',
        ma:'30.00',
        nl:'陈云',
    },
    {
        id: 'JL278',
        fl:'#8工程现场监理',
        mc:'PILE#8',
        ma:'25.00',
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
            title: '监理状态',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >监理中</Checkbox>
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
            title: '工程节点',
            dataIndex: 'mc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '建筑高（m）',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '监理人员',
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
                title="工程现场信息"
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
