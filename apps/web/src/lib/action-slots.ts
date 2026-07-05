export type ActionSlotVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ActionSlotColorScheme = 'blue' | 'gray' | 'red' | 'green' | 'orange';

export interface ActionSlot {
  readonly id: string;
  readonly label: string;
  readonly onClick: () => void | Promise<void>;
  readonly variant?: ActionSlotVariant;
  readonly colorScheme?: ActionSlotColorScheme;
  readonly disabled?: boolean;
  readonly loading?: boolean;
}

export const executeActionSlot = async (action: ActionSlot): Promise<void> => {
  if (action.disabled || action.loading) return;
  await action.onClick();
};
