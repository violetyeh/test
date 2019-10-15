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
        id: 'JKSP-0211',
        jishu: '100',
        fenceng: '0.2dB',
        leixing: '30dB~120dB',
        name:'20Hz~12kHz',
        state: '启用',
        lg:'市政工程-噪音检测区域01',
    },
    {
        id: 'JKSP-0212',
        jishu: '85',
        fenceng: '0.1dB',
        leixing: '20dB~120dB',
        name:'20Hz~12.5kHz',
        state: '启用',
        lg:'市政工程-噪音检测区域02',
    },
    {
        id: 'JKSP-0213',
        jishu: '100',
        fenceng: '0.1dB',
        leixing: '30dB~120dB',
        name:'20Hz~12.5kHz',
        state: '启用',
        lg:'市政工程-噪音检测区域03',
    },
    {
        id: 'JKSP-0214',
        jishu: '100',
        fenceng: '0.2dB',
        leixing: '30dB~120dB',
        name:'20Hz~13kHz',
        state: '启用',
        lg:'市政工程-噪音检测区域04',
    },
    {
        id: 'JKSP-0215',
        jishu: '100',
        fenceng: '0.1dB',
        leixing: '20dB~120dB',
        name:'20Hz~12.5kHz',
        state: '启用',
        lg:'市政工程-噪音检测区域05',
    },
    {
        id: 'JKSP-0216',
        jishu: '98',
        fenceng: '0.1dB',
        leixing: '30dB~125dB',
        name:'20Hz~12kHz',
        state: '启用',
        lg:'市政工程-噪音检测区域06',
    },
    {
        id: 'JKSP-0217',
        jishu: '88',
        fenceng: '0.2dB',
        leixing: '35dB~120dB',
        name:'25Hz~12.5kHz',
        state: '启用',
        lg:'市政工程-噪音检测区域07',
    },
    {
        id: 'JKSP-0218',
        jishu: '24',
        fenceng: '0.1dB',
        leixing: '30dB~120dB',
        name:'20Hz~12.5kHz',
        state: '启用',
        lg:'市政工程-噪音检测区域08',
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
            title: '检测地点',
            dataIndex: 'lg',
            render: (text) => <Tag color="BLUE">{text}</Tag>,

        },
        
        {
            title: '分辨率',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '测量范围',
            dataIndex: 'leixing',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '噪音频率范围',
            dataIndex: 'name',
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
                title="噪音检测管理"
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
