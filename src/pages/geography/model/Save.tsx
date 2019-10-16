import { Component } from "react";
import { Form, Modal, Input, message, DatePicker, Radio } from "antd";
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
                title="编辑广告宣传频道信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="宣传渠道" >
                        {getFieldDecorator('id', {
                        initialValue: currentItem.id,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="creator" label="类型" >
                        {getFieldDecorator('creator', {
                        initialValue: currentItem.creator,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="project" label="广告商品名称" >
                        {getFieldDecorator('project', {
                        initialValue: currentItem.project,
                        })(
                        <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="status" label="渠道开关" >
                        {getFieldDecorator('status', {
                        initialValue: currentItem.status,
                        })(
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="a">开</Radio.Button>
                            <Radio.Button value="b">关</Radio.Button>
                        </Radio.Group>,
                        )}
                    </Form.Item>
                    <Form.Item key="date" label="频道负责人" >
                        {getFieldDecorator('date', {
                            initialValue: currentItem.date,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="process" label="发布进度(%)" >
                        {getFieldDecorator('process', {
                            initialValue: currentItem.process,
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
