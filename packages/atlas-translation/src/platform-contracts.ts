import type { JsonObject, Timestamp } from '@atlas/atlas-types';
import type { AdapterDescriptor, AdapterEvent, AdapterProgress, AdapterStatistics, IntegrationSession } from './adapters';

export type WorkflowProvider = AdapterDescriptor;
export type WorkflowManager = AdapterDescriptor;
export type WorkflowPipeline = AdapterDescriptor;
export type WorkflowOptions = AdapterDescriptor;
export type WorkflowSession = IntegrationSession;
export type WorkflowStatistics = AdapterStatistics;
export type WorkflowDesigner = AdapterDescriptor;
export type WorkflowScheduler = AdapterDescriptor;
export type WorkflowMarketplace = AdapterDescriptor;
export type WorkflowApproval = AdapterDescriptor;
export type WorkflowVersioning = AdapterDescriptor;
export type WorkflowReplay = AdapterDescriptor;
export type WorkflowAnalytics = AdapterDescriptor;
export type WorkflowPolicy = AdapterDescriptor;
export type WorkflowOptimization = AdapterDescriptor;
export type WorkflowSimulation = AdapterDescriptor;
export type WorkflowRuntime = AdapterDescriptor;

export type ExtensionProvider = AdapterDescriptor;
export type ExtensionManager = AdapterDescriptor;
export type ExtensionRuntime = AdapterDescriptor;
export type ExtensionSandbox = AdapterDescriptor;
export type ExtensionPermissions = AdapterDescriptor;
export type ExtensionEvent = AdapterEvent;
export type ExtensionManifest = AdapterDescriptor;
export type ExtensionDependencyResolver = AdapterDescriptor;
export type ExtensionPackage = AdapterDescriptor;
export type ExtensionInstaller = AdapterDescriptor;
export type ExtensionUpdater = AdapterDescriptor;
export type ExtensionSignature = AdapterDescriptor;
export type ExtensionMarketplace = AdapterDescriptor;
export type ExtensionPolicy = AdapterDescriptor;
export type ExtensionTelemetry = AdapterDescriptor;
export type ExtensionDiagnostics = AdapterDescriptor;
export type ExtensionHealth = AdapterDescriptor;
export type ExtensionRecovery = AdapterDescriptor;
export type ExtensionCluster = AdapterDescriptor;
export type ExtensionOrchestrator = AdapterDescriptor;
export type ExtensionLoadBalancer = AdapterDescriptor;
export type ExtensionAutoscaler = AdapterDescriptor;
export type ExtensionServiceDiscovery = AdapterDescriptor;
export type ExtensionFederation = AdapterDescriptor;
export type ExtensionGlobalRegistry = AdapterDescriptor;
export type ExtensionGovernance = AdapterDescriptor;
export type ExtensionPlatform = AdapterDescriptor;

export type EnterpriseProvider = AdapterDescriptor;
export type EnterpriseManager = AdapterDescriptor;
export type EnterpriseIdentity = AdapterDescriptor;
export type EnterpriseAuthentication = AdapterDescriptor;
export type EnterpriseAuthorization = AdapterDescriptor;
export type EnterpriseSession = IntegrationSession;
export type EnterpriseAudit = AdapterDescriptor;
export type EnterpriseCompliance = AdapterDescriptor;
export type EnterpriseRisk = AdapterDescriptor;
export type EnterprisePolicyEngine = AdapterDescriptor;
export type EnterprisePolicyEnforcement = AdapterDescriptor;
export type EnterprisePlatform = AdapterDescriptor;

export type AtlasPlatform = AdapterDescriptor;
export type AtlasSDK = AdapterDescriptor;
export type AtlasCLI = AdapterDescriptor;
export type AtlasCloud = AdapterDescriptor;
export type AtlasDistribution = AdapterDescriptor;
export type AtlasRuntime = AdapterDescriptor;
export type AtlasBootstrap = AdapterDescriptor;
export type AtlasApplication = AdapterDescriptor;
export type AtlasHost = AdapterDescriptor;
export type AtlasOperatingEnvironment = AdapterDescriptor;
export type AtlasDistributedKernel = AdapterDescriptor;
export type AtlasControlPlane = AdapterDescriptor;
export type AtlasDataPlane = AdapterDescriptor;
export type AtlasCluster = AdapterDescriptor;
export type AtlasFederation = AdapterDescriptor;
export type AtlasGlobalPlatform = AdapterDescriptor;
export type AtlasEcosystem = AdapterDescriptor;
export type AtlasPlatformSDK = AdapterDescriptor;
export type AtlasDeveloperPlatform = AdapterDescriptor;
export type AtlasCommercialPlatform = AdapterDescriptor;
export type AtlasProductPlatform = AdapterDescriptor;
export type AtlasSuite = AdapterDescriptor;
export type AtlasEdition = AdapterDescriptor;
export type AtlasFeatureManagement = AdapterDescriptor;
export type AtlasReleaseManagement = AdapterDescriptor;
export type AtlasDeliveryPlatform = AdapterDescriptor;
export type AtlasPlatformEngineering = AdapterDescriptor;
export type AtlasAIPlatform = AdapterDescriptor;
export type AtlasAgentPlatform = AdapterDescriptor;
export type AtlasAgentRuntime = AdapterDescriptor;
export type AtlasAgentMemory = AdapterDescriptor;
export type AtlasAgentOrchestration = AdapterDescriptor;
export type AtlasAgentGovernance = AdapterDescriptor;
export type AtlasAgentMarketplace = AdapterDescriptor;
export type AtlasAgentSDK = AdapterDescriptor;
export type AtlasAgentCloud = AdapterDescriptor;
export type AtlasAgentFleet = AdapterDescriptor;
export type AtlasAutonomousPlatform = AdapterDescriptor;
export type AtlasObservabilityPlatform = AdapterDescriptor;
export type AtlasAIOpsPlatform = AdapterDescriptor;
export type AtlasDigitalTwinPlatform = AdapterDescriptor;
export type AtlasServiceMesh = AdapterDescriptor;
export type AtlasRuntimePlatform = AdapterDescriptor;
export type AtlasOperatingPlatform = AdapterDescriptor;

export interface PlatformEvent extends AdapterEvent {
  readonly channel: string;
}

export interface PlatformPolicy {
  readonly id: string;
  readonly rule: string;
  readonly metadata: JsonObject;
}

export interface PlatformTimelineEntry {
  readonly id: string;
  readonly event: PlatformEvent;
  readonly recordedAt: Timestamp;
}
