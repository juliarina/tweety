import React from 'react';
import LoginInput from '../components/LoginInput';

export default {
  title: 'LoginInput',
  component: LoginInput,
};

const TemplateStory = (args) => <LoginInput {...args} />;

export const Default = TemplateStory.bind({});

Default.args = {
  login: () => alert('login'),
};