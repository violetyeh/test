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
        jishu: '7500',
        fenceng: '3000',
        leixing: 'ICID009',
        name:'20',
        state: '启用',
        lg:'津A11N07',
    },
    {
        id: 'SPCC-1012002',
        jishu: '7000',
        fenceng: '2500',
        leixing: 'ICID008',
        name:'22',
        state: '启用',
        lg:'津A20N08',
    },
    {
        id: 'SPCC-1012003',
        jishu: '6000',
        fenceng: '3000',
        leixing: 'ICID007',
        name:'16',
        state: '启用',
        lg:'津A10N14',
    },
    {
        id: 'SPCC-1012004',
        jishu: '8000',
        fenceng: '2500',
        leixing: 'ICID006',
        name:'15',
        state: '启用',
        lg:'津A10N06',
    },
    {
        id: 'SPCC-1012005',
        jishu: '7500',
        fenceng: '2800',
        leixing: 'ICID005',
        name:'10',
        state: '启用',
        lg:'津A10N00',
    },
    {
        id: 'SPCC-1012006',
        jishu: '6500',
        fenceng: '3000',
        leixing: 'ICID004',
        name:'16',
        state: '启用',
        lg:'津A10N03',
    },
    {
        id: 'SPCC-1012007',
        jishu: '6000',
        fenceng: '3500',
        leixing: 'ICID003',
        name:'14',
        state: '启用',
        lg:'津A10N05',
    },
    {
        id: 'SPCC-1012008',
        jishu: '8000',
        fenceng: '3000',
        leixing: 'ICID002',
        name:'15',
        state: '启用',
        lg:'津A10N03',
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
            title: '车队编号',
            dataIndex: 'id',
        },
        {
            title: '车牌号',
            dataIndex: 'lg',
            render: (text) => <Tag color="BLUE">{text}</Tag>,

        },
        
        {
            title: '自重',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'IC卡编号',
            dataIndex: 'leixing',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '额定载荷',
            dataIndex: 'jishu',
        },
        {
            title: '来港次数',
            dataIndex: 'name',
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
                title="港口车辆管理"
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
