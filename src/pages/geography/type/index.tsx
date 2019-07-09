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
        id: 'SER1292',
        fenlei: '20190711水系测绘指导服务',
        fenceng: '水系',
        leixing: '面、点、线',
        yaosu: '湖泊、水库、双线河流等',
        state: '启用',
        pinlv: 80,
    },
    {
        id: 'SER8201',
        fenlei: '20190721高速公路测绘服务',
        fenceng: '居民地',
        leixing: '面、点',
        yaosu: '湖泊、水库、双线河流等',
        state: '启用',
        pinlv: 73,
    },
    {
        id: 'SER3921',
        fenlei: 'C1829铁路区间测绘服务',
        fenceng: '铁路',
        leixing: '线',
        yaosu: '标准轨铁路、窄轨铁路',
        state: '启用',
        pinlv: 92,
    },
    {
        id: 'SER0029',
        fenlei: 'G318国道测绘项目服务',
        fenceng: '公路',
        leixing: '线',
        yaosu: '国道、省道、县道、乡道、其他公路',
        state: '启用',
        pinlv: 82,
    },
    {
        id: 'SER2191',
        fenlei: '重庆市测绘项目服务',
        fenceng: '行政境界',
        leixing: '点、线、面',
        yaosu: '各级行政区、各级行政境界线',
        state: '启用',
        pinlv: 19,
    },
    {
        id: 'SER3321',
        fenlei: '四川省测绘项目(B)服务',
        fenceng: '行政境界',
        leixing: '点、线、面',
        yaosu: '各级行政区、各级行政境界线',
        state: '启用',
        pinlv: 73,
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
            title: '服务名称',
            dataIndex: 'fenlei',
        },
        {
            title: '服务进度',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },
        {
            title: '技术要素类型',
            dataIndex: 'yaosu',
        },
        {
            title: '负责人',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
        },
        // {
        //     title: '几何类型',
        //     dataIndex: 'leixing',
        // },

        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
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
                title="推广服务管理"
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
