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
        id: 'CHUN0027',
        mc:'砷',
        tiji2:'纯化水样本YB01',
        zhiliang:'200.00',
        zb:1,
        state: '启用',
    },
    {
        id: 'CHUN0028',
        mc:'汞',
        tiji2:'纯化水样本YB85',
        zhiliang:'250.00',
        zb:3,
        state: '启用',
    },
    {
        id: 'CHUN0021',
        mc:'pH',
        tiji2:'纯化水样本YB03',
        zhiliang:'150.00',
        zb:30,
        state: '启用',
    },
    {
        id: 'CHUN0022',
        mc:'氨氮',
        tiji2:'纯化水样本YB56',
        zhiliang:'50.00',
        zb:23,
        state: '启用',
    },
    {
        id: 'CHUN0023',
        mc:'硝酸盐',
        tiji2:'纯化水样本YB41',
        zhiliang:'100.00',
        zb:3,
        state: '启用',
    },
    {
        id: 'CHUN0024',
        mc:'亚硝酸盐',
        tiji2:'纯化水样本YB65',
        zhiliang:'110.00',
        zb:5,
        state: '启用',
    },
    {
        id: 'CHUN0025',
        mc:'挥发性酚类',
        tiji2:'纯化水样本YB14',
        zhiliang:'30.00',
        zb:1,
        state: '启用',
    },
    {
        id: 'CHUN0026',
        mc:'氰化物',
        tiji2:'纯化水样本YB04',
        zhiliang:'20.00',
        zb:4,
        state: '启用',
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
            title: '监测编号',
            dataIndex: 'id',
        },
        {
            title: '纯化水监测项目',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '监测样本',
            dataIndex: 'tiji2',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '样本量（mg）',
            dataIndex: 'zhiliang',
        },
        {
            title: '肉眼可见物占比',
            dataIndex: 'zb',
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
                title="监测参数管理"
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
