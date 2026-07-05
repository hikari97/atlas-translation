import { UIPluginIntegration } from '@atlas/atlas-ui';

const plugin = new UIPluginIntegration().createPlugin();
const uiPluginName: string = plugin.descriptor.name;

export { uiPluginName };
