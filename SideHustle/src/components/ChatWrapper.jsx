import { useParams } from 'react-router-dom';
import ChatBox from './ChatBox';

export default function ChatWrapper() {
  const { productId, receiverEmail } = useParams();
  const senderEmail = localStorage.getItem('userEmail'); // Or use user context

  return (
    <ChatBox
      productId={productId}
      senderId={senderEmail}
      receiverId={receiverEmail}
    />
  );
}