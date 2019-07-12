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
        id: 'CFFX0201',
        tongdao:'动物源性成分分析通道1',
        touguang:'0.23',
        duizhao:'全果',
        shijian:'13分钟',
        state: '启用',
    },
    {
        id: 'CFFX0202',
        tongdao:'动物源性成分分析通道2',
        touguang:'0.23',
        duizhao:'整粒',
        shijian:'4分钟',
        state: '启用',
    },
    {
        id: 'CFFX0203',
        tongdao:'动物源性成分分析通道3',
        touguang:'0.23',
        duizhao:'全果',
        shijian:'3分钟',
        state: '启用',
    },
    {
        id: 'CFFX0204',
        tongdao:'动物源性成分分析通道4',
        touguang:'0.23',
        duizhao:'全果',
        shijian:'5分钟',
        state: '启用',
    },
    {
        id: 'CFFX0205',
        tongdao:'动物源性成分分析通道5',
        touguang:'0.23',
        duizhao:'全果',
        shijian:'4分钟',
        state: '启用',
    },
    {
        id: 'CFFX0206',
        tongdao:'动物源性成分分析通道6',
        touguang:'0.23',
        duizhao:'全果',
        shijian:'7分钟',
        state: '启用',
    },
    {
        id: 'CFFX0207',
        tongdao:'动物源性成分分析通道7',
        touguang:'0.23',
        duizhao:'全果',
        shijian:'3分钟',
        state: '启用',
    },
    {
        id: 'CFFX0208',
        tongdao:'动物源性成分分析通道8',
        touguang:'0.23',
        duizhao:'全果',
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
            title: '分析编号',
            dataIndex: 'id',
        },
        {
            title: '分析通道',
            dataIndex: 'tongdao',
        },
        {
            title: '限量（mg/kg）',
            dataIndex: 'touguang',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '测定部位',
            dataIndex: 'duizhao',
        },
        {
            title: '分析时间',
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
                title="成分分析管理"
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
