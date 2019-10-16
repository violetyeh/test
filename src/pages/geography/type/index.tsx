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
        fenlei: 'GGSJ公交候车亭灯箱广告策划设计',
        pinlv: 80,
        yaosu: '直击人心，给客户留下深刻印象',
        fenceng: '孟凡',
        state: '启用',
       
    },
    {
        id: 'SER1271',
        fenlei: 'GGSJ014公交候车亭灯箱广告策划设计',
        pinlv: 32,
        yaosu: '广告目标人群明确',
        fenceng: '王石',
        state: '启用',
       
    },
    {
        id: 'SER1228',
        fenlei: 'GGSJ023公交候车亭灯箱广告策划设计',
        pinlv: 65,
        yaosu: '直击人心，给客户留下深刻印象',
        fenceng: '钱萌',
        state: '启用',
       
    },
    {
        id: 'SER1264',
        fenlei: 'GGSJ47公交候车亭灯箱广告策划设计',
        pinlv: 42,
        yaosu: '简洁明了，吸引客户',
        fenceng: '张琼凡',
        state: '启用',
       
    },
    {
        id: 'SER1278',
        fenlei: 'GGSJ36公交候车亭灯箱广告策划设计',
        pinlv: 56,
        yaosu: '广告目标人群明确',
        fenceng: '孟思三',
        state: '启用',
       
    },
    {
        id: 'SER1226',
        fenlei: 'GGSJ12公交候车亭灯箱广告策划设计',
        pinlv: 12,
        yaosu: '简洁明了，吸引客户',
        fenceng: '王思',
        state: '启用',
       
    },
    {
        id: 'SER1224',
        fenlei: 'GGSJ09公交候车亭灯箱广告策划设计',
        pinlv: 26,
        yaosu: '直击人心，给客户留下深刻印象',
        fenceng: '陈思凡',
        state: '启用',
       
    },
    {
        id: 'SER1223',
        fenlei: 'GGSJ05公交候车亭灯箱广告策划设计',
        pinlv: 33,
        yaosu: '简洁明了，吸引客户',
        fenceng: '张凡',
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
            title: '广告策划名称',
            dataIndex: 'fenlei',
        },
        {
            title: '策划进度',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },
        {
            title: '策划要求',
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
                title="策划要求"
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
