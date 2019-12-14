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
        mc:'36521452412521',
        gg:'地上',
        hz:'国有建设用地使用权',
        sg:'出让/商品房',
        jd:74,
        state: 1,
     },
     {
        id: 'FANG0025',
        mc:'3625412541572',
        gg:'地下',
        hz:'房屋所有权',
        sg:'出让/自建房',
        jd:95,
        state: 1,
     },
     {
        id: 'FANG0026',
        mc:'3254785412415',
        gg:'地表',
        hz:'房屋所有权',
        sg:'出让/自建房',
        jd:76,
        state: 1,
     },
     {
        id: 'FANG0021',
        mc:'3254789546152',
        gg:'地上',
        hz:'房屋所有权',
        sg:'出让/自建房',
        jd:98,
        state: 1,
     },
     {
         id: 'FANG0022',
         mc:'3245126547854',
         gg:'地下',
         hz:'国有建设用地使用权',
         sg:'出让/商品房',
         jd:100,
         state: 1,
      },
      {
         id: 'FANG0023',
         mc:'3254879562145',
         gg:'地表',
         hz:'房屋所有权',
         sg:'出让/自建房',
         jd:56,
         state: 1,
      },
     {
        id: 'FANG0027',
        mc:'32147854652144',
        gg:'地下',
        hz:'房屋所有权',
        sg:'出让/自建房',
        jd:100,
        state: 1,
     },
     {
        id: 'FANG0028',
        mc:'36025412365842',
        gg:'地表',
        hz:'国有建设用地使用权',
        sg:'出让/商品房',
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
            title: '不动产单元号',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '权利设定方式',
            dataIndex: 'gg',
        },
        {
            title: '权利类型',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '权利性质',
            dataIndex: 'sg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '管理进度',
            dataIndex: 'jd',
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
                title="权属信息"
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
