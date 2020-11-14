import { nanoid } from 'nanoid';
import chance from '../../../library/chance';

export default () => ({
  id: nanoid(),
  email: chance.email(),
  firstName: chance.name(),
  lastName: chance.name(),
  state: chance.state(),
  petExperience: 'Y',
});
