export interface SystemNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  source: 'socket' | 'storage' | 'security' | 'worker';
  timestamp: string;
  read: boolean;
}

export class NotificationEngine {
  private static notifications: SystemNotification[] = [
    {
      id: 'notif-1',
      type: 'info',
      title: 'DataStack Engine Booted',
      message: 'Ingestion server listening on port 4000. CSV buffer worker initialized.',
      source: 'worker',
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: 'notif-2',
      type: 'success',
      title: 'Python SDK Ready',
      message: 'pip installable datastack_sdk package prepared in /sdk-python/',
      source: 'socket',
      timestamp: new Date().toISOString(),
      read: false,
    },
  ];

  public static push(notif: Omit<SystemNotification, 'id' | 'timestamp' | 'read'>): SystemNotification {
    const item: SystemNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...notif,
    };
    this.notifications.unshift(item);
    if (this.notifications.length > 100) {
      this.notifications.pop();
    }
    return item;
  }

  public static list(): SystemNotification[] {
    return [...this.notifications];
  }

  public static markAsRead(id: string): void {
    const item = this.notifications.find((n) => n.id === id);
    if (item) item.read = true;
  }

  public static clearAll(): void {
    this.notifications = [];
  }
}

export default NotificationEngine;
