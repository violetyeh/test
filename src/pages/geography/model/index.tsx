import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    {
        id: 'GGJG0023',
        pinlv: '#FA广告方案0023',
        date: '通讯企业(移动.网通,联通)',
        model: '采纳广告创意',
        type: '丰庆路东口(西安市汽车站) - 西北大学 - 边家村 - 太白路立交',
        process: 30,
        status: '启用',
    },
    {
        id: 'GGJG0036',
        pinlv: '#FA广告方案0036',
        date: '娱乐业,餐饮业(蛋糕店,咖啡店,自助烧烤,特色餐厅)',
        model: '收集广告创意',
        type: '人才市场 - 唐城宾馆 - 吉祥村',
        process: 45,
        status: '启用',
    },
    {
        id: 'GGJG0015',
        pinlv: '#FA广告方案0015',
        date: '电器、珠宝经销商、大型超市',
        model: '收集广告创意',
        type: '省肿瘤医院(美术学院) - 医学院 - 纬二街',
        process: 63,
        status: '启用',
    },
    {
        id: 'GGJG0024',
        pinlv: '#FA广告方案0024',
        date: '娱乐业,餐饮业(蛋糕店,咖啡店,自助烧烤,特色餐厅)',
        model: '收集广告创意',
        type: '八里村 - 政法大学 - 吴家坟(陕西师范大学)',
        process: 72,
        status: '启用',
    },
    {
        id: 'GGJG0039',
        pinlv: '#FA广告方案0039',
        date: '娱乐业,餐饮业(蛋糕店,咖啡店,自助烧烤,特色餐厅)',
        model: '采纳广告创意',
        type: '航天西路北口 - 雁南路南口 - 北里王东村',
        process: 13,
        status: '启用',
    },
    {
        id: 'GGJG0040',
        pinlv: '#FA广告方案0040',
        date: '电器、珠宝经销商、大型超市',
        model: '收集广告创意',
        type: '汉城北路 - 城西客运站 - 汉城路(大庆路口)',
        process: 44,
        status: '启用',
    },
    {
        id: 'GGJG0011',
        pinlv: '#FA广告方案0011',
        date: '通讯企业(移动.网通,联通)',
        model: '采纳广告创意',
        type: '西钞广场 - 制药厂 - 土门新市场',
        process: 38,
        status: '启用',
    },
    {
        id: 'GGJG0014',
        pinlv: '#FA广告方案0014',
        date: '电器、珠宝经销商、大型超市',
        model: '收集广告创意',
        type: '吴家坟(陕西师范大学) - 国展中心(和谐广场) - 电视塔(结核病院)',
        process: 56,
        status: '启用',
    },
   
]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
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
            title: '广告方案',
            dataIndex: 'pinlv',
        },
        {
            title: '广告目标市场',
            dataIndex: 'date',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },

        {
            title: '广告创意',
            dataIndex: 'model',
        },
        {
            title: '公交线路选择',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '策划进度',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="广告策划设计"
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

export default Model;
