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
        tongdao:'通道1',
        touguang:'0.23',
        duizhao:'0.56',
        shijian:'13分钟',
        state: '启用',
    },
    {
        id: 'D0002',
        tongdao:'通道2',
        touguang:'0.23',
        duizhao:'0.56',
        shijian:'4分钟',
        state: '启用',
    },
    {
        id: 'D0003',
        tongdao:'通道3',
        touguang:'0.23',
        duizhao:'0.56',
        shijian:'3分钟',
        state: '启用',
    },
    {
        id: 'D0004',
        tongdao:'通道4',
        touguang:'0.23',
        duizhao:'0.56',
        shijian:'5分钟',
        state: '启用',
    },
    {
        id: 'D0005',
        tongdao:'通道5',
        touguang:'0.23',
        duizhao:'0.56',
        shijian:'4分钟',
        state: '启用',
    },
    {
        id: 'D0006',
        tongdao:'通道6',
        touguang:'0.23',
        duizhao:'0.56',
        shijian:'7分钟',
        state: '启用',
    },
    {
        id: 'D0007',
        tongdao:'通道7',
        touguang:'0.23',
        duizhao:'0.56',
        shijian:'3分钟',
        state: '启用',
    },
    {
        id: 'D0008',
        tongdao:'通道8',
        touguang:'0.23',
        duizhao:'0.56',
        shijian:'10分钟',
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
            title: '试验编号',
            dataIndex: 'id',
        },
        {
            title: '试验通道',
            dataIndex: 'tongdao',
        },
        {
            title: '透光值',
            dataIndex: 'touguang',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '对照值',
            dataIndex: 'duizhao',
        },
        {
            title: '检测时间',
            dataIndex: 'shijian',
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
                title="检测试验管理"
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
