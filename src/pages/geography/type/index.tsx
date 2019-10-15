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
        id: 'DTGZ0029',
        fenlei: '成都运输中转服务站',
        yaosu: '2.14',
        state: '2019年9月10日11:34:02',
        state1:'2019年9月10日13:20:14',
        pinlv: '鄂D1DS5F',
    },
    {
        id: 'DTGZ2191',
        fenlei: '大理运输中转服务站',
        yaosu: '2.21',
        state: '2019年9月11日14:41:58',
        state1:'2019年9月11日16:30:05',
        pinlv: '冀B3VC85',
    },
    {
        id: 'DTGZ3321',
        fenlei: '云南运输中转服务站',
        yaosu: '1.36',
        state: '2019年9月12日20:04:53',
        state1:'2019年9月12日21:16:24',
        pinlv: '沪C25D2F',
    },
    {
        id: 'DTGZ2136',
        fenlei: '张掖市运输中转服务站',
        yaosu: '0.3',
        state: '2019年9月13日21:14:48',
        state1:'2019年9月13日21:34:54',
        pinlv: '冀A1202S',
    },
    {
        id: 'DTGZ3354',
        fenlei: '云南省运输中转服务站',
        yaosu: '0.68',
        state: '2019年9月25日18:41:37',
        state1:'2019年9月25日19:08:47',
        pinlv: '渝A12X4F',
    },
    {
        id: 'DTGZ1292',
        fenlei: '成都市运输中转服务站',
        yaosu: '2.64',
        state: '2019年9月17日17:42:19',
        state1:'2019年9月17日19:43:47',
        pinlv: '云A2DF4G',
    },
    {
        id: 'DTGZ8201',
        fenlei: '重庆运输中转服务站 ',
        yaosu: '1.59',
        state: '2019年9月18日09:02:13',
        state1:'2019年9月18日10:11:24',
        pinlv: '黑H35SDF',
    },
    {
        id: 'DTGZ3921',
        fenlei: '成都市运输中转服务站',
        yaosu: '2.15',
        state: '2019年9月09日10:11:06',
        state1:'2019年9月09日12:00:00',
        pinlv: '湘B1SX2C',
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
            title: 'ID',
            dataIndex: 'id',
        },
       
        {
            title: '车牌号',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '地址',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '到达时间',
            dataIndex: 'state',
        },
        {
            title: '离开时间',
            dataIndex: 'state1',
        },
        {
            title: '停留时间（h）',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
        {
            title: '实时跟踪',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >跟踪定位</Checkbox>
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
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="货物跟踪信息"
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
