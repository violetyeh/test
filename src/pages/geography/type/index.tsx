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
       id: '渝C9SJ21',
       mc:'黄',
       gg:'豪华',
       hz:'否',
       yy:'3',
       jd:2,
       state: 1,
    },
    {
        id: '渝C8SJ22',
        mc:'绿',
        gg:'普通',
        hz:'否',
        yy:'1',
        jd:1,
        state: 1,
     },
     {
        id: '渝C1J23',
        mc:'绿',
        gg:'普通',
        hz:'是',
        yy:'2',
        jd:2,
        state: 1,
     },
     {
        id: '渝C1SJ24',
        mc:'黄',
        gg:'豪华',
        hz:'否',
        yy:'3',
        jd:1,
        state: 1,
     },
     {
        id: '渝C3SJ25',
        mc:'绿',
        gg:'普通',
        hz:'否',
        yy:'2',
        jd:3,
        state: 1,
     },
     {
        id: '渝C2SJ26',
        mc:'黄',
        gg:'豪华',
        hz:'否',
        yy:'1',
        jd:2,
        state: 1,
     },
     {
        id: '渝C1SJ27',
        mc:'绿',
        gg:'普通',
        hz:'否',
        yy:'6',
        jd:2,
        state: 1,
     },
     {
        id: '渝C0SJ28',
        mc:'黄',
        gg:'豪华',
        hz:'是',
        yy:'3',
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
            title: '车牌号',
            dataIndex: 'id',
        },
        {
            title: '车牌颜色',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '客车类型',
            dataIndex: 'gg',
        },
        {
            title: '是否临时',
            dataIndex: 'hz',
        },
        {
            title: '燃油费',
            dataIndex: 'yy',
        },
        
        {
            title: '站务费',
            dataIndex: 'jd',
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
                title="车辆信息管理"
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
