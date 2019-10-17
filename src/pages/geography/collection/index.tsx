import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Select, Progress } from "antd";
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
        id: 'TD-ZOP00231',
        jishu: 'WZ12356JG供水管线',
        fenceng: '张宇',
        leixing: '入水口',
        name: '水压采集完成',
        state: '启用',
        jd:'100',
    },
    {
        id: 'TD-ZOP00232',
        jishu: 'WZ16356JG供水管线',
        fenceng: '孟凡',
        leixing: '管线输送中',
        name: '水压采集中',
        state: '启用',
        jd:'68',
    },
    {
        id: 'TD-ZOP00233',
        jishu: 'WZ12656JG供水管线',
        fenceng: '程思',
        leixing: '管线输送中',
        name: '水压采集中',
        state: '启用',
        jd:'43',
    },
    {
        id: 'TD-ZOP00234',
        jishu: 'WZ12746JG供水管线',
        fenceng: '齐天',
        leixing: '入水口',
        name: '水压采集完成',
        state: '启用',
        jd:'100',
    },
    {
        id: 'TD-ZOP00235',
        jishu: 'WZ12366JG供水管线',
        fenceng: '钱偲',
        leixing: '出水口',
        name: '水压采集中',
        state: '启用',
        jd:'79',
    },
    {
        id: 'TD-ZOP00236',
        jishu: 'WZ11256JG供水管线',
        fenceng: '孟宇思',
        leixing: '入水口',
        name: '水压采集中',
        state: '启用',
        jd:'19',
    },
    {
        id: 'TD-ZOP00237',
        jishu: 'WZ112JG供水管线',
        fenceng: '方艳',
        leixing: '出水口',
        name: '未进行水压采集',
        state: '启用',
        jd:'0',
    },
    {
        id: 'TD-ZOP00238',
        jishu: 'WZ11856JG供水管线',
        fenceng: '姜宇',
        leixing: '入水口',
        name: '水压采集中',
        state: '启用',
        jd:'56',
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '数据负责人',
            dataIndex: 'fenceng',
        },
        {
            title: '监测管线',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        
        {
            title: ' 监测点',
            dataIndex: 'leixing',
        },
        {
            title: '数据采集状态',
            dataIndex: 'name',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '采集进度',
            dataIndex: 'jd',
            render: (text) => <Progress percent={text} status="active" />,
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
                title="水压采集"
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
