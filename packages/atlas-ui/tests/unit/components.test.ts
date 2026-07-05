import { AccessibilityValidator, createButton, createInput, UIComponentRegistry } from '@atlas/atlas-ui';

const registry = new UIComponentRegistry();
const button = createButton('atlas.ui.test.button', 'Run OCR');
const input = createInput('atlas.ui.test.input', 'Search', 'Find text');

registry.register(button);
registry.register(input);

const componentCount: number = registry.list().length;
const accessibilityValid: boolean = new AccessibilityValidator().validate(button).valid;

export { accessibilityValid, componentCount };
