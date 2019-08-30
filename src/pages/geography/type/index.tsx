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
        fenlei: '3421',
        fenceng: '4',
        leixing: '面、点、线',
        yaosu: '国道、省道、县道、乡道、其他公路',
        state: '启用',
        pinlv: 's246（16.452）',
    },
    {
        id: 'SER8201',
        fenlei: '1425',
        fenceng: '8',
        leixing: '面、点',
        yaosu: '标准轨铁路、窄轨铁路',
        state: '启用',
        pinlv: 's351（36.612）',
    },
    {
        id: 'SER3921',
        fenlei: '2108',
        fenceng: '6',
        leixing: '线',
        yaosu: '标准轨铁路、窄轨铁路',
        state: '启用',
        pinlv: 's412（31.451）',
    },
    {
        id: 'SER0029',
        fenlei: '1520',
        fenceng: '2',
        leixing: '线',
        yaosu: '国道、省道、县道、乡道、其他公路',
        state: '启用',
        pinlv: 's316（94.423）',
    },
    {
        id: 'SER2191',
        fenlei: '3200',
        fenceng: '4',
        leixing: '点、线、面',
        yaosu: '标准轨铁路、窄轨铁路',
        state: '启用',
        pinlv: 's316（53.123）',
    },
    {
        id: 'SER3321',
        fenlei: '7412',
        fenceng: '4',
        leixing: '点、线、面',
        yaosu: '国道、省道、县道、乡道、其他公路',
        state: '启用',
        pinlv: 's231（42.242）',
    },
    {
        id: 'SER2191',
        fenlei: '1562',
        fenceng: '4',
        leixing: '点、线、面',
        yaosu: '标准轨铁路、窄轨铁路',
        state: '启用',
        pinlv: 's303（25.421）',
    },
    {
        id: 'SER3321',
        fenlei: '2000',
        fenceng: '4',
        leixing: '点、线、面',
        yaosu: '国道、省道、县道、乡道、其他公路',
        state: '启用',
        pinlv:'s231（42.242）',
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
            title: '道路里程（KM）',
            dataIndex: 'fenlei',
        },
        {
            title: '交通事故报警点',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '道路类型',
            dataIndex: 'yaosu',
        },
        {
            title: '道路车道数',
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
                title="实时道路信息"
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
