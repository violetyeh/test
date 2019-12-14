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
                title="编辑面状居民地"
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
                    <Form.Item key="pinlv" label="建筑名称" >
                        {getFieldDecorator('pinlv', {
                            initialValue: currentItem.pinlv,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="date" label="建筑高度（m）" >
                        {getFieldDecorator('date', {
                            initialValue: currentItem.date,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="model" label="建筑用途" >
                        {getFieldDecorator('model', {
                            initialValue: currentItem.model,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="type" label="建筑位置" >
                        {getFieldDecorator('type', {
                            initialValue: currentItem.type,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="remark" label="占比（%）" >
                        {getFieldDecorator('remark', {
                            initialValue: currentItem.remark,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
