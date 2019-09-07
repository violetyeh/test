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
                title="编辑报班车辆"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="线路" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zhi" label="报班车辆" >
                        {getFieldDecorator('zhi', {
                            initialValue: currentItem.zhi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="dw" label="驾驶员" >
                        {getFieldDecorator('dw', {
                            initialValue: currentItem.dw,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="cf" label="准载座位" >
                        {getFieldDecorator('cf', {
                            initialValue: currentItem.cf,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jc" label="免票儿童" >
                        {getFieldDecorator('jc', {
                            initialValue: currentItem.jc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>

                    
                    <Form.Item key="jg" label="出站时间" >
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
