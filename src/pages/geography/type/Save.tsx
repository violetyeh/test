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
                title="综合监察信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="办件号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zhonglei" label="事项名称" >
                        {getFieldDecorator('zhonglei', {
                            initialValue: currentItem.zhonglei,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mingcheng" label="所属部门" >
                        {getFieldDecorator('mingcheng', {
                            initialValue: currentItem.mingcheng,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="songjian" label="意见" >
                        {getFieldDecorator('songjian', {
                            initialValue: currentItem.songjian,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="shengchan" label="监察负责人" >
                        {getFieldDecorator('shengchan', {
                            initialValue: currentItem.shengchan,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="chandi" label="异常状态" >
                        {getFieldDecorator('chandi', {
                            initialValue: currentItem.chandi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="riqi" label="督办日期" >
                        {getFieldDecorator('riqi', {
                            initialValue: currentItem.riqi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="status" label="督办状态" >
                        {getFieldDecorator('status', {
                            initialValue: currentItem.status,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">已督办</Radio.Button>
                                <Radio.Button value="b">未督办</Radio.Button>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
