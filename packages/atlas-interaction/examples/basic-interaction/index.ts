import { InteractionManager, InteractionType } from '@atlas/atlas-interaction';
import type { ID } from '@atlas/atlas-types';

const interactions = new InteractionManager();
const interactionSession = interactions.start('atlas.example.interaction' as ID<'interaction'>, InteractionType.Pointer);

export { interactionSession };
