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
        id: 'ZD-0021',
        fl:'CJ564-视觉程序1',
        mc:'TCS',
        ma:'192.168.1.107',
        nl:'GPRS/CDMA',
        cs:'COM4,1200-e-8-1',
        cd:'16',
    },
    {
        id: 'ZD-0035',
        fl:'CJ564-视觉程序2',
        mc:'TCS',
        ma:'192.168.1.105',
        nl:'本机串口',
        cs:'COM4,1201-e-5-1',
        cd:'16',
    },
    {
        id: 'ZD-0038',
        fl:'CJ564-视觉程序3',
        mc:'PCS',
        ma:'192.168.1.133',
        nl:'本机串口',
        cs:'COM5,1358-e-8-1',
        cd:'18',
    },
    {
        id: 'ZD-0021',
        fl:'CJ564-视觉程序4',
        mc:'TCS',
        ma:'192.168.1.102',
        nl:'本机串口',
        cs:'COM4,1500-e-8-6',
        cd:'8',
    },
    {
        id: 'ZD-0037',
        fl:'CJ564-视觉程序5',
        mc:'PCS',
        ma:'192.168.1.142',
        nl:'GPRS/CDMA',
        cs:'COM1,1450-f-5-1',
        cd:'16',
    },
    {
        id: 'ZD-0035',
        fl:'CJ564-视觉程序6',
        mc:'PCS',
        ma:'192.168.1.635',
        nl:'GPRS/CDMA',
        cs:'COM4,1200-m-7-1',
        cd:'16',
    },
    {
        id: 'ZD-0064',
        fl:'CJ564-视觉程序7',
        mc:'TCS',
        ma:'192.168.1.733',
        nl:'GPRS/CDMA',
        cs:'COM4,1960-e-8-1',
        cd:'18',
    },
    {
        id: 'ZD-0078',
        fl:'CJ564-视觉程序8',
        mc:'PCS',
        ma:'192.168.1.255',
        nl:'本机串口',
        cs:'COM4,1240-x-8-1',
        cd:'12',
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
            title: '视觉系统',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '固定视觉',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '终端地址',
            dataIndex: 'ma',
        },
       
        {
            title: '通讯方式',
            dataIndex: 'nl',
        },
        {
            title: '通讯参数',
            dataIndex: 'cs',
        },
        {
            title: 'Tpv有效',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >有效</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '密码长度',
            dataIndex: 'cd',
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
                title="设置视觉参数"
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
