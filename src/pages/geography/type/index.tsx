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
        id: 'FANG0024',
        mc:'绕城收费站',
        gg:'JYH018',
        hz:'大货车',
        jd:74,
        state: 1,
     },
     {
        id: 'FANG0025',
        mc:'跃进收费站',
        gg:'JYH019',
        hz:'面包车',
        jd:95,
        state: 1,
     },
     {
        id: 'FANG0026',
        mc:'新南收费站',
        gg:'JYH020',
        hz:'小货车',
        jd:76,
        state: 1,
     },
     {
        id: 'FANG0021',
        mc:'万寿收费站',
        gg:'JYH021',
        hz:'小汽车',
        jd:98,
        state: 1,
     },
     {
         id: 'FANG0022',
         mc:'开源收费站',
         gg:'JYH022',
         hz:'越野车',
         jd:100,
         state: 1,
      },
      {
         id: 'FANG0023',
         mc:'清水台收费站',
         gg:'JYH023',
         hz:'面包车',
         jd:56,
         state: 1,
      },
     {
        id: 'FANG0027',
        mc:'蒲河收费站',
        gg:'JYH025',
        hz:'大货车',
        jd:100,
        state: 1,
     },
     {
        id: 'FANG0028',
        mc:'王家沟收费站',
        gg:'JYH024',
        hz:'小汽车',
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
            title: '收费站名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '交易号',
            dataIndex: 'gg',
        },
        {
            title: '车型',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '收费（元）',
            dataIndex: 'jd',
        },
        {
            title: '联网收费',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="联网" unCheckedChildren="未联网" defaultChecked/>,
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
                title="收费明细"
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
