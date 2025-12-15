import { ENV_KEYS } from '@/app/lib/constants/constants';

export const SIDEBAR_URLS = {
  SIDEBAR_LIST: `${ENV_KEYS.BASE_API_URL}/api/v1/sidebar/`,
};

export const ACTIVE_KEY_OR_STATE = {
  ESCAPE: 'Escape',
  ENTER: 'Enter',
  BLUR: 'blur',
  FOCUS: 'focus',
  CLICK: 'click',
  KEYBOARD: 'keyboard',
  MOUSE: 'mouse',
  TOUCH: 'touch',
  SCROLL: 'scroll',
  RESIZE: 'resize',
  DRAG: 'drag',
  DROP: 'drop',
};

export const SIDEBAR_NODES_DATA = [
  {
    id: '1',
    name: "english",
    isFolder: true,
    children: [
      {
        id: '11',
        name: "chapter 1",
        isFolder: true,
        children: [
          {
            id: '112',
            name: "topic 1",
            isFolder: false,
          },
          {
            id: '113',
            name: "topic 2",
            isFolder: false,
          },
          {
            id: '114',
            name: "topic 3",
            isFolder: false,
          },
        ]
      },
    ]
  },
  {
    id: '12',
    name: "science",
    isFolder: true,
  },
  {
    id: '2',
    name: "sst",
    isFolder: true,
    children: [
      {
        id: '21',
        name: "chapter 1",
        isFolder: true,
        children: [
          {
            id: '211',
            name: "topic 1",
            isFolder: false,
          },
        ]
      },
      {
        id: '22',
        name: "chapter 2",
        isFolder: true,
        children: [
          {
            id: '221',
            name: "topic 1",
            isFolder: false,
          },
        ]
      },
    ]
  },
];
