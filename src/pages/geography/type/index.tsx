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
        id: 'JZGG010278',
        fenlei: '管理员',
        pinlv: 56,
        yaosu: '49',
        fenceng: '20',
        state: '启用',
       
    },
    {
        id: 'JZGG010226',
        fenlei: '客服',
        pinlv: 12,
        yaosu: '35',
        fenceng: '50',
        state: '启用',
       
    },
    {
        id: 'JZGG010224',
        fenlei: '管理员',
        pinlv: 26,
        yaosu: '40',
        fenceng: '50',
        state: '启用',
       
    },
    {
        id: 'JZGG010223',
        fenlei: '客服',
        pinlv: 33,
        yaosu: '50',
        fenceng: '20',
        state: '启用',
       
    },
    {
        id: 'JZGG010292',
        fenlei: '客服',
        pinlv: 50,
        yaosu: '49',
        fenceng: '20',
        state: '启用',
       
    },
    {
        id: 'JZGG010271',
        fenlei: '客服',
        pinlv: 62,
        yaosu: '35',
        fenceng: '30',
        state: '启用',
       
    },
    {
        id: 'JZGG010228',
        fenlei: '客服',
        pinlv: 65,
        yaosu: '45',
        fenceng: '20',
        state: '启用',
       
    },
    {
        id: 'JZGG010264',
        fenlei: '管理员',
        pinlv: 42,
        yaosu: '30',
        fenceng: '50',
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
            title: '电影编号',
            dataIndex: 'id',
        },
        {
            title: '角色',
            dataIndex: 'fenlei',
        },
       
        {
            title: '票价',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '购买人数',
            dataIndex: 'fenceng',
        },
        // {
        //     title: '几何类型',
        //     dataIndex: 'leixing',
        // },
        {
            title: '服务效率',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

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
                title="票务营销管理"
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
