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
        id: 'SJ001',
        mc:'《斗破苍穹》小说',
        bm:'150天',
        px:'1258902x011',
        lj:'2019-08-11',
        nr:'txt',
        status:96,
    },
    {
        id: 'SJ002',
        mc:'游戏截图',
        bm:'90天',
        px:'1258902x016',
        lj:'2019-08-03',
        nr:'相册',
        status:88,
    },
    {
        id: 'SJ003',
        mc:'电影《流浪地球》',
        bm:'60天',
        px:'1258902x013',
        lj:'2019-08-06',
        nr:'视频',
        status:74,
    },
    {
        id: 'SJ004',
        mc:'项链淘宝链接',
        bm:'100天',
        px:'1258902x015',
        lj:'2019-08-05',
        nr:'链接',
        status:16,
    },
    {
        id: 'SJ005',
        mc:'《斗罗大陆》小说',
        bm:'200天',
        px:'3258902x013',
        lj:'2019-08-10',
        nr:'txt',
        status:54,
    },
    {
        id: 'SJ006',
        mc:'游戏截图',
        bm:'120天',
        px:'1248902x012',
        lj:'2019-08-07',
        nr:'相册',
        status:71,
    },
    {
        id: 'SJ007',
        mc:'电影《战狼》',
        bm:'120天',
        px:'1258902x011',
        lj:'2019-08-09',
        nr:'视频',
        status:64,
    },
    {
        id: 'SJ008',
        mc:'女装淘宝链接',
        bm:'150天',
        px:'1258902x32',
        lj:'2019-08-06',
        nr:'链接',
        status:59,
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '保管期限',
            dataIndex: 'bm',
            
        },
        {
            title: '档号',
            dataIndex: 'px',
        },
        {
            title: '备份日期',
            dataIndex: 'lj',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '数据类型',
            dataIndex: 'nr',
        },
        {
            title: '备份进度',
            dataIndex: 'status',
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
                title="数据管理"
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
