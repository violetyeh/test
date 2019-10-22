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
       mc:'成乐青龙站',
       gg:'04',
       hz:'高乐',
       yy:'30',
       jd:2,
       state: 1,
    },
    {
        id: '渝C8SJ22',
        mc:'成雅成都站',
        gg:'02',
        hz:'孟凡',
        yy:'11',
        jd:1,
        state: 1,
     },
     {
        id: '渝C1J23',
        mc:'成雅成都站',
        gg:'01',
        hz:'齐豫',
        yy:'22',
        jd:0,
        state: 1,
     },
     {
        id: '渝C1SJ24',
        mc:'成乐青龙站',
        gg:'05',
        hz:'张文',
        yy:'13',
        jd:1,
        state: 1,
     },
     {
        id: '渝C3SJ25',
        mc:'成渝青山站',
        gg:'04',
        hz:'赵峰',
        yy:'22',
        jd:0,
        state: 1,
     },
     {
        id: '渝C2SJ26',
        mc:'成乐青龙站',
        gg:'04',
        hz:'刘青',
        yy:'31',
        jd:0,
        state: 1,
     },
     {
        id: '渝C1SJ27',
        mc:'成渝青山站',
        gg:'06',
        hz:'陈松',
        yy:'26',
        jd:2,
        state: 1,
     },
     {
        id: '渝C0SJ28',
        mc:'成渝青山站',
        gg:'02',
        hz:'黄岩',
        yy:'30',
        jd:0,
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
            title: '收费站',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '车道',
            dataIndex: 'gg',
        },
        {
            title: '收费员',
            dataIndex: 'hz',
        },
        {
            title: '费用',
            dataIndex: 'yy',
        },
        
        {
            title: '加收',
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
                title="收费业务明细"
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
