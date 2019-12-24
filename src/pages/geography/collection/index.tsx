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
        id: 'DP2301201',
        xm:'视网膜出血和玻璃体积血',
        jg:'女',
        dw:'BLH200',
        dp:'2019年12月07日',
        pd:'2019年12月10日',
        state: '启用',
        name:'关笑笑',
    },
    {
        id: 'DP2301202',
        xm:'外伤所致的前房、结膜下、眼脸出血',
        jg:'男',
        dw:'BLH300',
        dp:'2019年12月03日',
        pd:'2019年12月10日',
        state: '启用',
        name:'赵云',
    },
    {
        id: 'DP2301203',
        xm:'糖尿病视网膜病变',
        jg:'女',
        dw:'BLH120',
        dp:'2019年12月03日',
        pd:'2019年12月07日',
        state: '启用',
        name:'王梦洁',
    },
    {
        id: 'DP2301204',
        xm:'视网膜静脉阻塞',
        jg:'男',
        dw:'BLH300',
        dp:'2019年12月13日',
        pd:'2019年12月14日',
        state: '启用',
        name:'余天',
    },
    {
        id: 'DP2301205',
        xm:'视网膜静脉周围炎',
        jg:'女',
        dw:'BLH210',
        dp:'2019年12月13日',
        pd:'2019年12月14日',
        state: '启用',
        name:'赵子涵',
    },
    {
        id: 'DP2301206',
        xm:'双眼不停流泪，刺痛',
        jg:'女',
        dw:'BLH150',
        dp:'2019年12月03日',
        pd:'2019年12月12日',
        state: '启用',
        name:'陈梓童',
    },
    {
        id: 'DP2301207',
        xm:'左眼充满血丝',
        jg:'男',
        dw:'BLH180',
        dp:'2019年12月05日',
        pd:'2019年12月06日',
        state: '启用',
        name:'姜宇',
    },
    {
        id: 'DP2301208',
        xm:'右眼视物模糊不清',
        jg:'男',
        dw:'BLH260',
        dp:'2019年12月08日',
        pd:'2019年12月11日',
        state: '启用',
        name:'张峰',
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
            title: '姓名',
            dataIndex: 'name',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '诊断时间',
            dataIndex: 'dp',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '送检原因',
            dataIndex: 'xm',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '性别',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '病历号',
            dataIndex: 'dw',
            render: (text) => <Tag color="blue">{text}</Tag>,
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
                title="病人信息"
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
