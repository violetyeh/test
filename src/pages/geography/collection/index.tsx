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
        id: 'ZWTP1201',
        tongdao:'张媛',
        touguang:'产品销售咨询',
        xq:'安阳灯泡厂',
        duizhao:'审核',
        zt:'老客户',
    },
    {
        id: 'ZWTP1202',
        tongdao:'陈涛',
        touguang:'产品信息介绍',
        xq:'华龙方便面厂',
        duizhao:'未审核',
        zt:'新客户',
    },
    {
        id: 'ZWTP1203',
        tongdao:'孟明',
        touguang:'产品销售录入',
        xq:'华太电池厂',
        duizhao:'未审核',
        zt:'老客户',
    },
    {
        id: 'ZWTP1204',
        tongdao:'赵燕',
        touguang:'外贸投资',
        xq:'好滋味食品厂',
        duizhao:'审核',
        zt:'老客户',
    },
    {
        id: 'ZWTP1205',
        tongdao:'钱前',
        touguang:'纠纷协调',
        xq:'华龙方便面厂',
        duizhao:'未审核',
        zt:'新客户',
    },
    {
        id: 'ZWTP1206',
        tongdao:'胡艳',
        touguang:'试点业务在线办理',
        xq:'华太电池厂',
        duizhao:'审核',
        zt:'老客户',
    },
    {
        id: 'ZWTP1207',
        tongdao:'罗蒙',
        touguang:'产品销售录入',
        xq:'安阳灯泡厂 ',
        duizhao:'未审核',
        zt:'老客户',
    },
    {
        id: 'ZWTP1208',
        tongdao:'姜丝',
        touguang:'试点业务在线办理',
        xq:'葫芦岛食品厂 ',
        duizhao:'未审核',
        zt:'老客户',
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
            title: '业务员',
            dataIndex: 'tongdao',
        },
        {
            title: '业务项目',
            dataIndex: 'touguang',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '客户名称',
            dataIndex: 'xq',
        },
        {
            title: '业务审核',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '客户类型',
            dataIndex: 'zt',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
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
                title="业务管理"
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
