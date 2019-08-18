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
        id: 'ZJ11101',
        tongdao:'ZJ00606生产质检通道',
        touguang:'进货入库检验',
        duizhao:'让步放行',
        shijian:'13分钟',
        state: '启用',
        jd:'23',
    },
    {
        id: 'ZJ11102',
        tongdao:'ZJ00679生产质检通道',
        touguang:'生产过程检验',
        duizhao:'合格入库',
        shijian:'4分钟',
        state: '启用',
        jd:'69',
    },
    {
        id: 'ZJ11103',
        tongdao:'ZJ00684生产质检通道',
        touguang:'成品入库检验',
        duizhao:'不合格退货',
        shijian:'3分钟',
        state: '启用',
        jd:'100',
    },
    {
        id: 'ZJ11104',
        tongdao:'ZJ00963生产质检通道',
        touguang:'成品出库检验',
        duizhao:'不合格退货',
        shijian:'5分钟',
        state: '启用',
        jd:'54',
    },
    {
        id: 'ZJ11105',
        tongdao:'ZJ00765生产质检通道',
        touguang:'成品出库检验',
        duizhao:'合格入库',
        shijian:'4分钟',
        state: '启用',
        jd:'69',
    },
    {
        id: 'ZJ11106',
        tongdao:'ZJ006395生产质检通道',
        touguang:'成品入库检验',
        duizhao:'不合格退货',
        shijian:'7分钟',
        state: '启用',
        jd:'77',
    },
    {
        id: 'ZJ11107',
        tongdao:'ZJ00363生产质检通道',
        touguang:'生产过程检验',
        duizhao:'合格入库',
        shijian:'3分钟',
        state: '启用',
        jd:'62',
    },
    {
        id: 'ZJ11108',
        tongdao:'ZJ00854生产质检通道',
        touguang:'进货入库检验',
        duizhao:'让步放行',
        shijian:'10分钟',
        state: '启用',
        jd:'84',
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
            title: '生产质检编号',
            dataIndex: 'id',
        },
        {
            title: '生产质检通道',
            dataIndex: 'tongdao',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '质检名称',
            dataIndex: 'touguang',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '操作',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '生产质检时间',
            dataIndex: 'shijian',
        },
        {
            title: '生产质检进度',
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
                title="生产质检管理"
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
