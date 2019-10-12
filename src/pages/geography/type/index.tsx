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
        id: 'CL-00001',
        mc:'工程业务监理#SY02',
        gg:'筑基阶段',
        hz:'监理单位',
        jd:98,
        state: 1,
        jk:'区建设工程监理',
     },
     {
         id: 'CL-00002',
         mc:'工程业务监理#SY63',
         gg:'施工阶段',
         hz:'施工单位',
         jd:100,
         state: 1,
         jk:'市建设工程监理',
      },
      {
        id: 'CL-00003',
        mc:'工程业务监理#SY71',
        gg:'监理阶段',
        hz:' 监理单位',
        jd:56,
        state: 1,
        jk:'县建设工程监理',
     },
     {
        id: 'CL-00004',
        mc:'工程业务监理#SY1',
        gg:'筑基阶段',
        hz:'施工单位',
        jd:74,
        state: 1,
        jk:'市建设工程监理',
     },
     {
        id: 'CL-00005',
        mc:'工程业务监理#SY03',
        gg:'铺料阶段',
        hz:'施工单位',
        jd:95,
        state: 1,
        jk:'区建设工程监理',
     },
    {
        id: 'CL-00006',
        mc:'工程业务监理#SY12',
        gg:'铺料阶段',
        hz:'施工单位',
        jd:76,
        state: 1,
        jk:'市建设工程监理',
     },
     
     {
        id: 'CL-00007',
        mc:'工程业务监理#SY20',
        gg:'监理阶段',
        hz:'监理单位',
        jd:100,
        state: 1,
        jk:'市建设工程监理',
     },
     {
        id: 'CL-00008',
        mc:'工程业务监理#SY15',
        gg:'铺料阶段',
        hz:'施工单位',
        jd:88,
        state: 1,
        jk:'县建设工程监理',
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
            title: '工程名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '监理单位',
            dataIndex: 'jk',
           
        },
        {
            title: '阶段',
            dataIndex: 'gg',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '用户类型',
            dataIndex: 'hz',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '监理进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="监理数据查询"
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
