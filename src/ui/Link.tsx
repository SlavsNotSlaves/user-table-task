import React from 'react';

interface LinkProps {
  domain: string;
}

const Link: React.FC<LinkProps> = ({ domain }) => {
  if (!domain) return null;
  return (
    <a
      href={`https://${domain}`}
      target="_blank"
      rel="noopener noreferrer"
      className="font-plex font-medium underline"
      style={{
        color: '#005CB2',
        fontSize: 13,
        lineHeight: '20px',
        letterSpacing: 0,
        verticalAlign: 'middle',
        transition: 'color 0.15s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.color = '#003A75')}
      onMouseOut={(e) => (e.currentTarget.style.color = '#005CB2')}
    >
      {domain}
    </a>
  );
};

export default Link;
