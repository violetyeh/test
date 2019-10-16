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
        id: 'D0001',
        fenceng: '房地产广告',
        name: '远离闹市喧嚣，尽享静谧人生 ',
        leixing: '2019年10月15日08:01:24',
        wd:'20℃',
        jishu: '循环滚动中',
        state: '启用',
    },
    {
        id: 'D0002',
        fenceng: '房地产广告',
        name: '回归自然，享受田园风光 ',
        leixing: '2019年10月16日27:41:29',
        wd:'16℃',
        jishu: '静止',
        state: '启用',
    },
    {
        id: 'D0003',
        fenceng: '房地产广告',
        name: '绝版水岸名邸，上风上水 ',
        leixing: '2019年10月16日19:11:33',
        wd:'29℃',
        jishu: '循环滚动中',
        state: '启用',
    },
    {
        id: 'D0004',
        fenceng: '电影宣传广告',
        name: '最值得期待的古装历史大片《花木兰》',
        leixing: '2019年10月16日13:15:38',
        wd:'25℃',
        jishu: '循环滚动中',
        state: '启用',
    },
    {
        id: 'D0005',
        fenceng: '电影宣传广告',
        name: '我们不相信宿命，但无法对发自心底的声音置若罔闻。——《似水年华》 ',
        leixing: '2019年10月16日17:17:43',
        wd:'33℃',
        jishu: '静止',
        state: '启用',
    },
    {
        id: 'D0006',
        fenceng: '电影宣传广告',
        name: '时空穿越浪漫奇情爆笑喜剧。《隋朝来客》',
        leixing: '2019年10月16日08:19:47',
        wd:'16℃',
        jishu: '循环滚动中',
        state: '启用',
    },
    {
        id: 'D0007',
        fenceng: '手机广告',
        name: '三星M628，彩屏滑盖，支持P3P4，照像摄像',
        leixing: '2019年10月16日05:11:17',
        wd:'30℃',
        jishu: '循环滚动中',
        state: '启用',
    },
    {
        id: 'D0008',
        fenceng: '手机广告',
        name: '诺基亚1661，超强信号，彩屏和弦铃音',
        leixing: '2019年10月16日10:11:02',
        wd:'28℃',
        jishu: '循环滚动中',
        state: '启用',
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
            title: '广告名称',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '广告内容',
            dataIndex: 'name',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '时间显示',
            dataIndex: 'leixing',
        },
        {
            title: '温度显示',
            dataIndex: 'wd',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '广告状态',
            dataIndex: 'jishu',
            render: (text) => <Tag color="red">{text}</Tag>,
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
                title="广告信息管理"
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
