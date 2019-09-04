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
        fenlei: '都市龙泉驿区',
        yaosu: '2.64',
        state: '2019年8月17日17:42:19',
        state1:'2019年8月17日19:43:47',
        pinlv: '云A2DF4G',
    },
    {
        id: 'ZDID8201',
        fenlei: '云南省大理白族自治州漾濞彝族自治县上平坡线 ',
        yaosu: '1.59',
        state: '2019年8月18日09:02:13',
        state1:'2019年8月18日10:11:24',
        pinlv: '黑H35SDF',
    },
    {
        id: 'ZDID3921',
        fenlei: '成都市青白江区青东路',
        yaosu: '2.15',
        state: '2019年8月09日10:11:06',
        state1:'2019年8月09日12:00:00',
        pinlv: '湘B1SX2C',
    },
    {
        id: 'ZDID0029',
        fenlei: '甘肃省酒泉市肃州区果园镇滨河北路',
        yaosu: '2.14',
        state: '2019年8月10日11:34:02',
        state1:'2019年8月10日13:20:14',
        pinlv: '鄂D1DS5F',
    },
    {
        id: 'ZDID2191',
        fenlei: '大理白族自治州漾濞彝族自治县320国道南50米',
        yaosu: '2.21',
        state: '2019年8月11日14:41:58',
        state1:'2019年8月11日16:30:05',
        pinlv: '冀B3VC85',
    },
    {
        id: 'ZDID3321',
        fenlei: '云南省大理白族自治州大理市平坡镇杭瑞高速公路',
        yaosu: '1.36',
        state: '2019年8月12日20:04:53',
        state1:'2019年8月12日21:16:24',
        pinlv: '沪C25D2F',
    },
    {
        id: 'ZDID2136',
        fenlei: '张掖市肃南裕固族自治县二一五省道',
        yaosu: '0.3',
        state: '2019年8月13日21:14:48',
        state1:'2019年8月13日21:34:54',
        pinlv: '冀A1202S',
    },
    {
        id: 'ZDID3354',
        fenlei: '云南省大理白族自治州大理市平坡镇杭瑞高速公路',
        yaosu: '0.68',
        state: '2019年8月25日18:41:37',
        state1:'2019年8月25日19:08:47',
        pinlv: '渝A12X4F',
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
            render: (text) => <Tag color="BLUE">{text}</Tag>,
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
            title: '实时定位',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >定位</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '地址',
            dataIndex: 'fenlei',
            render: (text) => <Tag color="#f50">{text}</Tag>,
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
                title="车辆定位信息"
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
