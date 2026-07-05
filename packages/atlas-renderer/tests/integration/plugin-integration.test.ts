import { RendererPluginIntegration } from '@atlas/atlas-renderer';

const plugin = new RendererPluginIntegration().createPlugin();
const rendererPluginName: string = plugin.descriptor.name;

export { rendererPluginName };
