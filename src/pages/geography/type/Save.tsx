import { Component } from "react";
import { Form, Modal, Input, message, Radio } from "antd";
import { FordxomponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";

interface SaveProps extends FordxomponentProps {
    dispatch?: Dispatch<any>;
    handleSaveVisible: () => void;
    currentItem: {};
}

interface SaveState {
}
class Save extends Component<SaveProps, SaveState>{

    state: SaveState = {
        roleList: [],
    }

    handleSave = () => {
        message.success('保存成功');
    }

    render() {

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const { form: { getFieldDecorator }, handleSaveVisible, currentItem } = this.props;
        console.log(currentItem, 'item');
        return (
            <Modal
                title="编辑备份恢复文件"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="ID" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="lx" label="类型" >
                        {getFieldDecorator('lx', {
                            initialValue: currentItem.lx,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="dx" label="大小" >
                        {getFieldDecorator('dx', {
                            initialValue: currentItem.dx,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="rq" label="日期" >
                        {getFieldDecorator('rq', {
                            initialValue: currentItem.rq,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jc" label="快速检测文件" >
                        {getFieldDecorator('jc', {
                            initialValue: currentItem.jc,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">全检通过</Radio.Button>
                                <Radio.Button value="b">快检通过</Radio.Button>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
