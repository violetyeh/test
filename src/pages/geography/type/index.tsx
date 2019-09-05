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
        fenceng: '番茄',
        yaosu: '集装箱车',
        state: '启用',
        pinlv: '常德',
    },
    {
        id: 'SER8201',
        fenlei: '1425',
        fenceng: '8胡萝卜',
        yaosu: '平板车',
        state: '启用',
        pinlv: '长沙',
    },
    {
        id: 'SER3921',
        fenlei: '2108',
        fenceng: '冰箱',
        yaosu: '大货车',
        state: '启用',
        pinlv: '张家界',
    },
    {
        id: 'SER0029',
        fenlei: '1520',
        fenceng: '书',
        yaosu: '集装箱车',
        state: '启用',
        pinlv: '岳阳',
    },
    {
        id: 'SER2191',
        fenlei: '3200',
        fenceng: '茶叶',
        yaosu: '面包车',
        state: '启用',
        pinlv: '赣州',
    },
    {
        id: 'SER3321',
        fenlei: '7412',
        fenceng: '苹果',
        yaosu: '集装箱车',
        state: '启用',
        pinlv: '株洲',
    },
    {
        id: 'SER2191',
        fenlei: '1562',
        fenceng: '电视机',
        yaosu: '叉车',
        state: '启用',
        pinlv: '衡阳',
    },
    {
        id: 'SER3321',
        fenlei: '2000',
        fenceng: '笔记本电脑',
        yaosu: '集装箱车',
        state: '启用',
        pinlv:'长沙',
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
            title: '节点名称',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '道路里程（KM）',
            dataIndex: 'fenlei',
        },
        {
            title: '车辆类型',
            dataIndex: 'yaosu',
        },
        {
            title: '货物名称',
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
                title="运输节点管理"
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
