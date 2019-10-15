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
        id: 'HWYS101',
        jishu: '2019年9月20日08:48:16',
        fenceng: '大米',
        leixing: '运输车辆-210',
        name:'20',
        state: '启用',
        lg:' 京NLU686',
        sj:'秦天宇',
    },
    {
        id: 'HWYS102',
        jishu: '2019年9月21日09:49:11',
        fenceng: '番茄',
        leixing: '运输车辆-289',
        name:'22',
        state: '启用',
        lg:' 京E110MK',
        sj:'李鹏',
    },
    {
        id: 'HWYS103',
        jishu: '2019年9月22日10:50:07',
        fenceng: '土豆',
        leixing: '运输车辆-154',
        name:'16',
        state: '启用',
        lg:' 津B25B3',
        sj:'赵飞',
    },
    {
        id: 'HWYS104',
        jishu: '2019年9月23日14:51:02',
        fenceng: '衣柜',
        leixing: '运输车辆-315',
        name:'15',
        state: '启用',
        lg:' 沪C66A6',
        sj:'刘王宇',
    },
    {
        id: 'HWYS105',
        jishu: '2019年9月24日12:52:57',
        fenceng: '冰箱',
        leixing: '运输车辆-343',
        name:'10',
        state: '启用',
        lg:'渝A23M6',
        sj:'秦汉',
    },
    {
        id: 'HWYS106',
        jishu: '2019年10月1日13:53:47',
        fenceng: '饮料',
        leixing: '运输车辆-342',
        name:'16',
        state: '启用',
        lg:' 渝A52B6',
        sj:'陈宇',
    },
    {
        id: 'HWYS107',
        jishu: '2019年10月2日14:54:42',
        fenceng: '罐头',
        leixing: '运输车辆-258',
        name:'14',
        state: '启用',
        lg:'冀C63K6',
        sj:'刘磊',
    },
    {
        id: 'HWYS108',
        jishu: '2019年10月3日15:55:24',
        fenceng: '电视机',
        leixing: '运输车辆-247',
        name:'15',
        state: '启用',
        lg:'冀C666A',
        sj:'王三',
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
            title: '车牌号',
            dataIndex: 'lg',
            render: (text) => <Tag color="BLUE">{text}</Tag>,

        },
        {
            title: '司机',
            dataIndex: 'sj',
        },
        
        {
            title: '运输货物',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '内部编号',
            dataIndex: 'leixing',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '最新时间',
            dataIndex: 'jishu',
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
                title="货物运输车辆管理"
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
