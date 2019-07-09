import { Component } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import React from 'react';
import styles from '../style.less';
import { FormComponentProps } from 'antd/lib/form';

interface SaveProps extends FormComponentProps {
  handleSaveVisible: () => void;
  currentItem: {},
}

interface SaveState { }
class Save extends Component<SaveProps, SaveState> {
  handleSave = () => {
    message.error('系统处于离线状态，无法进行此操作');
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const { form: { getFieldDecorator }, handleSaveVisible, currentItem } = this.props;
    return (
      <Modal
        title="编辑广告投放信息"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}

      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="id" label="广告类型" >
            {getFieldDecorator('id', {
              initialValue: currentItem.id,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="name" label="名称" >
            {getFieldDecorator('name', {
              initialValue: currentItem.name,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="type" label="版本" >
            {getFieldDecorator('type', {
              initialValue: currentItem.type,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="date" label="上级分类" >
            {getFieldDecorator('date', {
              initialValue: currentItem.date,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="creator" label="下级分类" >
            {getFieldDecorator('creator', {
              initialValue: currentItem.creator,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="status" label="定义长度（秒）" >
            {getFieldDecorator('status', {
              initialValue: currentItem.status,
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
