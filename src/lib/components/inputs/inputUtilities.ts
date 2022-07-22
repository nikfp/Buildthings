export function messageJoin(messages: string[]) {
  if(messages.length === 1) return messages[0];
  return messages.join(', ');
}