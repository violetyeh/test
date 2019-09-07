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
        id: 'JCBH35',
        fl:'外观',
        mc:'合格',
        nl:'车身外观、车内环境、视镜、刮水器、发动机、水箱',
        state: '启用',
    },
    {
        id: 'JCBH64',
        fl:'制动系统',
        mc:'合格',
        nl:'气压表工作状况、制动管路密封性、制动系统自检、空气压缩机传动带',
        state: '启用',
    },
    {
        id: 'JCBH78',
        fl:'转向系统',
        mc:'合格',
        nl:'转向机构及连接',
        state: '启用',
    },
    {
        id: 'JCBH21',
        fl:'传动系统',
        mc:'合格',
        nl:'传动机构及连接、自动变速器、液力缓速器密封性',
        state: '启用',
    },
    {
        id: 'JCBH35',
        fl:'照明、信号指示灯',
        mc:'不合格',
        nl:'前照灯、信号指示灯',
        state: '启用',
    },
    {
        id: 'JCBH38',
        fl:'轮胎',
        mc:'合格',
        nl:'轮胎、轮胎花纹深度、轮胎规格和花纹、轮胎气压、轮胎螺栓、螺母',
        state: '启用',
    },
    {
        id: 'JCBH21',
        fl:'悬架系统',
        mc:'不合格',
        nl:'弹性元件、U形螺栓螺母',
        state: '启用',
    },
    {
        id: 'JCBH37',
        fl:'安全设施',
        mc:'合格',
        nl:'车门应急开关、安全顶窗、安全锤、灭火器',
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
            title: '检查项目',
            dataIndex: 'fl',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '检查要求',
            dataIndex: 'nl',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
       
        {
            title: '检查结果',
            dataIndex: 'mc',
            render: (text) => <Tag color="RED">{text}</Tag>,
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
                title="营运客车例检检查"
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
