import React, { FC } from "react";

interface MessageProps {
  text: string;
}

const Message: FC<MessageProps> = ({ text }) => {
  return <div className="message">{text}</div>;
};

export default Message;
