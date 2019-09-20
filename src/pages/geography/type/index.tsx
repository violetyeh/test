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
       id: 'SJ-JF-0121',
       mc:'CAD工程制图规则',
       gg:'建筑',
       hz:'J-01~n',
       yy:'JS-01~n',
       jd:98,
       state: 1,
    },
    {
        id: 'SJ-JF-0122',
        mc:'房屋建筑CAD制图统一规则',
        gg:'结构',
        hz:'G-01~n',
        yy:'GS-01~n',
        jd:100,
        state: 1,
     },
     {
        id: 'SJ-JF-0123',
        mc:'CAD工程制图规则',
        gg:'给排水',
        hz:'S-01~n ',
        yy:'SS-01~n',
        jd:56,
        state: 1,
     },
     {
        id: 'SJ-JF-0124',
        mc:'房屋建筑制图统一标准',
        gg:'采暖通风空气调节',
        hz:'Se-01~n',
        yy:'SeS-01~n',
        jd:74,
        state: 1,
     },
     {
        id: 'SJ-JF-0125',
        mc:'建筑制图标准',
        gg:'电气',
        hz:'D-01~n',
        yy:'DS-01~n',
        jd:95,
        state: 1,
     },
     {
        id: 'SJ-JF-0126',
        mc:'建筑结构制图标准',
        gg:'弱电',
        hz:'DX-01~n',
        yy:'DXS-01~n',
        jd:76,
        state: 1,
     },
     {
        id: 'SJ-JF-0127',
        mc:'混凝土结构施工图',
        gg:'动力',
        hz:'M-01~n',
        yy:'MS-01~n',
        jd:100,
        state: 1,
     },
     {
        id: 'SJ-JF-0128',
        mc:'给水排水制图标准',
        gg:'建筑',
        hz:'J-01~n',
        yy:'JS-01~n',
        jd:88,
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '标准引用',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '专业名称',
            dataIndex: 'gg',
        },
        {
            title: '初步设计图纸专业代码',
            dataIndex: 'hz',
        },
        {
            title: '施工图图纸专业代码',
            dataIndex: 'yy',
        },
        
        {
            title: '发布进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="已发布" unCheckedChildren="未发布" />,
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
                title="制图标准设置"
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
