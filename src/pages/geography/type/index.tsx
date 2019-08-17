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
       id: 'WP0032',
       hj:'斗破苍穹',
       mc:'2019-08-14',
       bs:'视频库-动漫',
       bcy:'高品质',
       state: 1,
    },
    {
        id: 'WP0049',
        hj:'斗罗大陆',
        mc:'2019-07-02',
        bs:'视频库-动漫',
        bcy:'低品质',
        state: 1,
     },
     {
        id: 'WP0036',
        hj:'陈情令',
        mc:'2019-08-11',
        bs:'视频库-电视剧',
        bcy:'高品质',
        state: 1,
     },
     {
        id: 'WP0047',
        hj:'魔道祖师',
        mc:'2019-08-12',
        bs:'视频库-动漫',
        bcy:'低品质',
        state: 1,
     },
     {
        id: 'WP0022',
        hj:'源',
        mc:'2019-08-05',
        bs:'音频库-音乐',
        bcy:'低品质',
        state: 1,
     },
     {
        id: 'WP0047',
        hj:'朋友',
        mc:'2019-08-04',
        bs:'音频库-音乐',
        bcy:'高品质',
        state: 1,
     },
     {
        id: 'WP0036',
        hj:'哪吒',
        mc:'2019-08-12',
        bs:'视频库-电影',
        bcy:'低品质',
        state: 1,
     },
     {
        id: 'WP0012',
        hj:'烈火英雄',
        mc:'2019-08-02',
        bs:'视频库-电影',
        bcy:'低品质',
        state: 1,
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
            title: '标题',
            dataIndex: 'hj',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '上传时间',
            dataIndex: 'mc',
            render: (text) => <Tag color="green">{text}</Tag>,
            
        },
        {
            title: '类别',
            dataIndex: 'bs',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '品质',
            dataIndex: 'bcy',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: '是否已下载',
            dataIndex: 'jl',
            render: () => <Switch checkedChildren="已下载" unCheckedChildren="未下载" />,
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
                title="网盘管理"
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
