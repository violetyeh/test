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
        id: 'ZB1200012',
        sp:'电阻',
        shijian:'2019年7月15日12:27:58',
        biaozhun:'5x20mm,±0.2',
        jiance:'郑峰',
        process: 88,
        status: '启用',
    },
    {
        id: 'ZB1200013',
        sp:'螺丝',
        shijian:'2019年7月14日13:11:19',
        biaozhun:'5x20mm,±0.1',
        jiance:'王媛',
        process: 99,
        status: '启用',
    },
    {
        id: 'ZB1200014',
        sp:'有铅电阻',
        shijian:'2019年7月10日13:11:24',
        biaozhun:'5x20mm,±0.2',
        jiance:'刘琦歌',
        process: 5,
        status: '启用',
    },
    {
        id: 'ZB1200015',
        sp:'无铅电阻',
        shijian:'2019年7月06日14:11:29',
        biaozhun:'5x20mm,±0.3',
        jiance:'李武雨',
        process: 95,
        status: '启用',
    },
    {
        id: 'ZB1200016',
        sp:'螺丝钉',
        shijian:'2019年7月08日08:31:46',
        biaozhun:'5x20mm,±0.1',
        jiance:'王可可',
        process: 100,
        status: '启用',
    },
    {
        id: 'ZB1200017',
        sp:'钉子',
        shijian:'2019年7月06日09:06:04',
        biaozhun:'5x20mm,±0.6',
        jiance:'吴启拉',
        process: 60,
        status: '启用',
    },
    {
        id: 'ZB1200018',
        sp:'有铅电阻',
        shijian:'2019年7月10日10:12:26',
        biaozhun:'5x20mm,±0.1',
        jiance:'赵元乐',
        process: 40,
        status: '启用',
    },
    {
        id: 'ZB1200019',
        sp:'轮胎',
        shijian:'2019年7月11日13:12:37',
        biaozhun:'5x20mm,±0.2',
        jiance:'王可媛',
        process: 30,
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
            title: '指标编号',
            dataIndex: 'id',
        },
        {
            title: '物料名称',
            dataIndex: 'sp',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '生产完成时间',
            dataIndex: 'shijian',
        },
        {
            title: '指标合格标准',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '检测员',
            dataIndex: 'jiance',
        },
        {
            title: '指标检测进度',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="生产指标设置"
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
