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
        id: 'GCXM03',
        tongdao:'汇景新城一期',
        touguang:'未审核',
        duizhao:'王悦',
        shijian:'停止监理',
        state: '启用',
    },
    {
        id: 'GCXM02',
        tongdao:'汇景新城二期',
        touguang:'已审核',
        duizhao:'秦岚',
        shijian:'停止监理',
        state: '启用',
    },
    {
        id: 'GCXM01',
        tongdao:'汇景新城三期',
        touguang:'未审核',
        duizhao:'宋明',
        shijian:'正在监理中',
        state: '启用',
    },
    {
        id: 'GCXM07',
        tongdao:'山水田园一期',
        touguang:'未审核',
        duizhao:'胡落',
        shijian:'停止监理',
        state: '启用',
    },
    {
        id: 'GCXM00',
        tongdao:'山水田园二期',
        touguang:'已审核',
        duizhao:'王三',
        shijian:'正在监理中',
        state: '启用',
    },
    {
        id: 'GCXM06',
        tongdao:'翡翠绿洲一期',
        touguang:'未审核',
        duizhao:'刘艺',
        shijian:'正在监理中',
        state: '启用',
    },
    {
        id: 'GCXM05',
        tongdao:'翡翠绿洲二期',
        touguang:'已审核',
        duizhao:'杨子子',
        shijian:'停止监理',
        state: '启用',
    },
    {
        id: 'GCXM004',
        tongdao:'翡翠绿洲三期',
        touguang:'未审核',
        duizhao:'赵思明',
        shijian:'正在监理中',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '工程名称',
            dataIndex: 'tongdao',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '项目计划状态',
            dataIndex: 'touguang',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '监理负责人',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '监理状态',
            dataIndex: 'shijian',
            render: (text) => <Tag color="#ff5555">{text}</Tag>,
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
                title="工程项目管理"
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
