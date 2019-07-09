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
        title="编辑广告投放服务信息"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}

      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="id" label="媒体分类" >
            {getFieldDecorator('id', {
              initialValue: currentItem.id,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="date" label="广告需求（浏览人数：万）" >
            {getFieldDecorator('date', {
              initialValue: currentItem.date,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="creator" label="广告定位" >
            {getFieldDecorator('creator', {
              initialValue: currentItem.creator,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="column" label="精准人群定位" >
            {getFieldDecorator('column', {
              initialValue: currentItem.column,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="status" label="定义价格（万元）" >
            {getFieldDecorator('status', {
              initialValue: currentItem.status,
            })(
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">10万以内</Radio.Button>
                <Radio.Button value="b">10万-100万</Radio.Button>
                <Radio.Button value="c">100万-500万</Radio.Button>
                <Radio.Button value="d">500万-1000万</Radio.Button>
                <Radio.Button value="e">1000以上</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<SaveProps>()(Save);
