import factory from './factory';
import { IConfiguration } from 'navigator/utils/interfaces';

const useNavigation = ({ parent, ...rest }: IConfiguration) => {
  const { self, configuration } = factory(parent, rest);

  return [self, configuration];
};

export default useNavigation;
