import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress, Checkbox } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    {
       id:'CHID3651',
       cf:'陈振海',
       jc:'22',
       dw:'陈元',
       jg:'稳定',
       jx:'91',
       zhi:'渝C20184',
       status: '启用',
    },
    {
        id:'CHID3652',
        cf:'刘钊月',
        jc:'30',
        dw:'赵乐',
        jg:'不稳定',
        jx:'100',
        zhi:'渝C35Z60',
        status: '启用',
     },
     {
        id:'CHID3653',
        cf:'江峰',
        jc:'18',
        dw:'刘天',
        jg:'稳定',
        jx:'100',
        zhi:'渝C45120',
        status: '启用',
     },
     {
        id:'CHID3654',
        cf:'赵宗明',
        jc:'29',
        dw:'田源',
        jg:'稳定',
        jx:'96',
        zhi:'渝C11524',
        status: '启用',
     },
     {
         id:'CHID3655',
         cf:'刘浩天',
         jc:'25',
         dw:'齐萌',
         jg:'不稳定',
         jx:'100',
         zhi:'渝C33630',
         status: '启用',
      },
      {
         id:'CHID3656',
         cf:'李思雨',
         jc:'10',
         dw:'钱随',
         jg:'稳定',
         jx:'100',
         zhi:'渝C96V20',
         status: '启用',
      },
      {
        id:'CHID3657',
        cf:'陈照明',
        jc:'24',
        dw:'李玉',
        jg:'稳定',
        jx:'96',
        zhi:'渝C23B84',
        status: '启用',
     },
     {
         id:'CHID3658',
         cf:'汪渝',
         jc:'24',
         dw:'周海',
         jg:'稳定',
         jx:'100',
         zhi:'渝C11A60',
         status: '启用',
      },
]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: '状态',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >未计重</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '车号',
            dataIndex: 'id',
        },
        {
            title: '驾驶员',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '司磅员',
            dataIndex: 'cf',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '重量（KG）',
            dataIndex: 'jc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '重量状态',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '未超载率',
            dataIndex: 'jx', 
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '车辆车牌号',
            dataIndex: 'zhi',
            render: (text) => <Tag color="#f50000">{text}</Tag>,
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
                title="计重操作"
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

export default Model;
