import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag, Checkbox } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";

interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    data: any[];
    currentItem: any;
}

const mockData = [
    {
        id: 'YS-BH-1292',
        fenlei: '车辆逆行',
        yaosu: '正常驾驶',
        state: '安全',
        pinlv: '高速公路下道口',
    },
    {
        id: 'YS-BH-8201',
        fenlei: '道路塌陷 ',
        yaosu: '醉酒驾驶',
        state: '危险',
        pinlv: '高速公路',
    },
    {
        id: 'YS-BH-3921',
        fenlei: '非法变道',
        yaosu: '正常驾驶',
        state: '安全',
        pinlv: '高速公路汇流处',
    },
    {
        id: 'YS-BH-0029',
        fenlei: '车辆逆行',
        yaosu: '正常驾驶',
        state: '危险',
        pinlv: '高速公路',
    },
    {
        id: 'YS-BH-2191',
        fenlei: '车辆拥堵',
        yaosu: '疲劳驾驶',
        state: '安全',
        pinlv: '高速公路下道口',
    },
    {
        id: 'YS-BH-3321',
        fenlei: '异物抛撒',
        yaosu: '打电话驾驶',
        state: '危险',
        pinlv: '高速公路汇流处',
    },
    {
        id: 'YS-BH-2136',
        fenlei: '异常停车',
        yaosu: '正常驾驶',
        state: '安全',
        pinlv: '高速公路下道口',
    },
    {
        id: 'YS-BH-3354',
        fenlei: '交通事故',
        yaosu: '正常驾驶',
        state: '安全',
        pinlv: '高速公路',
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
            title: '安全预警',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >预警</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '编号',
            dataIndex: 'id',
        },
       
        {
            title: '道路类型',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '驾驶人状态监测',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        
        
        {
            title: '预警原因',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },

        {
            title: '盲区检测',
            dataIndex: 'state',
            render: (text) => <Tag color="BLACK">{text}</Tag>,
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
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="交通安全管理"
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
            </PageHeaderWrapper>
        );
    }
}

export default Type;
