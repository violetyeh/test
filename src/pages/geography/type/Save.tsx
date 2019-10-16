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
                title="编辑广告播放信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="数据编号" >
                        {getFieldDecorator('id', {
                        initialValue: currentItem.id,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="time" label="广告播放时间" >
                        {getFieldDecorator('time', {
                        initialValue: currentItem.time,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="type" label="电视名称" >
                        {getFieldDecorator('type', {
                        initialValue: currentItem.type,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="creator" label="电视内容" >
                        {getFieldDecorator('creator', {
                        initialValue: currentItem.creator,
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
