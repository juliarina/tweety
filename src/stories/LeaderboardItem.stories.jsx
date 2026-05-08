import LeaderboardItem from '../components/LeaderboardItem';

export default {
  title: 'LeaderboardItem',
  component: LeaderboardItem,
};

const TemplateStory = (args) => <LeaderboardItem {...args} />

export const Default = TemplateStory.bind({});

Default.args = {
  user: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John%20Doe&background=random'
  },
  score: 10,
  userId: 'users-1'
};