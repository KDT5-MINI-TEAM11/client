import { Button, Input, Form, Space, Select } from 'antd';
import React, { useState } from 'react'

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const { Option } = Select;

export default function SingUp() {

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select placeholder="-선택-" style={{ width: 100 }}>
        <Option value="010">010</Option>
        <Option value="011">011</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="이름"
        name="username"
        rules={[{ required: true, message: '이름을 입력해주세요.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="E-Mail"
        name="e-mail"
        rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      
      <Form.Item
        label="비밀번호 확인"
        name="confirm_password"
        dependencies={['password']}
        hasFeedback
        rules={[{ required: true, message: '비밀번호를 입력해주세요' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The new password that you entered do not match!'));
          },
        }),
      ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="연락처"
        name="phone"
        rules={[{ required: true, message: '연락처를 입력해주세요.' }]}
      >
       <Space>
       {prefixSelector}
        <Input />
       </Space>
      </Form.Item>

      <Form.Item
        name="position"
        label="직급"
        rules={[{ required: true, message: '직급을 선택해주세요.' }]}
      >
        <Select placeholder="-직급-" style={{ width: 100 }}>
          <Option value="">사원</Option>
          <Option value="">대리</Option>
          <Option value="">과장</Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
