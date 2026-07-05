import { InteractionManager, InteractionType } from '@atlas/atlas-interaction';
import type { ID } from '@atlas/atlas-types';

const manager = new InteractionManager();
const session = manager.start('interaction-1' as ID<'interaction'>, InteractionType.Pointer);
const completed = manager.complete(session.state.id);

const foundationPhase = completed?.phase;

export { foundationPhase };
