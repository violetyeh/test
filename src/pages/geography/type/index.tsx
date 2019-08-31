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
        fenlei: '车辆逆行',
        yaosu: '是',
        state: '2019年8月17日17:42:19',
        pinlv: 'DF4G',
    },
    {
        id: 'ZDID8201',
        fenlei: '道路塌陷 ',
        yaosu: '是',
        state: '2019年8月18日09:02:13',
        pinlv: '5SDF',
    },
    {
        id: 'ZDID3921',
        fenlei: '非法变道',
        yaosu: '否',
        state: '2019年8月09日10:11:06',
        pinlv: 'SX2C',
    },
    {
        id: 'ZDID0029',
        fenlei: '车辆逆行',
        yaosu: '是',
        state: '2019年8月10日11:34:02',
        pinlv: 'DS5F',
    },
    {
        id: 'ZDID2191',
        fenlei: '车辆拥堵',
        yaosu: '否',
        state: '2019年8月11日14:41:58',
        pinlv: 'VC85',
    },
    {
        id: 'ZDID3321',
        fenlei: '异物抛撒',
        yaosu: '是',
        state: '2019年8月12日20:04:53',
        pinlv: '5D2F',
    },
    {
        id: 'ZDID2136',
        fenlei: '异常停车',
        yaosu: '否',
        state: '2019年8月13日21:14:48',
        pinlv: '202S',
    },
    {
        id: 'ZDID3354',
        fenlei: '交通事故',
        yaosu: '是',
        state: '2019年8月25日18:41:37',
        pinlv: '2X4F',
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
            title: '高速公路',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '是否可通行',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
        {
            title: '实时报警提示',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >报警提示</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '道路状况',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },

        {
            title: '道路检测时间',
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
                title="事故状况信息"
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
