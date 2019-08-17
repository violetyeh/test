import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
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
        hj: '图片库',
        dw:'刘亦菲剧照',
        ren:'刘威',
        riqi:'花木兰 刘亦菲',
        qk:'.jpg',
        process: 1,
        
    },
    {
        hj: '音频库',
        dw:'凉凉',
        ren:'孟浩',
        riqi:'三生三世  张碧晨',
        qk:'.mp3',
        process: 0.5,
        
    },
    {
        hj: '视频库',
        dw:'唐人街探案',
        ren:'唐宇',
        riqi:'王宝强 刘昊然',
        qk:'.mp4',
        process: 2,
        
    },
    {
        hj: '视频库',
        dw:'泰囧',
        ren:'李白白',
        riqi:'王宝强 徐峥',
        qk:'.mp4',
        process: 1,
        
    },
    {
        hj: '图片库',
        dw:'王俊凯剧照',
        ren:'明楼',
        riqi:'王俊凯',
        qk:'.jpg',
        process: 0.2,
        
    },
    {
        hj: '视频库',
        dw:'我的少年时代',
        ren:'明玉',
        riqi:'王俊凯  王源',
        qk:'.mp4',
        process: 0.6,
        
    },
    {
        hj: '图片库',
        dw:'王源剧照',
        ren:'刘茵茵',
        riqi:'王源',
        qk:'.jpg',
        process: 0.8,
        
    },
    {
        hj: '音频库',
        dw:'白衣',
        ren:'赵湾',
        riqi:'河图',
        qk:'.mp3',
        process: 0.7,
        
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
            title: '文档状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
        },
        {
            title: '所属分类',
            dataIndex: 'hj',
            render: (text) => <Tag color="#123">{text}</Tag>,
        },
        {
            title: '资源描述',
            dataIndex: 'dw',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '上传用户',
            dataIndex: 'ren',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: '资源标签',
            dataIndex: 'riqi',
            render: (text) => <Tag color="#003">{text}</Tag>,
        },
        {
            title: '文件格式',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '文件大小占比',
            dataIndex: 'process',
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
                title="文档管理"
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
