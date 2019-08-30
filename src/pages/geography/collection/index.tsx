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
        id: 'LUMC0211',
        fenceng: '大兴路',
        name: '3404.141',
        leixing: '3404.151',
        jishu: '待审批',
        state: '启用',
    },
    {
        id: 'LUMC0212',
        fenceng: '海滨路',
        name: '3405.111',
        leixing: '3405.121',
        jishu: '待审批',
        state: '启用',
    },
    {
        id: 'LUMC0213',
        fenceng: '红石路',
        name: '3404.121',
        leixing: '3404.131',
        jishu: '待审批',
        state: '启用',
    },
    {
        id: 'LUMC0214',
        fenceng: '华怡路',
        name: '3102.125',
        leixing: '3102.135',
        jishu: '已审批',
        state: '启用',
    },
    {
        id: 'LUMC0215',
        fenceng: '金家岩路',
        name: '3256.021',
        leixing: '3256.031',
        jishu: '待审批',
        state: '启用',
    },
    {
        id: 'LUMC0216',
        fenceng: '岚园路',
        name: '3106.231',
        leixing: '3106.241',
        jishu: '审批不通过',
        state: '启用',
    },
    {
        id: 'LUMC0217',
        fenceng: '民权路',
        name: '3021.025',
        leixing: '3021.035',
        jishu: '已审批',
        state: '启用',
    },
    {
        id: 'LUMC0218',
        fenceng: '青年路',
        name: '3103.042',
        leixing: '3103.052',
        jishu: '待审批',
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
            title: '路线编号',
            dataIndex: 'id',
        },
        {
            title: '路线名称',
            dataIndex: 'fenceng',
        },
        {
            title: '阻断起点桩号',
            dataIndex: 'name',
        },
        {
            title: ' 阻断止点桩号',
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
                title="公路交通阻断信息"
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
