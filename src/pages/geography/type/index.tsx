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
        id: 'JYLS0144',
        mc:'32541256',
        gg:'2019年10月22日13:52:06',
        hz:'正常',
        jd:74,
        state: 1,
     },
     {
        id: 'JYLS0145',
        mc:'52478596',
        gg:'2019年10月22日13:56:10',
        hz:'正常',
        jd:95,
        state: 1,
     },
     {
        id: 'JYLS0146',
        mc:'25416341',
        gg:'2019年10月22日14:00:13',
        hz:'异常',
        jd:76,
        state: 1,
     },
     {
        id: 'JYLS0141',
        mc:'23564152',
        gg:'2019年10月22日14:06:17',
        hz:'正常',
        jd:98,
        state: 1,
     },
     {
         id: 'JYLS0142',
         mc:'112354155',
         gg:'2019年10月22日14:10:21',
         hz:'异常',
         jd:100,
         state: 1,
      },
      {
         id: 'JYLS0143',
         mc:'556234154',
         gg:'2019年10月22日14:15:25',
         hz:'正常',
         jd:56,
         state: 1,
      },
     {
        id: 'JYLS0147',
        mc:'35647125',
        gg:'2019年10月22日14:24:00',
        hz:'正常',
        jd:100,
        state: 1,
     },
     {
        id: 'JYLS0148',
        mc:'12345678',
        gg:'2019年10月22日14:31:55',
        hz:'正常',
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
            title: '交易流水序号',
            dataIndex: 'id',
        },
        {
            title: '卡号',
            dataIndex: 'mc',
        },
        {
            title: '交易时间',
            dataIndex: 'gg',
        },
        {
            title: '记录类型',
            dataIndex: 'hz',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '交易效率',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '是否透支',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="否" unCheckedChildren="是" defaultChecked/>,
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
                title="车道交易流水"
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
