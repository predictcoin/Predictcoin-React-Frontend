import { FC } from "react"

const IPOIcon: FC = (props) => (
  <svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={26} height={26} rx={13} fill="#fff" fillOpacity={0.2} />
    <path
      d="M13 17.5a5.84 5.84 0 0 1-5.833-5.834A5.84 5.84 0 0 1 13 5.833a5.84 5.84 0 0 1 5.833 5.833A5.84 5.84 0 0 1 13 17.5Zm0-10.667a4.837 4.837 0 0 0-4.834 4.833A4.837 4.837 0 0 0 13 16.5a4.837 4.837 0 0 0 4.833-4.834A4.837 4.837 0 0 0 13 6.833ZM17 20.167H9a.504.504 0 0 1-.5-.5c0-.273.227-.5.5-.5h8c.273 0 .5.227.5.5s-.227.5-.5.5Z"
      fill="#fff"
    />
  </svg>
)

export default IPOIcon
