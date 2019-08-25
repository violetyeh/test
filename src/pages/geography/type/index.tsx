import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag } from "antd";
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
        fenlei: '1063k/秒',
        yaosu: '是',
        state: '2019年8月17日17:42:19',
        pinlv: 'DF4G',
        sj:'3500',
    },
    {
        id: 'ZDID8201',
        fenlei: '1023k/秒 ',
        yaosu: '是',
        state: '2019年8月18日09:02:13',
        pinlv: '5SDF',
        sj:'2500',
    },
    {
        id: 'ZDID3921',
        fenlei: '1241k/秒',
        yaosu: '否',
        state: '2019年8月09日10:11:06',
        pinlv: 'SX2C',
        sj:'1500',
    },
    {
        id: 'ZDID0029',
        fenlei: '1563k/秒',
        yaosu: '是',
        state: '2019年8月10日11:34:02',
        pinlv: 'DS5F',
        sj:'1600',
    },
    {
        id: 'ZDID2191',
        fenlei: '1241k/秒',
        yaosu: '否',
        state: '2019年8月11日14:41:58',
        pinlv: 'VC85',
        sj:'2800',
    },
    {
        id: 'ZDID3321',
        fenlei: '1241k/秒',
        yaosu: '是',
        state: '2019年8月12日20:04:53',
        pinlv: '5D2F',
        sj:'1600',
    },
    {
        id: 'ZDID2136',
        fenlei: '1563k/秒',
        yaosu: '否',
        state: '2019年8月13日21:14:48',
        pinlv: '202S',
        sj:'8500',
    },
    {
        id: 'ZDID3354',
        fenlei: '1563k/秒',
        yaosu: '是',
        state: '2019年8月25日18:41:37',
        pinlv: '2X4F',
        sj:'6050',
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
            title: '终端ID',
            dataIndex: 'id',
        },
       
        {
            title: '终端端口',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '是否在线',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '容量(GB)',
            dataIndex: 'sj',
        }, 
        {
            title: '终端传输速度（K/秒）',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },

        {
            title: '终端状态检测时间',
            dataIndex: 'state',
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
                title="存储终端信息"
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
