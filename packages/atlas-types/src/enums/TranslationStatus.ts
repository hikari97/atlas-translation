/**
 * Lifecycle states for translated text.
 */
export enum TranslationStatus {
  Draft = 'draft',
  MachineTranslated = 'machine-translated',
  HumanEdited = 'human-edited',
  Reviewed = 'reviewed',
  Approved = 'approved',
  Exported = 'exported'
}
