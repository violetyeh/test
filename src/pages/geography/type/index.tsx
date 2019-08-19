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
        id: 'BL0230001023',
        fenlei: 'register',
        fenceng: '用户注册次数',
        yaosu: '用户注册',
        state: '启用',
        pinlv: 80,
        wd:'用户年龄段 注册渠道',
    },
    {
        id: 'BL0230008201',
        fenlei: 'order',
        fenceng: '用户浏览产品页面的次数',
        yaosu: '产品详情页面浏览',
        state: '启用',
        pinlv: 73,
        wd:'产品ID 产品名称 产品类别',
    },
    {
        id: 'BL0230001292',
        fenlei: 'find',
        fenceng: '用户查看应用主要功能',
        yaosu: '功能查看',
        state: '启用',
        pinlv: 80,
        wd:'产品ID 产品名称 ',
    },
    {
        id: 'BL0230008201',
        fenlei: 'test',
        fenceng: '游客用户试用应用功能',
        yaosu: '游客第一次使用应用',
        state: '启用',
        pinlv: 73,
        wd:'产品ID 产品名称 产品类别',
    },
    {
        id: 'BL0230003921',
        fenlei: 'new',
        fenceng: '老用户分享应用给新用户',
        yaosu: '推荐新用户',
        state: '启用',
        pinlv: 92,
        wd:'产品ID  产品类别',
    },
    {
        id: 'BL0230000029',
        fenlei: 'use',
        fenceng: '老用户使用应用',
        yaosu: '应用使用频率',
        state: '启用',
        pinlv: 82,
        wd:' 产品名称 产品类别',
    },
    {
        id: 'BL0230002191',
        fenlei: 'use',
        fenceng: '游客再次使用应用',
        yaosu: '游客使用',
        state: '启用',
        pinlv: 19,
        wd:'产品ID 产品名称 ',
    },
    {
        id: 'BL0230003321',
        fenlei: 'login',
        fenceng: '游客注册登录应用',
        yaosu: '新的用户使用应用',
        state: '启用',
        pinlv: 73,
        wd:'产品ID  产品类别',
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
            title: '标识符',
            dataIndex: 'fenlei',
        },
       
        {
            title: '名称',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
        },
        {
            title: '描述',
            dataIndex: 'fenceng',
        },
        {
            title: '维度',
            dataIndex: 'wd',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '用户变量占比',
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
                title="应用级变量管理"
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
