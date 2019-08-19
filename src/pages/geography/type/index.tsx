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
        id: 'BG01100010278',
        fenlei: '开发开始配置数据',
        pinlv: 56,
        yaosu: '库内工作产品修改',
        fenceng: '用户测试',
        state: '启用',
       
    },
    {
        id: 'BG01100010226',
        fenlei: '开发过程配置数据',
        pinlv: 100,
        yaosu: '库内工作产品读写',
        fenceng: '系统测试',
        state: '启用',
       
    },
    {
        id: 'BG01100010224',
        fenlei: '开发结束配置数据',
        pinlv: 26,
        yaosu: '库内工作产品删除',
        fenceng: '产品控制',
        state: '启用',
       
    },
    {
        id: 'BG01100010223',
        fenlei: '开发开始配置数据',
        pinlv: 33,
        yaosu: '库内工作产品修改',
        fenceng: '系统测试',
        state: '启用',
       
    },
    {
        id: 'BG01100010292',
        fenlei: '开发过程配置数据',
        pinlv: 50,
        yaosu: '库内工作产品修改',
        fenceng: '用户测试',
        state: '启用',
       
    },
    {
        id: 'BG01100010271',
        fenlei: '开发结束配置数据',
        pinlv: 62,
        yaosu: '库内工作产品删除',
        fenceng: '产品控制',
        state: '启用',
       
    },
    {
        id: 'BG01100010228',
        fenlei: '开发开始配置数据',
        pinlv: 65,
        yaosu: '库内工作产品修改',
        fenceng: '系统测试',
        state: '启用',
       
    },
    {
        id: 'BG01100010264',
        fenlei: '开发过程配置数据',
        pinlv: 42,
        yaosu: '库内工作产品读写',
        fenceng: '用户测试',
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
            title: '开发库',
            dataIndex: 'fenlei',
        },
       
        {
            title: '基线库',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '产品库',
            dataIndex: 'fenceng',
        },
        ,
        {
            title: '变更进度',
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
                title="变更管理"
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
