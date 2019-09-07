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
       id: 'CL9SJ21',
       mc:'2019-09-06',
       gg:'长沙长途客运站',
       hz:'李云杰',
       yy:'复检',
       jd:88,
       state: 1,
    },
    {
        id: 'CL8SJ22',
        mc:'2019-09-07',
        gg:'成都长途客运站',
        hz:'王石',
        yy:'首检',
        jd:100,
        state: 1,
     },
     {
        id: 'CL1J23',
        mc:'2019-09-07',
        gg:'永川长途客运站',
        hz:'李莎',
        yy:'首检',
        jd:92,
        state: 1,
     },
     {
        id: 'CL1SJ24',
        mc:'2019-09-09',
        gg:'合川长途客运站',
        hz:'钱丽',
        yy:'复检',
        jd:91,
        state: 1,
     },
     {
        id: 'CL3SJ25',
        mc:'2019-09-08',
        gg:'沙坪坝长途客运站',
        hz:'陈杰',
        yy:'复检',
        jd:83,
        state: 1,
     },
     {
        id: 'CL2SJ26',
        mc:'2019-09-06',
        gg:'重庆长途客运站',
        hz:'赵元',
        yy:'首检',
        jd:72,
        state: 1,
     },
     {
        id: 'CL1SJ27',
        mc:'2019-09-07',
        gg:'江津长途客运站',
        hz:'李伟',
        yy:'复检',
        jd:62,
        state: 1,
     },
     {
        id: 'CL0SJ28',
        mc:'2019-09-06',
        gg:'海安长途客运站',
        hz:'王安',
        yy:'首检',
        jd:93,
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
            title: '车辆',
            dataIndex: 'id',
        },
        {
            title: '安检时间',
            dataIndex: 'mc',
        },
        {
            title: '安检站',
            dataIndex: 'gg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '安检员',
            dataIndex: 'hz',
        },
        {
            title: '安检类型',
            dataIndex: 'yy',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        
        {
            title: '安检进度',
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
                title="安检信息"
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
