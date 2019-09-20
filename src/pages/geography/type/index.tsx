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
        fenceng: '6',
        yaosu: '快车道',
        state: '启用',
        pinlv: '规划道路01',
    },
    {
        id: 'SER8201',
        fenlei: '1425',
        fenceng: '4',
        yaosu: '慢车道',
        state: '启用',
        pinlv: '规划道路02',
    },
    {
        id: 'SER3921',
        fenlei: '2108',
        fenceng: '5',
        yaosu: '人行道',
        state: '启用',
        pinlv: '规划道路03',
    },
    {
        id: 'SER0029',
        fenlei: '1520',
        fenceng: '3',
        yaosu: '慢车道',
        state: '启用',
        pinlv: '规划道路04',
    },
    {
        id: 'SER2191',
        fenlei: '3200',
        fenceng: '6',
        yaosu: '快车道',
        state: '启用',
        pinlv: '规划道路05',
    },
    {
        id: 'SER3321',
        fenlei: '7412',
        fenceng: '4',
        yaosu: '人行道',
        state: '启用',
        pinlv: '规划道路06',
    },
    {
        id: 'SER2191',
        fenlei: '1562',
        fenceng: '5',
        yaosu: '绿化带 ',
        state: '启用',
        pinlv: '规划道路07',
    },
    {
        id: 'SER3321',
        fenlei: '2000',
        fenceng: '3',
        yaosu: '快车道',
        state: '启用',
        pinlv:'规划道路08',
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
            title: '道路名称',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '道路里程（KM）',
            dataIndex: 'fenlei',
        },
        {
            title: '板块名称',
            dataIndex: 'yaosu',
        },
        {
            title: '宽度（M）',
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
                title="道路绘制"
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
