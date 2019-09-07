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
       id: 'ZDZ-0149SJ21',
       mc:'山东',
       gg:'210',
       hz:'已打印',
       yy:'93',
       jd:2,
       state: 1,
    },
    {
        id: 'ZDZ-0148SJ22',
        mc:'黑龙江',
        gg:'150',
        hz:'已打印',
        yy:'91',
        jd:1,
        state: 1,
     },
     {
        id: 'ZDZ-0141J23',
        mc:'南京',
        gg:'230',
        hz:'已打印',
        yy:'92',
        jd:2,
        state: 1,
     },
     {
        id: 'ZDZ-0141SJ24',
        mc:'重庆',
        gg:'60',
        hz:'未打印',
        yy:'93',
        jd:1,
        state: 1,
     },
     {
        id: 'ZDZ-0143SJ25',
        mc:'长沙',
        gg:'90',
        hz:'已打印',
        yy:'92',
        jd:3,
        state: 1,
     },
     {
        id: 'ZDZ-0142SJ26',
        mc:'成都',
        gg:'120',
        hz:'未打印',
        yy:'91',
        jd:2,
        state: 1,
     },
     {
        id: 'ZDZ-0141SJ27',
        mc:'浙江',
        gg:'100',
        hz:'已打印',
        yy:'96',
        jd:2,
        state: 1,
     },
     {
        id: 'ZDZ-0140SJ28',
        mc:'上海',
        gg:'80',
        hz:'已打印',
        yy:'93',
        jd:3,
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
            title: '终点站编号',
            dataIndex: 'id',
        },
        {
            title: '终点站名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '票价',
            dataIndex: 'gg',
        },
        {
            title: '票据打印',
            dataIndex: 'hz',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '出票进度',
            dataIndex: 'yy',
            render: (text) => <Progress percent={text} status="active" />,
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
                title="客运信息管理"
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
