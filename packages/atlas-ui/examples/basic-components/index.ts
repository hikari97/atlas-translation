import { createButton, createInput, UIComponentRegistry } from '@atlas/atlas-ui';

const registry = new UIComponentRegistry();
registry.register(createButton('atlas.example.save', 'Save'));
registry.register(createInput('atlas.example.search', 'Search', 'Search pages'));

export { registry };
