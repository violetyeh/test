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
        id: 'MTSJXX0223',
        fenlei: 'JZGG05装配式建筑支撑参数10mm',
        pinlv: 33,
        yaosu: '高处作业吊篮计算',
        fenceng: '600万',
        state: '启用',
       
    },
    {
        id: 'MTSJXX0292',
        fenlei: 'JZGG装配式建筑支撑参数10mm',
        pinlv: 50,
        yaosu: '高处作业吊篮计算',
        fenceng: '200万',
        state: '启用',
       
    },
    {
        id: 'MTSJXX0271',
        fenlei: 'JZGG014装配式建筑支撑参数20mm',
        pinlv: 72,
        yaosu: '附着式升降脚手架计算',
        fenceng: '200万',
        state: '启用',
       
    },
    {
        id: 'MTSJXX0228',
        fenlei: 'JZGG023装配式建筑支撑参数15mm',
        pinlv: 15,
        yaosu: '高处作业吊篮计算',
        fenceng: '300万',
        state: '启用',
       
    },
    {
        id: 'MTSJXX0264',
        fenlei: 'JZGG47装配式建筑支撑参数10mm',
        pinlv: 32,
        yaosu: '外挂防护架计算',
        fenceng: '200万',
        state: '启用',
       
    },
    {
        id: 'MTSJXX0278',
        fenlei: 'MTSJX装配式建筑支撑参数17mm',
        pinlv: 56,
        yaosu: '高处作业吊篮计算',
        fenceng: '250万',
        state: '启用',
       
    },
    {
        id: 'MTSJXX0226',
        fenlei: 'JZGG12装配式建筑支撑参数16mm',
        pinlv: 12,
        yaosu: '外挂防护架计算',
        fenceng: '1000万',
        state: '启用',
       
    },
    {
        id: 'MTSJXX0224',
        fenlei: 'JZGG09装配式建筑支撑参数30mm',
        pinlv: 26,
        yaosu: '附着式升降脚手架计算',
        fenceng: '100万',
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '架体设计参数',
            dataIndex: 'fenlei',
        },
       
        {
            title: '工具式脚手架计算',
            dataIndex: 'yaosu',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '监理费用',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
       
        {
            title: '监理安全率',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },

        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
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
                title="装配式建筑管理"
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
