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
       id:'BH0214501',
       cf:'24',
       jc:'王三业',
       dw:'ZWH01',
       jg:'有',
       jx:'91',
       zhi:'渝C20184',
       status: '启用',
    },
    {
        id:'BH0214502',
        cf:'30',
        jc:'孟源',
        dw:'ZWH05',
        jg:'有',
        jx:'100',
        zhi:'渝C35Z60',
        status: '启用',
     },
     {
        id:'BH0214503',
        cf:'18',
        jc:'吴代鑫',
        dw:'ZWH09',
        jg:'无',
        jx:'100',
        zhi:'渝C45120',
        status: '启用',
     },
     {
        id:'BH0214504',
        cf:'30',
        jc:'郑晓艺',
        dw:'ZWH10',
        jg:'有',
        jx:'96',
        zhi:'渝C11524',
        status: '启用',
     },
     {
         id:'BH0214505',
         cf:'25',
         jc:'刘言因',
         dw:'ZWH13',
         jg:'无',
         jx:'100',
         zhi:'渝C33630',
         status: '启用',
      },
      {
         id:'BH0214506',
         cf:'18',
         jc:'赵垣垣',
         dw:'ZWH27',
         jg:'无',
         jx:'55',
         zhi:'渝C96V20',
         status: '启用',
      },
      {
        id:'BH0214507',
        cf:'25',
        jc:'陈梦圆',
        dw:'ZWH28',
        jg:'无',
        jx:'96',
        zhi:'渝C23B84',
        status: '启用',
     },
     {
         id:'BH0214508',
         cf:'24',
         jc:'张三元 ',
         dw:'ZWH32',
         jg:'有',
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
            title: '班次',
            dataIndex: 'id',
        },
        {
            title: '座位号',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '票价（元）',
            dataIndex: 'cf',
        },
        {
            title: '乘客姓名',
            dataIndex: 'jc',
        },
        {
            title: '有无折扣',
            dataIndex: 'jg',
        },
        
        {
            title: '车牌号',
            dataIndex: 'zhi',
            render: (text) => <Tag color="#f50000">{text}</Tag>,
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
                title="车票信息"
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
