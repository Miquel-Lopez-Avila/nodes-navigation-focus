export const addEvent = (element: HTMLElement | Window | any, event: string, callback: any) => {
  if (element) element[event] = callback;
};
