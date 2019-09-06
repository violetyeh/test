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
        id: 'SPBC0035',
        fl:'成都',
        mc:'暂停售票',
        ma:'30',
        bf:'2019年9月06日09:14:25',
        sf:'10',
        nl:'江津',
        dbz:'8',
        state: '启用',
    },
    {
        id: 'SPBC0064',
        fl:'铜川',
        mc:'暂停售票',
        ma:'35',
        bf:'2019年9月07日19:14:27',
        sf:'15',
        nl:'上海',
        dbz:'8',
        state: '启用',
    },
    {
        id: 'SPBC0078',
        fl:'北京',
        mc:'暂停售票',
        ma:'21',
        bf:'2019年9月08日15:13:47',
        sf:'10',
        nl:'包头',
        dbz:'5',
        state: '启用',
    },
    {
        id: 'SPBC0021',
        fl:'璧山',
        mc:'暂停售票',
        ma:'35',
        bf:'2019年9月19日18:53:25',
        sf:'6',
        nl:'青杠',
        dbz:'5',
        state: '启用',
    },
    {
        id: 'SPBC0035',
        fl:'永川',
        mc:'售票中',
        ma:'30',
        bf:'2019年9月20日12:03:25',
        sf:'7',
        nl:'璧山',
        dbz:'3',
        state: '启用',
    },
    {
        id: 'SPBC0038',
        fl:'永川',
        mc:'暂停售票',
        ma:'35',
        bf:'2019年9月22日08:56:45',
        sf:'1',
        nl:'合川',
        dbz:'5',
        state: '启用',
    },
    {
        id: 'SPBC0021',
        fl:'合川',
        mc:'售票中',
        ma:'30',
        bf:'2019年9月23日16:23:11',
        sf:'4',
        nl:'璧山',
        dbz:'8',
        state: '启用',
    },
    {
        id: 'SPBC0037',
        fl:'合川',
        mc:'暂停售票',
        ma:'36',
        bf:'2019年9月01日20:53:25',
        sf:'15',
        nl:'江津',
        dbz:'5',
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
            title: '班次编号',
            dataIndex: 'id',
        },
        {
            title: '出发地',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '目的地',
            dataIndex: 'nl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '座位数',
            dataIndex: 'ma',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '发车时间',
            dataIndex: 'bf',
           
        },
        {
            title: '余票',
            dataIndex: 'sf',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
       
        {
            title: '票价',
            dataIndex: 'dbz',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '状态',
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
                title="售票管理"
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
