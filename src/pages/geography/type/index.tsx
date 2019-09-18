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
        id: 'SER1292',
        fenlei: 'FDBZ规划编制',
        pinlv: 80,
        yaosu: '低压供电半径市中心区不大于100米，其它地区不大于250米；',
        fenceng: '孟凡',
        state: '启用',
       
    },
    {
        id: 'SER1271',
        fenlei: 'FDBZ014规划编制',
        pinlv: 32,
        yaosu: '不应设在地势低洼和可能积水的场所；',
        fenceng: '王石',
        state: '启用',
       
    },
    {
        id: 'SER1228',
        fenlei: 'FDBZ023规划编制',
        pinlv: 65,
        yaosu: '应满足现行国家规程、规范、规定的防火间距',
        fenceng: '钱萌',
        state: '启用',
       
    },
    {
        id: 'SER1264',
        fenlei: 'FDBZ47规划编制',
        pinlv: 42,
        yaosu: '站外应有设备运输通道且应有不少于两个抢修车辆停放位置；',
        fenceng: '张琼凡',
        state: '启用',
       
    },
    {
        id: 'SER1278',
        fenlei: 'FDBZ36规划编制',
        pinlv: 56,
        yaosu: '设备间下应设电缆夹层；',
        fenceng: '孟思三',
        state: '启用',
       
    },
    {
        id: 'SER1226',
        fenlei: 'FDBZ12规划编制',
        pinlv: 12,
        yaosu: '抗震设防烈度按本地设防烈度设计；',
        fenceng: '王思',
        state: '启用',
       
    },
    {
        id: 'SER1224',
        fenlei: 'FDBZ09规划编制',
        pinlv: 26,
        yaosu: '建筑类别三类(设计使用年限50年)； ',
        fenceng: '陈思凡',
        state: '启用',
       
    },
    {
        id: 'SER1223',
        fenlei: 'FDBZ05规划编制',
        pinlv: 33,
        yaosu: '地下电缆夹层防水等级2级； ',
        fenceng: '张凡',
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
            title: '规划编制名称',
            dataIndex: 'fenlei',
        },
        {
            title: '设计进度',
            dataIndex: 'pinlv',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },
        {
            title: '规划编制要素',
            dataIndex: 'yaosu',
        },
        {
            title: '负责人',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
        },
        // {
        //     title: '几何类型',
        //     dataIndex: 'leixing',
        // },

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
                title="规划编制内容"
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
