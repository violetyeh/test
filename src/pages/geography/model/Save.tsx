import { Component } from "react";
import { Form, Modal, Input, message, DatePicker } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";

interface SaveProps extends FormComponentProps {
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
                title="编辑客服信息"
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
                    <Form.Item key="pinlv" label="客服昵称" >
                        {getFieldDecorator('pinlv', {
                            initialValue: currentItem.pinlv,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="date" label="服务类型" >
                        {getFieldDecorator('date', {
                            initialValue: currentItem.date,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="model" label="回复时间间隔（秒）" >
                        {getFieldDecorator('model', {
                            initialValue: currentItem.model,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="type" label="提示消息设置" >
                        {getFieldDecorator('type', {
                            initialValue: currentItem.type,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="process" label="服务效率（%）" >
                        {getFieldDecorator('process', {
                            initialValue: currentItem.process,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="remark" label="备注信息" >
                        {getFieldDecorator('remark', {
                            initialValue: currentItem.remark,
                        })(
                            <Input.TextArea rows={2} />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
