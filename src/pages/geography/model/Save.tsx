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
                title="编辑分析设置"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="分析编号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="sp" label="分析食品" >
                        {getFieldDecorator('sp', {
                            initialValue: currentItem.sp,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="shijian" label="分析时间" >
                        {getFieldDecorator('shijian', {
                            initialValue: currentItem.shijian,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="biaozhun" label="合格标准" >
                        {getFieldDecorator('biaozhun', {
                            initialValue: currentItem.biaozhun,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jiance" label="分析员" >
                        {getFieldDecorator('jiance', {
                            initialValue: currentItem.jiance,
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
