import * as React from "react";

const FolderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height="16px"
    width="16px"
    fill="currentColor"
    {...props}
  >
    <path d="M464,128H272L224,80H48A48,48,0,0,0,0,128V416a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V176A48,48,0,0,0,464,128ZM464,416H48V128H209.38l48,48H464Z" />
  </svg>
);

export default FolderIcon;
