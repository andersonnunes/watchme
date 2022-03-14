import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";
import { Icon } from "./Icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string
  iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  selected: boolean
}

export function Button({ iconName, title, selected, ...rest }: ButtonProps) {
  return (
    <button type="button" {...(selected && { className: 'selected' })} {...rest}>
      <Icon name={iconName} color={selected ? '#fae800' : '#fbfbfb'} />
      {title}
    </button>
  )
}
