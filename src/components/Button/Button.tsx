import React from 'react';
import clsx from 'clsx';

import type { FC, ReactNode } from 'react';
import './Button.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  type?: 'primary' | 'success' | 'warning';
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  type = 'primary',
  disabled = false,
  children,
  ...props
}) => {
  const classes = clsx('button', type, { disabled });

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
