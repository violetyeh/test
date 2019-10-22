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
        id: 'JTSN0211',
        jishu: '左转',
        fenceng: '太平',
        leixing: '拥挤路段',
        name:'80',
        state: '启用',
        lg:'交通枢纽路口 07',
    },
    {
        id: 'JTSN0212',
        jishu: '直行',
        fenceng: '五点梅',
        leixing: '事故多发路段',
        name:'92',
        state: '启用',
        lg:'交通枢纽路口 08',
    },
    {
        id: 'JTSN0213',
        jishu: '调头',
        fenceng: '新联',
        leixing: '绿波干线',
        name:'96',
        state: '启用',
        lg:'交通枢纽路口 01',
    },
    {
        id: 'JTSN0214',
        jishu: '人行B',
        fenceng: '厚街',
        leixing: '绿波干线',
        name:'95',
        state: '启用',
        lg:'交通枢纽路口 06',
    },
    {
        id: 'JTSN0215',
        jishu: '人行A',
        fenceng: '石鼓',
        leixing: '事故多发路段',
        name:'90',
        state: '启用',
        lg:'交通枢纽路口00',
    },
    {
        id: 'JTSN0216',
        jishu: '右转',
        fenceng: '道滘',
        leixing: '拥挤路段',
        name:'96',
        state: '启用',
        lg:'交通枢纽路口 03',
    },
    {
        id: 'JTSN0217',
        jishu: '左转',
        fenceng: '望牛墩',
        leixing: '绿波干线',
        name:'94',
        state: '启用',
        lg:'交通枢纽路口 05',
    },
    {
        id: 'JTSN0218',
        jishu: '直行',
        fenceng: '麻涌',
        leixing: '绿波干线',
        name:'95',
        state: '启用',
        lg:'交通枢纽路口 03',
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
            title: '路口',
            dataIndex: 'lg',
            render: (text) => <Tag color="RED">{text}</Tag>,

        },
        
        {
            title: '路口名称',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '线路类型',
            dataIndex: 'leixing',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '方案配置',
            dataIndex: 'jishu',
        },
        {
            title: '可视化范围',
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
                title="交通枢纽管理"
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
