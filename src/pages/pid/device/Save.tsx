import { Component } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import React from 'react';
import styles from '../style.less';

interface SaveProps {
  handleSaveVisible: () => void;
}

interface SaveState { }
class Save extends Component<SaveProps, SaveState> {
  handleSave = () => {
    message.error('设备已离线，无法保存数据');
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const { handleSaveVisible } = this.props;
    return (
      <Modal
        title="增加加工设备"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="name" label="设备编号">
            <Input placeholder="请输入设备编号" />
          </Form.Item>
          <Form.Item key="name" label="生产厂家">
            <Input placeholder="请输入生产厂家" />
          </Form.Item>
          <Form.Item key="name" label="设备名称">
            <Input placeholder="请输入设备名称" />
          </Form.Item>
          <Form.Item key="model" label="设备类型">
            <Radio.Group defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">全自动</Radio.Button>
              <Radio.Button value="b">智能设备</Radio.Button>
              <Radio.Button value="c">半智能设备</Radio.Button>
              <Radio.Button value="d">手动控制</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item key="experis" label="加工物类别">
            <Input placeholder="请输入加工物类别" />
          </Form.Item>
          <Form.Item key="remark" label="备注">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Save;
