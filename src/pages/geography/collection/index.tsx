import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Checkbox } from "antd";
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
        id: 'GC-GL-0038',
        fl:'给水规划',
        mc:'预测总用水量、提出水质、水压的要求 ',
        ma:'建筑容量规划',
        nl:'刘文',
    },
    {
        id: 'GC-GL-0021',
        fl:'排水规划',
        mc:'预测雨、污水排放量',
        ma:'土地使用规划',
        nl:'赵媛',
    },
    {
        id: 'GC-GL-0037',
        fl:'供电规划',
        mc:'定供电设施（如变电站、开闭所）的位置和容量',
        ma:'建筑容量规划',
        nl:'刘冰',
    },
    {
        id: 'GC-GL-0035',
        fl:'电信规划',
        mc:'确定电信局、所的位置以及容量',
        ma:'建筑建造',
        nl:'汪峰',
    },
    {
        id: 'GC-GL-0064',
        fl:'燃气规划',
        mc:'确定储配气站位置、容量以及用地保护范围',
        ma:'土地使用规划',
        nl:'陈云',
    },
    {
        id: 'GC-GL-0078',
        fl:'供热规划',
        mc:'选择热源引入方向 ',
        ma:'建筑建造',
        nl:'王安',
    },
    {
        id: 'GC-GL-0021',
        fl:'给水规划',
        mc:'确定加压泵站、调节水池等给水设施的位置和规模',
        ma:'建筑容量规划',
        nl:'张文芳',
    },
    {
        id: 'GC-GL-0035',
        fl:'供电规划',
        mc:'确线路敷设方式及高压走廊保护范围',
        ma:'土地使用规划',
        nl:'王芳',
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
            title: '规划类别',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '规划内容',
            dataIndex: 'mc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '规划通则',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '负责人员',
            dataIndex: 'nl',
        },
        {
            title: '状态',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >规划中</Checkbox>
                </Fragment>
            ),
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
                title="规划管理"
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
