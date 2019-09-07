import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";
import { Chart, View, Geom, Label } from "bizcharts";
import DataSet from '@antv/data-set';
import dituData from "./mockdata";


interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    currentItem: any;
    data: any[];
}

const mockData = [
    {
        id: 'JCBH35',
        fl:'超载检查',
        mc:'实载人数符合',
        nl:'超载或人数不符客车不出站',
        state: '启用',
    },
    {
        id: 'JCBH64',
        fl:'证照检查',
        mc:'证照齐全',
        nl:'客车证牌照不齐全不出站',
        state: '启用',
    },
    {
        id: 'JCBH78',
        fl:'例检检查',
        mc:'例检通过',
        nl:'车辆安全例检不合格不出站',
        state: '启用',
    },
    {
        id: 'JCBH21',
        fl:'驾驶员检查',
        mc:'驾驶员与所驾车辆相符',
        nl:'驾驶员资格不符合要求或配备不足不出站',
        state: '启用',
    },
    {
        id: 'JCBH35',
        fl:'审核检查1',
        mc:'驾驶员已安全承诺',
        nl:'出站登记表未签字不出站',
        state: '启用',
    },
    {
        id: 'JCBH38',
        fl:'审核检查2',
        mc:'签章齐全',
        nl:'签章不齐全不出站',
        state: '启用',
    },
    {
        id: 'JCBH21',
        fl:'审核检查3',
        mc:'行车安全已告知',
        nl:'安全未告知不出站',
        state: '启用',
    },
    {
        id: 'JCBH37',
        fl:'乘客检查',
        mc:'乘客全系好安全带',
        nl:'乘客未系安全带不出站',
        state: '启用',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '检查项目',
            dataIndex: 'fl',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '检查要求',
            dataIndex: 'nl',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
       
        {
            title: '检查结果',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
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
        const { saveVisible, currentItem, data } = this.state;

        return (
            <PageHeaderWrapper
                title="出站稽查"
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
            </PageHeaderWrapper >
        );
    }
}

export default Type;
