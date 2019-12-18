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
       mc:'形象创造',
       gg:'滤镜',
       hz:'J-01~n',
       yy:'lj JS-01~n',
       jd:98,
       state: 1,
    },
    {
        id: 'SJ-JF-0122',
        mc:'分色制板',
        gg:'视图',
        hz:'G-01~n',
        yy:'st GS-01~n',
        jd:100,
        state: 1,
     },
     {
        id: 'SJ-JF-0123',
        mc:'形象创造',
        gg:'滤镜',
        hz:'S-01~n ',
        yy:'lj SS-01~n',
        jd:56,
        state: 1,
     },
     {
        id: 'SJ-JF-0124',
        mc:'图像处理',
        gg:'图像',
        hz:'Se-01~n',
        yy:'tx SeS-01~n',
        jd:74,
        state: 1,
     },
     {
        id: 'SJ-JF-0125',
        mc:'形象创造',
        gg:'视图',
        hz:'D-01~n',
        yy:'st DS-01~n',
        jd:95,
        state: 1,
     },
     {
        id: 'SJ-JF-0126',
        mc:'图像处理',
        gg:'图层',
        hz:'DX-01~n',
        yy:'tc DXS-01~n',
        jd:76,
        state: 1,
     },
     {
        id: 'SJ-JF-0127',
        mc:'文字排版',
        gg:'视图',
        hz:'M-01~n',
        yy:'st MS-01~n',
        jd:100,
        state: 1,
     },
     {
        id: 'SJ-JF-0128',
        mc:'文字录入',
        gg:'图层',
        hz:'J-01~n',
        yy:'tc JS-01~n',
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
            title: '处理操作',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '处理控制',
            dataIndex: 'gg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '排版处理代码',
            dataIndex: 'hz',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '设计处理代码',
            dataIndex: 'yy',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        
        {
            title: '处理进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="处理操作"
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
