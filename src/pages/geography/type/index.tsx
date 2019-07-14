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
       id: 'LDSM30121',
       mc:'高',
       gg:'CVE-2019-023',
       hz:'This error occurred during the build time and cannot be dismissed.',
       jd:98,
       state: 1,
    },
    {
        id: 'LDSM30122',
        mc:'中',
        gg:'CVE-2019-016',
        hz:'This screen is visible only in development.',
        jd:100,
        state: 1,
     },
     {
        id: 'LDSM30123',
        mc:'低',
        gg:'CVE-2019-065',
        hz:' It will not appear if the app crashes in production.',
        jd:56,
        state: 1,
     },
     {
        id: 'LDSM30124',
        mc:'高',
        gg:'CVE-2019-071',
        hz:'This error occurred during the build time and cannot be dismissed.',
        jd:74,
        state: 1,
     },
     {
        id: 'LDSM30125',
        mc:'高',
        gg:'CVE-2019-005',
        hz:'This screen is visible only in development.',
        jd:95,
        state: 1,
     },
     {
        id: 'LDSM30126',
        mc:'中',
        gg:'CVE-2019-004',
        hz:'It will not appear if the app crashes in production.',
        jd:76,
        state: 1,
     },
     {
        id: 'LDSM30127',
        mc:'低',
        gg:'CVE-2019-036',
        hz:'This error occurred during the build time and cannot be dismissed.',
        jd:100,
        state: 1,
     },
     {
        id: 'LDSM30128',
        mc:'低',
        gg:'CVE-2019-041',
        hz:'It will not appear if the app crashes in production.',
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
            title: '漏洞等级',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '漏洞VCE ID',
            dataIndex: 'gg',
        },
        {
            title: '漏洞描述',
            dataIndex: 'hz',
        },
        {
            title: '漏洞扫描进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '安全情况',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="安全" unCheckedChildren="不安全" />,
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
                title="漏洞扫描管理"
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
