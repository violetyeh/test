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
        id: 'MBGL064',
        xm:'用户信息',
        jg:'find',
        dw:'head.html',
        pd:'2019年7月14日',
        state: '启用',
    },
    {
        id: 'MBGL065',
        xm:'网页浏览量',
        jg:'search',
        dw:'bottom.html',
        pd:'2019年6月14日',
        state: '启用',
    },
    {
        id: 'MBGL066',
        xm:'新用户量',
        jg:'find',
        dw:'nav.html',
        pd:'2019年7月12日',
        state: '启用',
    },
    {
        id: 'MBGL067',
        xm:'用户年龄段',
        jg:'find',
        dw:'index.html',
        pd:'2019年7月06日',
        state: '启用',
    },
    {
        id: 'MBGL068',
        xm:'用户购买意愿',
        jg:'search',
        dw:'neiye.html',
        pd:'2019年7月04日',
        state: '启用',
    },
    {
        id: 'MBGL061',
        xm:'购买人数',
        jg:'search',
        dw:'jieguo.html',
        pd:'2019年7月09日',
        state: '启用',
    },
    {
        id: 'MBGL062',
        xm:'浏览页面10分钟以上',
        jg:'search',
        dw:'anniu.html',
        pd:'2019年7月10日',
        state: '启用',
    },
    {
        id: 'MBGL063',
        xm:'用户注册量',
        jg:'find',
        dw:'tiaozhuan.html',
        pd:'2019年7月07日',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '大数据信息',
            dataIndex: 'xm',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '采集标识',
            dataIndex: 'jg',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '采集来源',
            dataIndex: 'dw',
        },
        {
            title: '采集日期',
            dataIndex: 'pd',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
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
                title="大数据采集来源管理"
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
