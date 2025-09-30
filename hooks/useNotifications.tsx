import { useAuthStore } from '@/utils/authStore';
import { useQuery } from '@tanstack/react-query';

const BASE_TOPIC_URL = 'https://testnet.mirrornode.hedera.com/api/v1/topics/';

export interface Notification {
  type: string;
  message_content: string;
  timestamp: number;
  consensus_timestamp?: string;
}

export interface TopicMessage {
  consensus_timestamp: string;
  message: string;
  payer_account_id: string;
  running_hash: string;
  running_hash_version: number;
  sequence_number: number;
  topic_id: string;
  chunk_info?: {
    initial_transaction_id: {
      account_id: string;
      nonce: number;
      scheduled: boolean;
      transaction_valid_start: string;
    };
    number: number;
    total: number;
  };
}

export const useNotifications = () => {
  const { topicId } = useAuthStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ['notifications', topicId],
    queryFn: () => getNotifications(topicId),
    enabled: !!topicId,
  });

  return { data, isLoading, error };
};

async function getNotifications(topicID: string | undefined): Promise<Notification[]> {
  if (!topicID) {
    throw new Error('Topic ID is undefined: at getNotifications');
  }

  const response = await fetch(`${BASE_TOPIC_URL}${topicID}/messages`);
  const data = await response.json();

  if (!data.messages || !Array.isArray(data.messages)) {
    return [];
  }
  const notifications: Notification[] = data.messages
    .map((topicMessage: TopicMessage) => {
      try {
        const decodedMessage = atob(topicMessage.message);
        const notification: Notification = JSON.parse(decodedMessage);

        notification.consensus_timestamp = topicMessage.consensus_timestamp;
        return notification;
      } catch (error) {
        console.error('Error decoding notification message:', error);
        return null;
      }
    })
    .filter(
      (notification: Notification | null): notification is Notification => notification !== null
    );

  return notifications;
}
