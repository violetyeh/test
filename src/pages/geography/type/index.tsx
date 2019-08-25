import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag, Checkbox } from "antd";
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
        id: 'APOI-0026',
        mc:'192.168.1.12',
        gg:'网页论坛',
        hz:'wef.com',
        jd:76,
        state: 1,
     },
     {
        id: 'APOI-0027',
        mc:'192.168.1.20',
        gg:'网页邮件',
        hz:'sdffs.com',
        jd:100,
        state: 1,
     },
     {
        id: 'APOI-0028',
        mc:'192.168.1.15',
        gg:'网络游戏',
        hz:'sfs.com',
        jd:88,
        state: 1,
     }, 
    {
       id: 'APOI-0021',
       mc:'192.168.1.02',
       gg:'即时通讯',
       hz:'youjian.com',
       jd:98,
       state: 1,
    },
    {
        id: 'APOI-0022',
        mc:'192.168.1.63',
        gg:'邮件接收',
        hz:'dianying.com',
        jd:100,
        state: 1,
     },
     {
        id: 'APOI-0023',
        mc:'192.168.1.71',
        gg:'邮件发送',
        hz:' anquan.com',
        jd:56,
        state: 1,
     },
     {
        id: 'APOI-0024',
        mc:'192.168.1.1',
        gg:'文件传输',
        hz:'198.com',
        jd:74,
        state: 1,
     },
     {
        id: 'APOI-0025',
        mc:'192.168.1.03',
        gg:'网页浏览',
        hz:'163.com',
        jd:95,
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
            title: '协议名称',
            dataIndex: 'gg',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        
        {
            title: '黑名单',
            dataIndex: 'hz',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '漏洞检测进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '绑定状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="绑定" unCheckedChildren="未绑定" />,
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
                title="安全管理"
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
