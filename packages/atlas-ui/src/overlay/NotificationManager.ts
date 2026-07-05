import type { ID } from '@atlas/atlas-types';

export enum NotificationTone {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export interface Notification {
  readonly id: ID<'notification'>;
  readonly message: string;
  readonly tone: NotificationTone;
}

export class NotificationManager {
  private readonly queue: Notification[] = [];

  public push(notification: Notification): void {
    this.queue.push(notification);
  }

  public dismiss(id: ID<'notification'>): boolean {
    const index = this.queue.findIndex((notification) => notification.id === id);
    if (index < 0) {
      return false;
    }
    this.queue.splice(index, 1);
    return true;
  }

  public list(): readonly Notification[] {
    return this.queue.slice();
  }
}
