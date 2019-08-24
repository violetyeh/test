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
        id: 'WL021',
        fl:'00E74S5S5A6Z',
        mc:'192.168.1.07',
        ma:'192.168.1.107',
        nl:'Cloud Times',
    },
    {
        id: 'WL035',
        fl:'00E6F4D5S8E7',
        mc:'192.168.1.05',
        ma:'192.168.1.105',
        nl:'Windows XP',
    },
    {
        id: 'WL038',
        fl:'00E1A2A3X5D5',
        mc:'192.168.1.33',
        ma:'192.168.1.133',
        nl:'Windows XP',
    },
    {
        id: 'WL021',
        fl:'00E8A9Z6X5A2',
        mc:'192.168.1.02',
        ma:'192.168.1.102',
        nl:'Windows XP',
    },
    {
        id: 'WL037',
        fl:'00E5Z4A6D5S5',
        mc:'192.168.1.42',
        ma:'192.168.1.142',
        nl:'Cloud Times',
    },
    {
        id: 'WL035',
        fl:'00EC5V6D4S5A',
        mc:'192.168.1.35',
        ma:'192.168.1.635',
        nl:'Cloud Times',
    },
    {
        id: 'WL064',
        fl:'56ZZX2DS1W5D',
        mc:'192.168.1.33',
        ma:'192.168.1.733',
        nl:'Cloud Times',
    },
    {
        id: 'WL078',
        fl:'00E0423GD52S',
        mc:'192.168.1.55',
        ma:'192.168.1.255',
        nl:'Windows XP',
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
            title: 'MAC地址',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '子网',
            dataIndex: 'ma',
        },
       
        {
            title: '操作系统',
            dataIndex: 'nl',
        },
        {
            title: '禁止',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >禁止</Checkbox>
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
                title="网络管理"
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
