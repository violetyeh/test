import { Component } from "react";
import { Form, Modal, Input, message, Radio } from "antd";
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
                title="编辑影像图像信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="zhonglei" label="编号" >
                        {getFieldDecorator('zhonglei', {
                            initialValue: currentItem.zhonglei,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="id" label="图像类别" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    
                    <Form.Item key="songjian" label="当前评估人" >
                        {getFieldDecorator('songjian', {
                            initialValue: currentItem.songjian,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="shengchan" label="当前病人" >
                        {getFieldDecorator('shengchan', {
                            initialValue: currentItem.shengchan,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="chandi" label="评估结果" >
                        {getFieldDecorator('chandi', {
                            initialValue: currentItem.chandi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="riqi" label="开始时间" >
                        {getFieldDecorator('riqi', {
                            initialValue: currentItem.riqi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mingcheng" label="当前模式" >
                        {getFieldDecorator('mingcheng', {
                            initialValue: currentItem.mingcheng,
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
