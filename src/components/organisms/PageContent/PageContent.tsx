import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import './index.scss';

const PageContent: React.FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({
  className,
  ...props
}) => <div {...props} className={`page_content ${className ?? ''}`} />;

export default PageContent;
