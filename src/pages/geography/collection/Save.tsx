import { Component } from "react";
import { Form, Modal, Input, message } from "antd";
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
                title="编辑实体机状态信息"
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
                    <Form.Item key="fl" label="MAC地址" >
                        {getFieldDecorator('fl', {
                            initialValue: currentItem.fl,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="IP地址" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="ma" label="子网" >
                        {getFieldDecorator('ma', {
                            initialValue: currentItem.ma,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="cpu" label="CPU(%)" >
                        {getFieldDecorator('cpu', {
                            initialValue: currentItem.cpu,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="nc" label="内存(%)" >
                        {getFieldDecorator('nc', {
                            initialValue: currentItem.nc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="io" label="I/O繁忙度(%)" >
                        {getFieldDecorator('io', {
                            initialValue: currentItem.io,
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
