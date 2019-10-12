import { Component } from "react";
import { Form, Modal, Input, message, DatePicker } from "antd";
import { ForcfomponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";

interface SaveProps extends ForcfomponentProps {
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
                title="编辑无人机信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="序号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jx" label="无人机名称" >
                        {getFieldDecorator('jx', {
                            initialValue: currentItem.jx,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="cf" label="型号" >
                        {getFieldDecorator('cf', {
                            initialValue: currentItem.cf,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="dw" label="监理类型" >
                        {getFieldDecorator('dw', {
                            initialValue: currentItem.dw,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jg" label="监理信息数量" >
                        {getFieldDecorator('jg', {
                            initialValue: currentItem.jg,
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
