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
        id: 'SYBH1021',
        fl:'蔬菜类及制品',
        mc:'白菜',
        ma:'baicai',
        bf:'88.00',
        sf:'73.80',
        nl:'156.00',
        dbz:'11.00',
        state: '启用',
    },
    {
        id: 'SYBH1035',
        fl:'蛋类及制品',
        mc:'鸡蛋（红皮）',
        ma:'jidan',
        bf:'78.00',
        sf:'76.80',
        nl:'158.00',
        dbz:'21.10',
        state: '启用',
    },
    {
        id: 'SYBH1038',
        fl:'速食食品',
        mc:'黄桃罐头',
        ma:'htgt',
        bf:'90.00',
        sf:'176.23',
        nl:'58.00',
        dbz:'11.10',
        state: '启用',
    },
    {
        id: 'SYBH1021',
        fl:'蔬菜类及制品',
        mc:'萝卜',
        ma:'luobu',
        bf:'88.00',
        sf:'73.80',
        nl:'156.00',
        dbz:'35.00',
        state: '启用',
    },
    {
        id: 'SYBH1037',
        fl:'蛋类及制品',
        mc:'鸡蛋（绿皮）',
        ma:'jidan',
        bf:'78.00',
        sf:'76.80',
        nl:'158.00',
        dbz:'11.10',
        state: '启用',
    },
    {
        id: 'SYBH1035',
        fl:'速食食品',
        mc:'黄桃罐头',
        ma:'htgt',
        bf:'90.00',
        sf:'176.23',
        nl:'58.00',
        dbz:'11.10',
        state: '启用',
    },
    {
        id: 'SYBH1064',
        fl:'蔬菜类及制品',
        mc:'白菜',
        ma:'baicai',
        bf:'88.00',
        sf:'73.80',
        nl:'156.00',
        dbz:'11.00',
        state: '启用',
    },
    {
        id: 'SYBH1078',
        fl:'蛋类及制品',
        mc:'鸡蛋黄粉',
        ma:'jidan',
        bf:'98.00',
        sf:'76.80',
        nl:'158.00',
        dbz:'11.10',
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
            title: '食物分类',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '食物名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '食物助记码',
            dataIndex: 'ma',
        },
        {
            title: '可食部分',
            dataIndex: 'bf',
           
        },
        {
            title: '水分',
            dataIndex: 'sf',
        },
        {
            title: '能量',
            dataIndex: 'nl',
        },
        {
            title: '蛋白质',
            dataIndex: 'dbz',
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
                title="食品成分管理"
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
