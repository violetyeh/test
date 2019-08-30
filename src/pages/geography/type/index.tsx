import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag, Checkbox } from "antd";
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
        id: 'APOI-0026',
        mc:'YP-BH-12',
        gg:'土的回弹模量试验',
        hz:'路基填筑',
        jd:76,
        state: 1,
     },
     {
        id: 'APOI-0027',
        mc:'YP-BH-20',
        gg:'土的天然稠度试验',
        hz:'隧道顶部填筑',
        jd:100,
        state: 1,
     },
     {
        id: 'APOI-0028',
        mc:'YP-BH-15',
        gg:'土的烧失率试验',
        hz:'路基填筑',
        jd:88,
        state: 1,
     }, 
    {
       id: 'APOI-0021',
       mc:'YP-BH-02',
       gg:'土的承载比',
       hz:'路基填筑',
       jd:98,
       state: 1,
    },
    {
        id: 'APOI-0022',
        mc:'YP-BH-63',
        gg:'土的颗粒分析试验',
        hz:'隧道顶部填筑',
        jd:100,
        state: 1,
     },
     {
        id: 'APOI-0023',
        mc:'YP-BH-71',
        gg:'土的比重试验',
        hz:'路基填筑',
        jd:56,
        state: 1,
     },
     {
        id: 'APOI-0024',
        mc:'YP-BH-1',
        gg:'土的密度试验',
        hz:'隧道顶部填筑',
        jd:74,
        state: 1,
     },
     {
        id: 'APOI-0025',
        mc:'YP-BH-03',
        gg:'土的含水率试验',
        hz:'路基填筑',
        jd:95,
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
            title: '检测名称',
            dataIndex: 'gg',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        
        {
            title: '工程部位/用途',
            dataIndex: 'hz',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '样品编号',
            dataIndex: 'mc',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '质量检测进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '检测结果',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="合格" unCheckedChildren="不合格" />,
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
                title="检测任务管理"
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
