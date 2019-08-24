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
        id: 'LANJIE0000024',
        mc:'恶意病毒',
        gg:'CVE-2019-071',
        hz:'文件传输',
        jd:74,
        state: 1,
     },
     {
        id: 'LANJIE0000025',
        mc:'暴力',
        gg:'CVE-2019-005',
        hz:'远程登录',
        jd:95,
        state: 1,
     },
     {
        id: 'LANJIE0000026',
        mc:'赌博',
        gg:'CVE-2019-004',
        hz:'即时通讯',
        jd:76,
        state: 1,
     },
     {
        id: 'LANJIE0000021',
        mc:'暴力',
        gg:'CVE-2019-023',
        hz:'VOIP',
        jd:98,
        state: 1,
     },
     {
         id: 'LANJIE0000022',
         mc:'恶意网站',
         gg:'CVE-2019-016',
         hz:'股票软件',
         jd:100,
         state: 1,
      },
      {
         id: 'LANJIE0000023',
         mc:'色情',
         gg:'CVE-2019-065',
         hz:' 电子邮件',
         jd:56,
         state: 1,
      },
     {
        id: 'LANJIE0000027',
        mc:'色情',
        gg:'CVE-2019-044',
        hz:'WEB',
        jd:100,
        state: 1,
     },
     {
        id: 'LANJIE0000028',
        mc:'色情',
        gg:'CVE-2019-041',
        hz:'P2P',
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
            title: 'URL分类库',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '控制类型',
            dataIndex: 'gg',
        },
        {
            title: '应用协议',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '拦截报告上传进度',
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
                title="拦截报告管理"
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
