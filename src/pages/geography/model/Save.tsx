import { Component } from "react";
import { Form, Modal, Input, message, DatePicker, Radio } from "antd";
import { FordwomponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";

interface SaveProps extends FordwomponentProps {
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
                title="编辑备份任务"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="lx" label="数据库类型" >
                        {getFieldDecorator('lx', {
                            initialValue: currentItem.lx,
                        })(
                                <Radio.Group >
                                  <Radio value={1}>Oracle</Radio>
                                  <Radio value={2}>Sybase</Radio>
                                </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="主站IP" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="ren" label="备份操作人" >
                        {getFieldDecorator('ren', {
                            initialValue: currentItem.ren,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="riqi" label="备份日期" >
                        {getFieldDecorator('riqi', {
                            initialValue: currentItem.riqi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="wz" label="备份类型" >
                        {getFieldDecorator('wz', {
                            initialValue: currentItem.wz,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="ml" label="备份存放路径" >
                        {getFieldDecorator('ml', {
                            initialValue: currentItem.ml,
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
