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
        id: 'ZDID1292',
        fenlei: '左弯或向左合流',
        yaosu: '非机动车禁驶线',
        state: '出入口线',
        pinlv: 'K0+0.00',
    },
    {
        id: 'ZDID8201',
        fenlei: '左右转弯箭头 ',
        yaosu: '对向车道分界线',
        state: '非机动车位线',
        pinlv: 'K1+110.00',
    },
    {
        id: 'ZDID3921',
        fenlei: '前方掉头箭头',
        yaosu: '左弯待转区线',
        state: '出租车位线',
        pinlv: 'K0+0.00',
    },
    {
        id: 'ZDID0029',
        fenlei: '直行右转箭头',
        yaosu: '禁止长时间停车线',
        state: '残疾人专用车位线',
        pinlv: 'K0+0.00',
    },
    {
        id: 'ZDID2191',
        fenlei: '前方右转箭头',
        yaosu: '减速让行线',
        state: '倾斜式车位线',
        pinlv: 'K0+0.00',
    },
    {
        id: 'ZDID3321',
        fenlei: '前方左转箭头',
        yaosu: '禁止停车线',
        state: '平行/垂直式车位线',
        pinlv: 'K20+342.00',
    },
    {
        id: 'ZDID2136',
        fenlei: '直行左转箭头',
        yaosu: '停止线',
        state: '车距确认',
        pinlv: 'K40+236.00',
    },
    {
        id: 'ZDID3354',
        fenlei: '直行箭头',
        yaosu: '路口导向线',
        state: '斑马线绘制',
        pinlv: 'K0+0.00',
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
            title: '状态',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >设计完成</Checkbox>
                </Fragment>
            ),
        },
        {
            title: 'ID',
            dataIndex: 'id',
        },
       
        {
            title: '起点桩号',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '标线信息',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
       
        {
            title: '速绘箭头',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },

        {
            title: '道路标线',
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
                title="平面设计"
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
