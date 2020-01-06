import { UserExample } from './user.example';
const examples:any = {
  users: UserExample
}
export const resExample = (md: string, key: string, type: string) => {
  if (!md || !key || !type || !examples[md] || !examples[md][key] || !examples[md][key][type]) return {};
  return examples[md][key][type];
}