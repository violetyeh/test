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
        id: 'XL-BH-04',
        xm:'成都',
        jg:'江津',
        dw:'300',
        pd:'2019年7月14日',
        state: '启用',
    },
    {
        id: 'XL-BH-05',
        xm:'攀枝花',
        jg:'成都',
        dw:'210',
        pd:'2019年6月14日',
        state: '启用',
    },
    {
        id: 'XL-BH-06',
        xm:'潼南',
        jg:'合川',
        dw:'150',
        pd:'2019年7月12日',
        state: '启用',
    },
    {
        id: 'XL-BH-07',
        xm:'江津',
        jg:'永川',
        dw:'80',
        pd:'2019年7月06日',
        state: '启用',
    },
    {
        id: 'XL-BH-08',
        xm:'湖南',
        jg:'浙江',
        dw:'260',
        pd:'2019年7月04日',
        state: '启用',
    },
    {
        id: 'XL-BH-01',
        xm:'南京',
        jg:'长沙',
        dw:'200',
        pd:'2019年7月09日',
        state: '启用',
    },
    {
        id: 'XL-BH-02',
        xm:'璧山',
        jg:'昆明',
        dw:'300',
        pd:'2019年7月10日',
        state: '启用',
    },
    {
        id: 'XL-BH-03',
        xm:'重庆',
        jg:'云南',
        dw:'120',
        pd:'2019年7月07日',
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
            title: '线路编号',
            dataIndex: 'id',
        },
        {
            title: '起始城市',
            dataIndex: 'xm',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '到达城市',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '车票价格（元）',
            dataIndex: 'dw',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '发车日期',
            dataIndex: 'pd',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
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
                title="线路信息管理"
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
