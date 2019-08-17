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
        touguang:'食品安全社会共治',
        xq:'市市场监管局开展“你点我检”专项...',
        duizhao:'允许',
        zt:'已投票',
    },
    {
        id: 'ZWTP1202',
        tongdao:'陈涛',
        touguang:'特色农产品保障再加码',
        xq:'对纳入试点范围的地方优势特色...',
        duizhao:'不允许',
        zt:'未投票',
    },
    {
        id: 'ZWTP1203',
        tongdao:'孟明',
        touguang:'国家税务总局推出十条便民办税缴费新举措',
        xq:'这十条新举措包括推行税收优惠清单式...',
        duizhao:'不允许',
        zt:'已投票',
    },
    {
        id: 'ZWTP1204',
        tongdao:'赵燕',
        touguang:'治理违规涉企收费将建立长效机制',
        xq:'推动违规涉企收费治理规范化、法治化...',
        duizhao:'允许',
        zt:'已投票',
    },
    {
        id: 'ZWTP1205',
        tongdao:'钱前',
        touguang:'明年起ETC单卡用户不再享受ETC通行费优惠',
        xq:'对ETC车辆给予不小于5%的车辆通行费...',
        duizhao:'不允许',
        zt:'未投票',
    },
    {
        id: 'ZWTP1206',
        tongdao:'胡艳',
        touguang:'国办印发指导意见促进平台经济规范健康发展',
        xq:'《意见》提出了五个方面政策措施。...',
        duizhao:'允许',
        zt:'已投票',
    },
    {
        id: 'ZWTP1207',
        tongdao:'罗蒙',
        touguang:'传统节庆',
        xq:'在清明、端午、中秋等传统节庆日，您... ',
        duizhao:'不允许',
        zt:'已投票',
    },
    {
        id: 'ZWTP1208',
        tongdao:'姜丝',
        touguang:'社区活动',
        xq:'本市各社区开展了形式多样的科教、文体... ',
        duizhao:'不允许',
        zt:'已投票',
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
            title: '发布人',
            dataIndex: 'tongdao',
        },
        {
            title: '投票标题',
            dataIndex: 'touguang',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '详情',
            dataIndex: 'xq',
        },
        {
            title: '匿名投票结果',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '状态',
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
                title="政务投票管理"
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
