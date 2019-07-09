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
        title="编辑广告投放营销信息"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}

      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="id" label="广告投放类别" >
            {getFieldDecorator('id', {
              initialValue: currentItem.id,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="date" label="行业分类" >
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
          <Form.Item key="column" label="综合门户" >
            {getFieldDecorator('column', {
              initialValue: currentItem.column,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="status" label="价格区间" >
            {getFieldDecorator('status', {
              initialValue: currentItem.status,
            })(
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">20元-100元</Radio.Button>
                <Radio.Button value="b">100元-1000元</Radio.Button>
                <Radio.Button value="c">1000元-2000元</Radio.Button>
                <Radio.Button value="d">2000元-10000元</Radio.Button>
                <Radio.Button value="e">10000元以上</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Form.create<SaveProps>()(Save);
