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
        id: 'ST021',
        fl:'交互绘制管道',
        mc:'圆形',
        ma:'已有管线',
        nl:'651',
    },
    {
        id: 'ST035',
        fl:'自动绘制管道',
        mc:'矩形',
        ma:'插入符号',
        nl:'771',
    },
    {
        id: 'ST038',
        fl:'交互绘制管道',
        mc:'矩形',
        ma:'节点标注',
        nl:'741',
    },
    {
        id: 'ST021',
        fl:'定义管道',
        mc:'圆形',
        ma:'坐标桩号标注',
        nl:'574',
    },
    {
        id: 'ST037',
        fl:'自动绘制管道',
        mc:'矩形',
        ma:'断面符号标注',
        nl:'568s',
    },
    {
        id: 'ST035',
        fl:'定义管道',
        mc:'矩形',
        ma:'供回水标注',
        nl:'704',
    },
    {
        id: 'ST064',
        fl:'自动绘制管道',
        mc:'圆形',
        ma:'管道折角',
        nl:'623',
    },
    {
        id: 'ST078',
        fl:'交互绘制管道',
        mc:'圆形',
        ma:'交叉管线统计',
        nl:'545',
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
            title: '管道绘制方式',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '管道形状',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '获取工序',
            dataIndex: 'ma',
        },
       
        {
            title: '管道里程（m）',
            dataIndex: 'nl',
        },
        {
            title: '图纸识别',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >识别</Checkbox>
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
                title="地形图识别处理"
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
