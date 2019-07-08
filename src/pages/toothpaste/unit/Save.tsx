import { Component } from 'react';
import { Form, Modal, Input, message } from 'antd';
import React from 'react';
import styles from './style.less';

interface SaveProps {
  handleSaveVisible: () => void;
}

interface SaveState {}
class Save extends Component<SaveProps, SaveState> {
  handleSave = () => {
    message.error('设备已离线，无法保存数据');
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const {
      form: { getFieldDecorator },
      handleSaveVisible,
    } = this.props;
    return (
      <Modal
        title="编辑单位"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="name" label="单位名称">
            {getFieldDecorator('name', {})(<Input placeholder="请输入单位名称" />)}
          </Form.Item>
          <Form.Item key="experis" label="表达式">
            {getFieldDecorator('experis', {})(<Input placeholder="请输入表达式" />)}
          </Form.Item>
          <Form.Item key="remark" label="备注">
            {getFieldDecorator('remark', {})(<Input.TextArea rows={2} />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<SaveProps>()(Save);
