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
        id: 'SPCC-1012001',
        jishu: '建议速度',
        fenceng: '路线',
        leixing: '沿路线布置',
        name:'20',
        state: '启用',
        lg:'交通设施规划项目07',
    },
    {
        id: 'SPCC-1012002',
        jishu: '停车让行',
        fenceng: '桥梁护栏',
        leixing: '沿直线布置',
        name:'22',
        state: '启用',
        lg:'交通设施规划项目08',
    },
    {
        id: 'SPCC-1012003',
        jishu: '减速让行',
        fenceng: '路基护栏',
        leixing: '绘制桩号',
        name:'16',
        state: '启用',
        lg:'交通设施规划项目01',
    },
    {
        id: 'SPCC-1012004',
        jishu: '禁止停车',
        fenceng: '涵洞通道护栏',
        leixing: '指路标志',
        name:'15',
        state: '启用',
        lg:'交通设施规划项目06',
    },
    {
        id: 'SPCC-1012005',
        jishu: '限制宽度',
        fenceng: '桥梁护栏',
        leixing: '警告标志',
        name:'10',
        state: '启用',
        lg:'交通设施规划项目09',
    },
    {
        id: 'SPCC-1012006',
        jishu: '限制高度',
        fenceng: '路基中分带护栏',
        leixing: '禁令标志',
        name:'16',
        state: '启用',
        lg:'交通设施规划项目03',
    },
    {
        id: 'SPCC-1012007',
        jishu: '限制质量',
        fenceng: '指示标志<圆形>',
        leixing: '258',
        name:'14',
        state: '启用',
        lg:'交通设施规划项目05',
    },
    {
        id: 'SPCC-1012008',
        jishu: '限制速度',
        fenceng: '路基路侧护栏',
        leixing: '旅游区标志',
        name:'15',
        state: '启用',
        lg:'交通设施规划项目03',
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
            title: '项目名称',
            dataIndex: 'lg',
            render: (text) => <Tag color="BLUE">{text}</Tag>,

        },
        
        {
            title: '安全设施',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '标志设计',
            dataIndex: 'leixing',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '标志版面设计',
            dataIndex: 'jishu',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '规划进度',
            dataIndex: 'name',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="激活" unCheckedChildren="禁用" />,
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
                title="项目数据"
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
