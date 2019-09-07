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
       id: 'KCBH01',
       zhonglei:'冬季安全行车要领01',
       mingcheng:'掌握冬季车辆设备的维护与保养知识',
       songjian:'同意',
       shengchan:'孟娜',
       chandi:'不许可',
       riqi:'2019年7月09日',
       state: 1,
    },
    {
        id: 'KCBH02',
        zhonglei:'紧急状况处置方法01',
        mingcheng:'了解常见事故的发生规律和预防措施',
        songjian:'不同意',
        shengchan:'刘海波',
        chandi:'不受理',
        riqi:'2019年7月06日',
        state: 1,
     },
     {
        id: 'KCBH03',
        zhonglei:'近期事故通报分析01',
        mingcheng:'分析全国典型道路交通事故的成因和影响',
        songjian:'不同意',
        shengchan:'石桂艳',
        chandi:'不受理',
        riqi:'2019年6月11日',
        state: 1,
     },
     {
        id: 'KCBH04',
        zhonglei:'冬季安全行车要领02',
        mingcheng:'了解冬季行车安全重点和注意事项',
        songjian:'同意',
        shengchan:'李琦',
        chandi:'不许可',
        riqi:'2019年6月30日',
        state: 1,
     },
     {
        id: 'KCBH05',
        zhonglei:'紧急状况处置方法02',
        mingcheng:'掌握正确的急救方法',
        songjian:'同意',
        shengchan:'陈云杰',
        chandi:'不许可',
        riqi:'2019年7月01日',
        state: 1,
     },
     {
        id: 'KCBH06',
        zhonglei:'冬季安全行车要领03',
        mingcheng:'强化雨雾冰雪天环境下的驾驶操作能力及安全意识',
        songjian:'不同意',
        shengchan:'张玲',
        chandi:'不许可',
        riqi:'2019年7月13日',
        state: 1,
     },
     {
        id: 'KCBH07',
        zhonglei:'紧急状况处置方法03',
        mingcheng:'培养驾驶应变的能力',
        songjian:'不同意',
        shengchan:'江米意',
        chandi:'不许可',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: 'KCBH08',
        zhonglei:'近期事故通报分析02',
        mingcheng:'提高全员安全意识',
        songjian:'同意',
        shengchan:'王思琪',
        chandi:'不受理',
        riqi:'2019年7月14日',
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
            title: '课程编号',
            dataIndex: 'id',
        },
        {
            title: '课程名称',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '课程要点',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        
        {
            title: '课程负责人',
            dataIndex: 'shengchan',
        },
       
        {
            title: '课程日期',
            dataIndex: 'riqi',
        },
        {
            title: '培训状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="已培训" unCheckedChildren="未培训" />,
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
                title="培训课程管理"
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
