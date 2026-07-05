import { createDialog, NotificationManager, NotificationTone } from '@atlas/atlas-ui';
import type { ID } from '@atlas/atlas-types';

const dialog = createDialog('atlas.ui.test.dialog', 'Confirm', true);
const notifications = new NotificationManager();
notifications.push({
  id: 'notification-1' as ID<'notification'>,
  message: 'Saved',
  tone: NotificationTone.Success
});

const dialogOpen = dialog.props.open === true;
const notificationCount: number = notifications.list().length;

export { dialogOpen, notificationCount };
