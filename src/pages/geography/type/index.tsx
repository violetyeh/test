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
        fenlei: '东莞石龙国际电子城楼体LED屏广告',
        yaosu: '广告人聚会',
        state: '启用',
        pinlv: 53,
    },
    {
        id: 'SER8201',
        fenlei: '包茂高速延安北出口单立柱广告 ',
        yaosu: '广告人访谈',
        state: '启用',
        pinlv: 64,
    },
    {
        id: 'SER3921',
        fenlei: '南航报纸航空旅游报广告',
        yaosu: '广告人脉圈',
        state: '启用',
        pinlv: 92,
    },
    {
        id: 'SER0029',
        fenlei: '广东科技报（图文、软文广告）',
        yaosu: '广告人招聘',
        state: '启用',
        pinlv: 82,
    },
    {
        id: 'SER2191',
        fenlei: '低价销售南方都市报所有版面的广告',
        yaosu: '广告人脉圈',
        state: '启用',
        pinlv: 19,
    },
    {
        id: 'SER3321',
        fenlei: '石家庄双面广告塔量身定制',
        yaosu: '广告人招聘',
        state: '启用',
        pinlv: 63,
    },
    {
        id: 'SER2136',
        fenlei: '南京数字有线电视epg广告资源供应',
        yaosu: '广告人脉圈',
        state: '启用',
        pinlv: 19,
    },
    {
        id: 'SER3354',
        fenlei: '苏州小区宣传栏广告媒体',
        yaosu: '广告人招聘',
        state: '启用',
        pinlv: 54,
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
            title: '广告推广服务名称',
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
            title: '广告圈子',
            dataIndex: 'yaosu',
        },

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
                title="广告推广服务管理"
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
