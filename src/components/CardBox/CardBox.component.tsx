import React from 'react';
import { Card, CardImgProps, CardProps } from 'react-bootstrap';

import type { FC, ReactNode } from 'react';
import './CardBox.component.scss';

export type CardBoxProps = CardProps & {
  children: ReactNode;
  title?: string;
  variant?: CardImgProps['variant'];
  img?: string;
};

const CardBox: FC<CardBoxProps> = ({
  title,
  children,
  variant = 'top',
  img,
  ...props
}) => {
  return (
    <Card {...props} className='mb-2'>
      {img && <Card.Img variant={variant} src='holder.js/100px180' />}
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        <Card.Text>{children}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardBox;
