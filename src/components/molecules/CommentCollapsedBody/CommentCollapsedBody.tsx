import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './index.scss';

interface CommentCollapsedBodyProps {
  text: string;
}

export const CommentCollapsedBody: React.FC<CommentCollapsedBodyProps> = ({ text }) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const [textHeight, setTextHeight] = useState<number>(0);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.scrollHeight);
    }
  }, [text]);

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };

  const collapsedStyle = {
    height: isCollapsed ? '20px' : `${textHeight}px`,
  };

  return (
    <div className="collapsed_body">
      <div ref={textRef} className="collapsed_body__text" style={collapsedStyle}>
        {text}
      </div>
      <Button
        onClick={toggleCollapsed}
        className="collapsed_body__bnt"
        type="link"
        icon={isCollapsed ? <DownOutlined /> : <UpOutlined />}
      >
        {isCollapsed ? 'Развернуть' : 'Свернуть'}
      </Button>
    </div>
  );
};
