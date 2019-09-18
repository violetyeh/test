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
        id: 'D0001',
        jishu: '国家标准《电力工程电缆设计规范》',
        fenceng: '张宇',
        leixing: '规划设计',
        name: '标准化 ',
        state: '启用',
    },
    {
        id: 'D0002',
        jishu: '《南方电网公司10kV和35kV配网标准设计》',
        fenceng: '孟凡',
        leixing: '规划设计',
        name: '集团化 ',
        state: '启用',
    },
    {
        id: 'D0003',
        jishu: '中国南方电网有限责任公司企业标准《中国南方电网城市配电网 技术导则》',
        fenceng: '程思',
        leixing: '建设',
        name: '精细化 ',
        state: '启用',
    },
    {
        id: 'D0004',
        jishu: '《电网标准化应用工作指导意见（试行）》',
        fenceng: '齐天',
        leixing: '维护',
        name: '集约化 ',
        state: '启用',
    },
    {
        id: 'D0005',
        jishu: '《供电局有限公司配网安健环设施标准》',
        fenceng: '钱偲',
        leixing: '规划设计',
        name: '精细化 ',
        state: '启用',
    },
    {
        id: 'D0006',
        jishu: '《中低压配电网规划设计技术原则（试行）》',
        fenceng: '孟宇思',
        leixing: '验收',
        name: '标准化 ',
        state: '启用',
    },
    {
        id: 'D0007',
        jishu: '《南方电网公司10kV和35kV配网标准设计》',
        fenceng: '方艳',
        leixing: '规划设计',
        name: '精细化 ',
        state: '启用',
    },
    {
        id: 'D0008',
        jishu: '《电网标准化应用工作指导意见（试行）》',
        fenceng: '姜宇',
        leixing: '验收',
        name: '精细化 ',
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '项目负责人',
            dataIndex: 'fenceng',
        },
        {
            title: '设计法规标准',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '设计思路',
            dataIndex: 'name',
        },
        {
            title: ' 规划设计环节',
            dataIndex: 'leixing',
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
                title="设计依据管理"
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
