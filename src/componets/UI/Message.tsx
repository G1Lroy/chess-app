import  { FC } from "react";
import './../../assets/styles/Message.css'

interface MessageProps {
  text: string;
}

const Message: FC<MessageProps> = ({ text }) => {
  return <div className="message">{text}</div>;
};

export default Message;
