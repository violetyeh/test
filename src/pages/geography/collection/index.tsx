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
        id: 'WSW21',
        mc:'细菌',
        tiji2:'13.23',
        zhiliang:'8',
        zb:30,
        state: '启用',
    },
    {
        id: 'WSW22',
        mc:'病毒',
        tiji2:'23.23',
        zhiliang:'5',
        zb:23,
        state: '启用',
    },
    {
        id: 'WSW23',
        mc:'真菌',
        tiji2:'13',
        zhiliang:'1.56',
        zb:3,
        state: '启用',
    },
    {
        id: 'WSW24',
        mc:'放线菌',
        tiji2:'52',
        zhiliang:'0.56',
        zb:5,
        state: '启用',
    },
    {
        id: 'WSW25',
        mc:'立克次氏体',
        tiji2:'13.23',
        zhiliang:'0.56',
        zb:1,
        state: '启用',
    },
    {
        id: 'WSW26',
        mc:'支原体',
        tiji2:'13.23',
        zhiliang:'0.56',
        zb:4,
        state: '启用',
    },
    {
        id: 'WSW27',
        mc:'衣原体',
        tiji2:'13.23',
        zhiliang:'0.56',
        zb:1,
        state: '启用',
    },
    {
        id: 'WSW28',
        mc:'螺旋体',
        tiji2:'13.23',
        zhiliang:'0.56',
        zb:3,
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
            title: '检测编号',
            dataIndex: 'id',
        },
        {
            title: '微生物名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '检测食物体积',
            dataIndex: 'tiji2',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '食物质量',
            dataIndex: 'zhiliang',
        },
        {
            title: '微生物占比',
            dataIndex: 'zb',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="微生物检测参数管理"
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
