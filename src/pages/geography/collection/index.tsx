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
        id: 'AQGZE-00035',
        fl:'任意',
        mc:'192.168.1.26',
        ma:'192.168.1.08',
        nl:'PF1',
    },
    {
        id: 'AQGZE-00064',
        fl:'病毒检测',
        mc:'192.168.1.17',
        ma:'192.168.1.07',
        nl:'PF2',
    },
    {
        id: 'AQGZE-00078',
        fl:'病毒清除',
        mc:'192.168.1.14',
        ma:'192.168.1.06',
        nl:'PF3',
    },
    {
        id: 'AQGZE-00021',
        fl:'安全检测',
        mc:'192.168.1.28',
        ma:'192.168.1.05',
        nl:'PF4',
    },
    {
        id: 'AQGZE-00035',
        fl:'任意',
        mc:'192.168.0.18',
        ma:'192.168.1.04',
        nl:'PF5',
    },
    {
        id: 'AQGZE-00038',
        fl:'安全检测',
        mc:'192.168.1.44',
        ma:'192.168.1.03',
        nl:'PF6',
    },
    {
        id: 'AQGZE-00021',
        fl:'安全过滤',
        mc:'192.168.1.110',
        ma:'192.168.1.02',
        nl:'PF7',
    },
    {
        id: 'AQGZE-00037',
        fl:'任意',
        mc:'192.168.1.53',
        ma:'192.168.1.01',
        nl:'PF8',
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
            title: ' 规则名',
            dataIndex: 'nl',
        },
        {
            title: '源地址',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
        {
            title: '目的地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '服务',
            dataIndex: 'fl',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },

        {
            title: '类型',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="认证" unCheckedChildren="包过滤" />,
          },
        {
            title: '生效',
            dataIndex: 'dbz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >生效</Checkbox>
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
                title="防火墙安全规则"
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
