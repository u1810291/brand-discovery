import { SVGProps } from 'react'

export const CheckMarkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width={49} height={48} fill="none">
    <path
      stroke="#18BC9C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={4}
      d="M36.5 42h-24c-4.4 0-8-3.6-8-8V14c0-4.4 3.6-8 8-8h24c4.4 0 8 3.6 8 8v20c0 4.4-3.6 8-8 8Z"
    />
    <path
      stroke="#18BC9C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={4}
      d="m12.5 16 9.2 9.2c1.6 1.6 4 1.6 5.6 0l9.2-9.2"
    />
  </svg>
)
