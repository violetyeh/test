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
        id: 'DKL0121',
        fenceng: '大兴路',
        name: '中内车道',
        leixing: '不小于40米',
        jishu: '待规划',
        state: '启用',
    },
    {
        id: 'DKL0122',
        fenceng: '海滨路',
        name: '中外车道',
        leixing: '20—24米',
        jishu: '待规划',
        state: '启用',
    },
    {
        id: 'DKL0123',
        fenceng: '红石路',
        name: '中内车道',
        leixing: '14—18米',
        jishu: '待规划',
        state: '启用',
    },
    {
        id: 'DKL0124',
        fenceng: '华怡路',
        name: '中外车道',
        leixing: '20—24米',
        jishu: '已规划',
        state: '启用',
    },
    {
        id: 'DKL0125',
        fenceng: '金家岩路',
        name: '中线车道',
        leixing: '14—18米',
        jishu: '待规划',
        state: '启用',
    },
    {
        id: 'DKL0126',
        fenceng: '岚园路',
        name: '超车道',
        leixing: '30—40米',
        jishu: '规划不通过',
        state: '启用',
    },
    {
        id: 'DKL0127',
        fenceng: '民权路',
        name: '行车道',
        leixing: '20—24米',
        jishu: '已规划',
        state: '启用',
    },
    {
        id: 'DKL0128',
        fenceng: '青年路',
        name: '主线道',
        leixing: '30—40米',
        jishu: '待规划',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '路口名称',
            dataIndex: 'fenceng',
        },
        {
            title: '车道类型',
            dataIndex: 'name',
        },
        {
            title: ' 进口道宽度',
            dataIndex: 'leixing',
        },
        {
            title: '状态',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
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
                title="交叉口交通流"
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
