import { FontAwesome } from '@expo/vector-icons';

type IconProps = {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color?: string;
};

const Icon: React.FC<IconProps> = ({ name, color = 'white' }) => {
  return <FontAwesome name={name} size={30} color={color} />;
};

export default Icon;
