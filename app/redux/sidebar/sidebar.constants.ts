import { ENV_KEYS } from "@/app/lib/constants/constants";

export const SIDEBAR_URLS = {
  SIDEBAR_LIST: `${ENV_KEYS.BASE_API_URL}/api/v1/sidebar/`,
};

export const ACTIVE_KEY_OR_STATE = {
  ESCAPE: "Escape",
  ENTER: "Enter",
  BLUR: "blur",
  FOCUS: "focus",
  CLICK: "click",
  KEYBOARD: "keyboard",
  MOUSE: "mouse",
  TOUCH: "touch",
  SCROLL: "scroll",
  RESIZE: "resize",
  DRAG: "drag",
  DROP: "drop",
};

export const SIDEBAR_NODES_DATA = [
  {
    id: "1",
    name: "english",
    isFolder: true,
    children: [
      {
        id: "11",
        name: "chapter 1",
        isFolder: true,
        children: [
          {
            id: "112",
            name: "topic 1.txt",
            isFolder: false,
            content: "Lorep Ipsum data",
          },
          {
            id: "113",
            name: "topic 2.doc",
            isFolder: false,
            content: "Lorep Ipsum data  2",
          },
          {
            id: "114",
            name: "topic 3.code",
            isFolder: false,
            content: "Lorep Ipsum data  3",
          },
          {
            id: "115",
            name: "topic 4.pdf",
            isFolder: false,
            content: "Lorep Ipsum data  4",
          },
          {
            id: "116",
            name: "topic 5.xlsx",
            isFolder: false,
            content: "Lorep Ipsum data  5",
          },
        ],
      },
    ],
  },
  {
    id: "12",
    name: "science",
    isFolder: true,
  },
  {
    id: "2",
    name: "sst",
    isFolder: true,
    children: [
      {
        id: "21",
        name: "chapter 1",
        isFolder: true,
        children: [
          {
            id: "211",
            name: "topic 1.txt",
            isFolder: false,
            content: "Lorep Ipsum data  4",
          },
        ],
      },
      {
        id: "22",
        name: "chapter 2",
        isFolder: true,
        children: [
          {
            id: "221",
            name: "topic 1.txt",
            isFolder: false,
            content: "Lorep Ipsum data  5",
          },
        ],
      },
    ],
  },
];
