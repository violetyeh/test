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
        id: 'SJ-CC-01',
        jishu: '15',
        fenceng: '2000.5666MB',
        leixing: '1200.3210MB',
        name:'30',
        state: '启用',
        lg:'2.50GHz',
    },
    {
        id: 'SJ-CC-02',
        jishu: '27',
        fenceng: '2014.2145MB',
        leixing: '1436.3589MB',
        name:'15',
        state: '启用',
        lg:'3.00GHz',
    },
    {
        id: 'SJ-CC-03',
        jishu: '27',
        fenceng: '1064.2347MB',
        leixing: '1078.3654MB',
        name:'16',
        state: '启用',
        lg:'0.50GHz',
    },
    {
        id: 'SJ-CC-04',
        jishu: '15',
        fenceng: '6302.2142MB',
        leixing: '1936.2415MB',
        name:'15',
        state: '启用',
        lg:'2.00GHz',
    },
    {
        id: 'SJ-CC-05',
        jishu: '25',
        fenceng: '2312.2456MB',
        leixing: '1232.6543MB',
        name:'10',
        state: '启用',
        lg:'1.50GHz',
    },
    {
        id: 'SJ-CC-06',
        jishu: '13',
        fenceng: '2587.4235MB',
        leixing: '3002.2542MB',
        name:'16',
        state: '启用',
        lg:'3.50GHz',
    },
    {
        id: 'SJ-CC-07',
        jishu: '17',
        fenceng: '1102.3625MB',
        leixing: '1242.1258MB',
        name:'14',
        state: '启用',
        lg:'2.00GHz',
    },
    {
        id: 'SJ-CC-08',
        jishu: '24',
        fenceng: '1258.6574MB',
        leixing: '1018.3247MB',
        name:'15',
        state: '启用',
        lg:'2.50GHz',
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
            title: '处理器主频',
            dataIndex: 'lg',
            render: (text) => <Tag color="BLUE">{text}</Tag>,

        },
        {
            title: '处理器占用率',
            dataIndex: 'jishu',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '物理缓存',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '空闲缓存',
            dataIndex: 'leixing',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '缓存占用率',
            dataIndex: 'name',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="激活" unCheckedChildren="禁用" />,
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
                title="数据存储接口设置"
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
