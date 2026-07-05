import { JsonObject, Timestamp, ID, Nullable } from '@atlas/atlas-types';

interface AdapterDescriptor {
    readonly id: string;
    readonly kind: string;
    readonly metadata: JsonObject;
}
interface AdapterProgress {
    readonly total: number;
    readonly completed: number;
    readonly failed: number;
}
interface AdapterStatistics {
    readonly totalOperations: number;
    readonly failedOperations: number;
    readonly averageDurationMs: number;
}
interface AdapterEvent {
    readonly type: string;
    readonly targetId: string;
    readonly metadata: JsonObject;
    readonly occurredAt: Timestamp;
}
type EditorSession = AdapterDescriptor;
type EditorDocument = AdapterDescriptor;
type EditorViewport = AdapterDescriptor;
type EditorSelection = AdapterDescriptor;
type EditorTool = AdapterDescriptor;
type EditorCommand = AdapterDescriptor;
type CommandExecutor = AdapterDescriptor;
type CommandHistory = AdapterDescriptor;
type UndoRedoManager = AdapterDescriptor;
type EditorEvent = AdapterEvent;
interface Transform2D {
    readonly x: number;
    readonly y: number;
    readonly scaleX: number;
    readonly scaleY: number;
    readonly rotation: number;
}
interface EditorObject extends AdapterDescriptor {
    readonly transform: Transform2D;
}
type Layer = EditorObject;
type SceneGraph = AdapterDescriptor;
type ImageObject = EditorObject;
type TextObject = EditorObject;
type BubbleObject = EditorObject;
type GroupObject = EditorObject;
type ShapeObject = EditorObject;
type ObjectHierarchy = AdapterDescriptor;
type Renderer = AdapterDescriptor;
type RenderPipeline = AdapterDescriptor;
type DrawCommand = AdapterDescriptor;
type RenderBackend = AdapterDescriptor;
type RenderPass = AdapterDescriptor;
type RenderCache = AdapterDescriptor;
type DirtyRegion = AdapterDescriptor;
type HitTestEngine = AdapterDescriptor;
type RenderStatistics = AdapterStatistics;
type RenderEvent = AdapterEvent;
type InputEvent = AdapterEvent;
type InputManager = AdapterDescriptor;
type InputAdapter = AdapterDescriptor;
type FocusManager = AdapterDescriptor;
type ShortcutManager = AdapterDescriptor;
type GestureManager = AdapterDescriptor;
type InputContext = AdapterDescriptor;
type InputRecorder = AdapterDescriptor;
type InputPlayback = AdapterDescriptor;
type Plugin = AdapterDescriptor;
type PluginManager = AdapterDescriptor;
type ExtensionPoint = AdapterDescriptor;
type ExtensionRegistry = AdapterDescriptor;
type PluginContext = AdapterDescriptor;
type PluginSettings = AdapterDescriptor;
type PluginPermissions = AdapterDescriptor;
type PluginLoader = AdapterDescriptor;
type PluginSandbox = AdapterDescriptor;
type PluginEvent = AdapterEvent;
interface IntegrationSession extends AdapterDescriptor {
    readonly createdAt: Timestamp;
}
type ExportProvider = AdapterDescriptor;
type ExportManager = AdapterDescriptor;
type ExportPipeline = AdapterDescriptor;
type ExportOptions = AdapterDescriptor;
type ExportProgress = AdapterProgress;
type BatchExport = AdapterDescriptor;
type ExportCache = AdapterDescriptor;
type ExportStatistics = AdapterStatistics;
type ExportSession = IntegrationSession;
type ExportEvent = AdapterEvent;
type ImportProvider = AdapterDescriptor;
type ImportManager = AdapterDescriptor;
type ImportPipeline = AdapterDescriptor;
type ImportOptions = AdapterDescriptor;
type ImportProgress = AdapterProgress;
type BatchImport = AdapterDescriptor;
type ImportConflictResolver = AdapterDescriptor;
type ImportStatistics = AdapterStatistics;
type ImportSession = IntegrationSession;
type ImportEvent = AdapterEvent;
type AssetProvider = AdapterDescriptor;
type AssetManager = AdapterDescriptor;
type AssetPipeline = AdapterDescriptor;
type AssetOptions = AdapterDescriptor;
type AssetProgress = AdapterProgress;
type BatchAsset = AdapterDescriptor;
type AssetCache = AdapterDescriptor;
type AssetStatistics = AdapterStatistics;
type AssetSession = IntegrationSession;
type AssetEvent = AdapterEvent;
type HistoryProvider = AdapterDescriptor;
type HistoryManager = AdapterDescriptor;
type HistoryPipeline = AdapterDescriptor;
type HistoryOptions = AdapterDescriptor;
type HistoryProgress = AdapterProgress;
type BatchHistory = AdapterDescriptor;
type HistorySnapshot = AdapterDescriptor;
type HistoryStatistics = AdapterStatistics;
type HistorySession = IntegrationSession;
type HistoryEvent = AdapterEvent;
type CollaborationProvider = AdapterDescriptor;
type CollaborationManager = AdapterDescriptor;
type CollaborationPipeline = AdapterDescriptor;
type CollaborationOptions = AdapterDescriptor;
type CollaborationProgress = AdapterProgress;
type BatchCollaboration = AdapterDescriptor;
type CollaborationPresence = AdapterDescriptor;
type CollaborationSession = IntegrationSession;
type CollaborationStatistics = AdapterStatistics;
type CollaborationEvent = AdapterEvent;
type CloudProvider = AdapterDescriptor;
type CloudManager = AdapterDescriptor;
type CloudPipeline = AdapterDescriptor;
type CloudOptions = AdapterDescriptor;
type CloudProgress = AdapterProgress;
type CloudSync = AdapterDescriptor;
type CloudSession = IntegrationSession;
type CloudStatistics = AdapterStatistics;
type CloudBackup = AdapterDescriptor;
type CloudEvent = AdapterEvent;
type AIProvider = AdapterDescriptor;
type AIManager = AdapterDescriptor;
type AIPipeline = AdapterDescriptor;
type AIOptions = AdapterDescriptor;
type AIProgress = AdapterProgress;
type AIModelRegistry = AdapterDescriptor;
type AIPromptEngine = AdapterDescriptor;
type AIInferenceSession = IntegrationSession;
type AIStatistics = AdapterStatistics;
type AIContextManager = AdapterDescriptor;
type AIEmbeddingService = AdapterDescriptor;
type AITokenizer = AdapterDescriptor;
type AIToolCalling = AdapterDescriptor;
type AISafetyPipeline = AdapterDescriptor;
type AIConversationMemory = AdapterDescriptor;
type AIRetrievalEngine = AdapterDescriptor;
type AIVectorStore = AdapterDescriptor;
type AIReasoningSession = IntegrationSession;
type AIAgent = AdapterDescriptor;
type AIEvent = AdapterEvent;
interface AdapterRegistry<TAdapter extends AdapterDescriptor = AdapterDescriptor> {
    register(adapter: TAdapter): void;
    list(): readonly TAdapter[];
}
declare class DefaultAdapterRegistry<TAdapter extends AdapterDescriptor = AdapterDescriptor> implements AdapterRegistry<TAdapter> {
    private readonly adapters;
    register(adapter: TAdapter): void;
    list(): readonly TAdapter[];
}
declare function createAdapterId(scope: string, name: string): ID<'translation-adapter'>;

type TranslationItemId = ID<'translation-item'>;
type TranslationRequestId = ID<'translation-request'>;
type TranslationResultId = ID<'translation-result'>;
type TranslationProviderId = ID<'translation-provider'>;
type TranslationSessionId = ID<'translation-session'>;
type TranslationBatchId = ID<'translation-batch'>;
type TranslationWorkflowId = ID<'translation-workflow'>;
declare enum TranslationItemState {
    Created = "created",
    Queued = "queued",
    Running = "running",
    Paused = "paused",
    Completed = "completed",
    Failed = "failed",
    Cancelled = "cancelled"
}
declare enum TranslationSourceKind {
    Image = "image",
    Clipboard = "clipboard",
    PdfPage = "pdf-page",
    ArchiveEntry = "archive-entry",
    Remote = "remote",
    Virtual = "virtual"
}
interface TranslationSource {
    readonly id: string;
    readonly kind: TranslationSourceKind;
    readonly locator: string;
    readonly metadata: JsonObject;
}
interface TranslationProgress {
    readonly total: number;
    readonly completed: number;
    readonly failed: number;
    readonly running: number;
    readonly percent: number;
}
interface TranslationItem {
    readonly id: TranslationItemId;
    readonly source: TranslationSource;
    readonly state: TranslationItemState;
    readonly progress: TranslationProgress;
    readonly pipelineId: Nullable<ID<'translation-pipeline'>>;
    readonly resultId: Nullable<TranslationResultId>;
    readonly metadata: JsonObject;
}
interface TranslationOptions {
    readonly sourceLanguage: string;
    readonly targetLanguage: string;
    readonly domain: string;
    readonly preserveTone: boolean;
    readonly metadata: JsonObject;
}
interface TranslationRequest {
    readonly id: TranslationRequestId;
    readonly itemId: TranslationItemId;
    readonly text: string;
    readonly context: JsonObject;
    readonly options: TranslationOptions;
    readonly createdAt: Timestamp;
}
interface TranslationResult {
    readonly id: TranslationResultId;
    readonly requestId: TranslationRequestId;
    readonly providerId: TranslationProviderId;
    readonly text: string;
    readonly confidence: number;
    readonly metadata: JsonObject;
    readonly createdAt: Timestamp;
}
declare enum TranslationErrorCode {
    ProviderUnavailable = "provider-unavailable",
    ProviderFailed = "provider-failed",
    PipelineFailed = "pipeline-failed",
    ValidationFailed = "validation-failed",
    Cancelled = "cancelled"
}
interface TranslationError {
    readonly code: TranslationErrorCode;
    readonly message: string;
    readonly recoverable: boolean;
    readonly metadata: JsonObject;
}
interface TranslationCapabilities {
    readonly languages: readonly string[];
    readonly features: readonly string[];
    readonly maxBatchSize: number;
    readonly metadata: JsonObject;
}
interface TranslationProvider {
    readonly id: TranslationProviderId;
    readonly name: string;
    readonly capabilities: TranslationCapabilities;
    translate(request: TranslationRequest): Promise<TranslationResult>;
}
declare function createTranslationProgress(total: number, completed?: number, failed?: number, running?: number): TranslationProgress;
declare function createTranslationItem(id: TranslationItemId, source: TranslationSource, metadata?: JsonObject): TranslationItem;
declare function createTranslationRequest(id: TranslationRequestId, itemId: TranslationItemId, text: string, options: TranslationOptions, context?: JsonObject): TranslationRequest;

type TranslationPipelineId = ID<'translation-pipeline'>;
type PipelineStageId = ID<'translation-pipeline-stage'>;
type TranslationJobId = ID<'translation-job'>;
declare enum PipelineState {
    Ready = "ready",
    Running = "running",
    Completed = "completed",
    Failed = "failed",
    Cancelled = "cancelled"
}
interface PipelineContext {
    readonly item: TranslationItem;
    readonly data: JsonObject;
    readonly startedAt: Timestamp;
}
interface PipelineStageResult {
    readonly stageId: PipelineStageId;
    readonly state: PipelineState;
    readonly data: JsonObject;
    readonly errors: readonly TranslationError[];
}
interface PipelineStage {
    readonly id: PipelineStageId;
    readonly name: string;
    execute(context: PipelineContext): Promise<PipelineStageResult>;
}
interface PipelineNode {
    readonly id: ID<'translation-pipeline-node'>;
    readonly stage: PipelineStage;
    readonly nextNodeIds: readonly ID<'translation-pipeline-node'>[];
    readonly metadata: JsonObject;
}
interface PipelineSnapshot {
    readonly pipelineId: TranslationPipelineId;
    readonly state: PipelineState;
    readonly completedStages: readonly PipelineStageId[];
    readonly failedStage: PipelineStageId | null;
    readonly capturedAt: Timestamp;
}
interface PipelineResult {
    readonly pipelineId: TranslationPipelineId;
    readonly state: PipelineState;
    readonly stageResults: readonly PipelineStageResult[];
    readonly result: TranslationResult | null;
}
interface TranslationPipeline {
    readonly id: TranslationPipelineId;
    readonly stages: readonly PipelineStage[];
}
interface TranslationJob {
    readonly id: TranslationJobId;
    readonly item: TranslationItem;
    readonly pipeline: TranslationPipeline;
    readonly priority: number;
    readonly metadata: JsonObject;
}
interface PipelineEvent {
    readonly type: string;
    readonly pipelineId: TranslationPipelineId;
    readonly stageId: PipelineStageId | null;
    readonly metadata: JsonObject;
    readonly occurredAt: Timestamp;
}
declare class PipelineExecutor {
    execute(pipeline: TranslationPipeline, context: PipelineContext): Promise<PipelineResult>;
    snapshot(pipeline: TranslationPipeline, result: PipelineResult): PipelineSnapshot;
}
declare function createPipeline(id: TranslationPipelineId, stages: readonly PipelineStage[]): TranslationPipeline;

declare enum TranslationRuntimeState {
    Idle = "idle",
    Running = "running",
    Paused = "paused",
    Completed = "completed",
    Failed = "failed",
    Cancelled = "cancelled"
}
interface TranslationBatch {
    readonly id: TranslationBatchId;
    readonly items: readonly TranslationItem[];
    readonly state: TranslationRuntimeState;
    readonly progress: TranslationProgress;
    readonly metadata: JsonObject;
}
interface TranslationSession {
    readonly id: TranslationSessionId;
    readonly name: string;
    readonly batches: readonly TranslationBatch[];
    readonly state: TranslationRuntimeState;
    readonly progress: TranslationProgress;
    readonly metadata: JsonObject;
}
interface BatchSnapshot {
    readonly batch: TranslationBatch;
    readonly capturedAt: Timestamp;
}
interface RecoveryPoint {
    readonly id: ID<'translation-recovery'>;
    readonly snapshot: BatchSnapshot;
    readonly metadata: JsonObject;
}
declare class TranslationQueue {
    private readonly jobs;
    enqueue(job: TranslationJob): void;
    dequeue(): TranslationJob | null;
    snapshot(): readonly TranslationJob[];
}
declare class TranslationWorker {
    readonly id: ID<'translation-worker'>;
    constructor(id: ID<'translation-worker'>);
    claim(queue: TranslationQueue): TranslationJob | null;
}
declare class WorkerPool {
    readonly size: number;
    constructor(size: number);
    capacity(): number;
}
declare class WorkerScheduler {
    next(queue: TranslationQueue): TranslationJob | null;
}
declare class TranslationScheduler extends WorkerScheduler {
}
declare class TranslationRuntime {
    readonly queue: TranslationQueue;
    readonly scheduler: TranslationScheduler;
    constructor(queue?: TranslationQueue, scheduler?: TranslationScheduler);
    schedule(job: TranslationJob): void;
    next(): TranslationJob | null;
}
declare function createTranslationBatch(id: TranslationBatchId, items: readonly TranslationItem[], metadata?: JsonObject): TranslationBatch;
declare function createTranslationSession(id: TranslationSessionId, name: string, batches: readonly TranslationBatch[], metadata?: JsonObject): TranslationSession;
declare function updateBatchState(batch: TranslationBatch, state: TranslationRuntimeState): TranslationBatch;
declare function pauseBatch(batch: TranslationBatch): TranslationBatch;
declare function resumeBatch(batch: TranslationBatch): TranslationBatch;
declare function cancelBatch(batch: TranslationBatch): TranslationBatch;
declare function retryFailedItems(batch: TranslationBatch): TranslationBatch;
declare function createBatchSnapshot(batch: TranslationBatch): BatchSnapshot;

interface DeliverableContract {
    readonly id: string;
    readonly kind: DeliverableContractName;
    readonly metadata: JsonObject;
}
declare const deliverableContractNames: readonly ["AIAgentGoal", "AIAgentMetadata", "AIAgentPlan", "AIAgentResult", "AIAgentTask", "AICapability", "AIContextMetadata", "AIContextPriority", "AIContextSource", "AIEmbeddingMetadata", "AIEmbeddingRequest", "AIEmbeddingResult", "AIEventMetadata", "AIEventType", "AIExecutionContext", "AIInferenceOperation", "AIInferenceRequest", "AIInferenceResult", "AIInferenceSessionMetadata", "AIInferenceSessionSnapshot", "AIInferenceSessionState", "AIMetadata", "AIModelCapability", "AIModelMetadata", "AIModelVersion", "AIOptionDefinition", "AIOptionsSchema", "AIPipelineContext", "AIProgressSnapshot", "AIProgressState", "AIPromptContext", "AIPromptTemplate", "AIPromptVariable", "AIProviderResolver", "AIProviderStatistics", "AIReasoningSessionMetadata", "AIReasoningSessionSnapshot", "AIReasoningSessionState", "AIReasoningStep", "AIRegistry", "AIRetrievalMetadata", "AIRetrievalRequest", "AIRetrievalResult", "AIRetrievalStrategy", "AISafetyMetadata", "AISafetyPolicy", "AISafetyResult", "AISafetyRule", "AIStage", "AISummaryStatistics", "AITimingStatistics", "AITokenSequence", "AITokenStatistics", "AITokenizerMetadata", "AIToolDefinition", "AIToolInvocation", "AIToolResult", "AdapterContext", "ApprovalDecision", "ApprovalMetadata", "ApprovalPolicy", "ApprovalRequest", "ApprovalResponse", "ApprovalRoute", "AssetCacheEntry", "AssetCachePolicy", "AssetCacheStatistics", "AssetCapability", "AssetEventMetadata", "AssetEventType", "AssetMetadata", "AssetOptionDefinition", "AssetOptionsSchema", "AssetPipelineContext", "AssetProviderResolver", "AssetRegistry", "AssetSessionMetadata", "AssetSessionState", "AssetStage", "AssetStageProgress", "AssetTimingStatistics", "AtlasAIGateway", "AtlasAIPlatformMetadata", "AtlasAgentBuilder", "AtlasAgentCapabilities", "AtlasAgentCatalog", "AtlasAgentManifest", "AtlasAgentMetadata", "AtlasAgentPackage", "AtlasAgentPackageBuilder", "AtlasAgentProject", "AtlasAgentRegistry", "AtlasAgentRuntimeCapabilities", "AtlasAgentRuntimeMetadata", "AtlasAgentSession", "AtlasAnomalyEngine", "AtlasApplicationBuilder", "AtlasApplicationContext", "AtlasApplicationLifecycle", "AtlasApplicationMetadata", "AtlasApprovalPolicy", "AtlasArtifact", "AtlasAuditRegistry", "AtlasAutonomousMetadata", "AtlasBootstrapContext", "AtlasBootstrapMetadata", "AtlasBootstrapResult", "AtlasBootstrapValidator", "AtlasCLICommand", "AtlasCLIContext", "AtlasCLIMetadata", "AtlasCLIRegistry", "AtlasCloudDeployment", "AtlasCloudEnvironment", "AtlasCloudMetadata", "AtlasCloudProject", "AtlasCloudRuntime", "AtlasCloudScaling", "AtlasClusterCapabilities", "AtlasClusterMetadata", "AtlasClusterNode", "AtlasClusterTopology", "AtlasCommercialMetadata", "AtlasConfigurationRegistry", "AtlasControlPlaneCapabilities", "AtlasControlPlaneMetadata", "AtlasDataPlaneCapabilities", "AtlasDataPlaneMetadata", "AtlasDecisionEngine", "AtlasDeliveryEnvironment", "AtlasDeliveryMetadata", "AtlasDeliveryPipeline", "AtlasDeliveryPolicy", "AtlasDeployment", "AtlasDeveloperPlatformBuilder", "AtlasDeveloperPlatformCapabilities", "AtlasDeveloperPlatformContext", "AtlasDeveloperPlatformMetadata", "AtlasDistributedCapabilities", "AtlasDistributedKernelMetadata", "AtlasDistributionMetadata", "AtlasDistributionResult", "AtlasEcosystemCapabilities", "AtlasEcosystemMetadata", "AtlasEditionCapabilities", "AtlasEditionCatalog", "AtlasEditionDefinition", "AtlasEditionMetadata", "AtlasEngineeringServiceCatalog", "AtlasEnvironmentBuilder", "AtlasEnvironmentCapabilities", "AtlasEnvironmentContext", "AtlasEnvironmentMetadata", "AtlasExecutionContext", "AtlasExecutionMetadata", "AtlasExecutionRuntime", "AtlasFeatureCatalog", "AtlasFeatureEvaluator", "AtlasFeatureMetadata", "AtlasFeaturePolicy", "AtlasFeatureRegistry", "AtlasFederationCapabilities", "AtlasFederationCluster", "AtlasFederationMetadata", "AtlasFederationTopology", "AtlasFleetHealth", "AtlasFleetManager", "AtlasFleetMetadata", "AtlasFleetRegistry", "AtlasFleetTopology", "AtlasGlobalCapabilities", "AtlasGlobalPlatformContext", "AtlasGlobalPlatformMetadata", "AtlasGlobalRegistry", "AtlasGoldenPathCatalog", "AtlasGovernanceMetadata", "AtlasHostBuilder", "AtlasHostCapabilities", "AtlasHostContext", "AtlasHostMetadata", "AtlasIncidentCorrelation", "AtlasKernelBuilder", "AtlasKernelCapabilities", "AtlasKernelContext", "AtlasKernelMetadata", "AtlasKernelNode", "AtlasKernelTopology", "AtlasLicenseManager", "AtlasLogRegistry", "AtlasMarketplaceMetadata", "AtlasMemoryMetadata", "AtlasMemoryPolicy", "AtlasMemoryRegistry", "AtlasMemoryStore", "AtlasMeshSecurity", "AtlasMeshTelemetry", "AtlasMetricsRegistry", "AtlasModelRegistry", "AtlasObservationEngine", "AtlasOperatingContext", "AtlasOperatingLifecycle", "AtlasOperatingMetadata", "AtlasOperatingSystemBuilder", "AtlasOperatingSystemCapabilities", "AtlasOperatingSystemContext", "AtlasOperatingSystemMetadata", "AtlasOperationalIntelligence", "AtlasPlanningEngine", "AtlasPlatformBuilder", "AtlasPlatformCapabilities", "AtlasPlatformContext", "AtlasPlatformCoordinator", "AtlasPlatformEngineeringCapabilities", "AtlasPlatformEngineeringMetadata", "AtlasPlatformMetadata", "AtlasPlatformRegistry", "AtlasPlatformSDKBuilder", "AtlasPlatformSDKCapabilities", "AtlasPlatformSDKContext", "AtlasPlatformSDKMetadata", "AtlasPolicyEngine", "AtlasPolicyRegistry", "AtlasPredictionEngine", "AtlasProductCatalog", "AtlasProductMetadata", "AtlasPromptRegistry", "AtlasPublisherRegistry", "AtlasReleaseChannel", "AtlasReleaseMetadata", "AtlasReleasePolicy", "AtlasReleaseRegistry", "AtlasReleaseVersion", "AtlasRepository", "AtlasResourceRegistry", "AtlasRuntimeCapabilities", "AtlasRuntimeContext", "AtlasRuntimeLifecycle", "AtlasRuntimeManager", "AtlasRuntimeMetadata", "AtlasRuntimeProfile", "AtlasRuntimeRegistry", "AtlasRuntimeTelemetry", "AtlasSDKBuilder", "AtlasSDKCapabilities", "AtlasSDKContext", "AtlasSDKMetadata", "AtlasScenarioEngine", "AtlasScheduler", "AtlasServiceCatalog", "AtlasServiceRegistry", "AtlasSimulationEngine", "AtlasSubscriptionManager", "AtlasSuiteCapabilities", "AtlasSuiteCatalog", "AtlasSuiteDefinition", "AtlasSuiteMetadata", "AtlasSystemRegistry", "AtlasTelemetryMetadata", "AtlasTenantManager", "AtlasTopologyRegistry", "AtlasTraceRegistry", "AtlasTrafficPolicy", "AtlasTwinMetadata", "AtlasTwinModel", "AtlasTwinRegistry", "AtlasWorkflow", "AtlasWorkflowMetadata", "AtlasWorkflowPolicy", "AtlasWorkflowScheduler", "AtlasWorkload", "AtlasWorkloadRegistry", "BackendCapabilities", "BackendType", "BatchAssetResult", "BatchAssetSession", "BatchCollaborationResult", "BatchCollaborationSession", "BatchExportResult", "BatchExportSession", "BatchHistoryResult", "BatchHistorySession", "BatchImportResult", "BatchImportSession", "BrowserInputAdapter", "BubbleGeometry", "BubbleType", "CacheEntry", "CacheKey", "CloudAuthentication", "CloudBackupMetadata", "CloudBackupPolicy", "CloudCapability", "CloudEventMetadata", "CloudEventType", "CloudMetadata", "CloudOperation", "CloudOptionDefinition", "CloudOptionsSchema", "CloudPipelineContext", "CloudProgressSnapshot", "CloudProgressState", "CloudProviderResolver", "CloudProviderStatistics", "CloudRegistry", "CloudRestorePoint", "CloudResult", "CloudRetentionPolicy", "CloudSessionMetadata", "CloudSessionSnapshot", "CloudSessionState", "CloudStage", "CloudSummaryStatistics", "CloudSyncDirection", "CloudSyncMetadata", "CloudSyncPolicy", "CloudSyncState", "CloudTimingStatistics", "CloudTransferStatistics", "CollaborationCapability", "CollaborationEventMetadata", "CollaborationEventType", "CollaborationMetadata", "CollaborationOptionDefinition", "CollaborationOptionsSchema", "CollaborationPipelineContext", "CollaborationProgressState", "CollaborationProviderResolver", "CollaborationRegistry", "CollaborationSessionMetadata", "CollaborationSessionSnapshot", "CollaborationSessionState", "CollaborationStage", "CollaborationSummaryStatistics", "CollaborationTimingStatistics", "CommandContext", "CommandExecution", "CommandExecutionResult", "CommandHistoryEntry", "CommandResult", "ConflictResolution", "ConflictStrategy", "ContextSnapshot", "ConversationMemoryEntry", "ConversationMemoryMetadata", "ConversationMemoryPolicy", "CursorPresence", "DirtyRectangle", "DirtyRegionCollection", "DocumentState", "DrawCommandMetadata", "DrawCommandType", "EditorEventType", "EditorState", "EnterpriseAuditEvent", "EnterpriseAuditMetadata", "EnterpriseAuditQuery", "EnterpriseAuditReport", "EnterpriseAuthenticationContext", "EnterpriseAuthenticationMetadata", "EnterpriseAuthenticationRequest", "EnterpriseAuthenticationResult", "EnterpriseAuthorizationContext", "EnterpriseAuthorizationMetadata", "EnterpriseAuthorizationRequest", "EnterpriseAuthorizationResult", "EnterpriseCapability", "EnterpriseComplianceContext", "EnterpriseComplianceControl", "EnterpriseComplianceReport", "EnterpriseComplianceResult", "EnterpriseContext", "EnterpriseEnforcementContext", "EnterpriseEnforcementMetadata", "EnterpriseEnforcementResult", "EnterpriseIdentityAttributes", "EnterpriseIdentityGroup", "EnterpriseIdentityMetadata", "EnterpriseIdentityProfile", "EnterpriseLifecycle", "EnterpriseManagerMetadata", "EnterpriseMetadata", "EnterpriseObligationProcessor", "EnterprisePlatformBuilder", "EnterprisePlatformCapabilities", "EnterprisePlatformContext", "EnterprisePlatformMetadata", "EnterprisePolicyContext", "EnterprisePolicyDecision", "EnterprisePolicyEvaluation", "EnterprisePolicyMetadata", "EnterpriseProviderRegistry", "EnterpriseProviderResult", "EnterpriseRegistry", "EnterpriseRiskAssessment", "EnterpriseRiskReport", "EnterpriseRiskResult", "EnterpriseRiskScore", "EnterpriseSessionContext", "EnterpriseSessionManager", "EnterpriseSessionMetadata", "EnterpriseSessionResult", "ExportCacheEntry", "ExportCacheKey", "ExportCapability", "ExportEventMetadata", "ExportEventType", "ExportMetadata", "ExportOptionDefinition", "ExportOptionsSchema", "ExportPipelineContext", "ExportProviderResolver", "ExportRegistry", "ExportSessionMetadata", "ExportSessionState", "ExportStage", "ExportStageProgress", "ExportStageStatistics", "ExportTimingStatistics", "ExtensionCapability", "ExtensionCapabilityGrant", "ExtensionClusterMembership", "ExtensionClusterMetadata", "ExtensionClusterNode", "ExtensionClusterTopology", "ExtensionCompatibility", "ExtensionDependencyGraph", "ExtensionDependencyMetadata", "ExtensionDependencyNode", "ExtensionDependencyResult", "ExtensionDiagnosticIssue", "ExtensionDiagnosticRecommendation", "ExtensionDiagnosticReport", "ExtensionEndpoint", "ExtensionEventContext", "ExtensionEventMetadata", "ExtensionEventType", "ExtensionFederationCluster", "ExtensionFederationMetadata", "ExtensionFederationPolicy", "ExtensionFederationTopology", "ExtensionGlobalEntry", "ExtensionGlobalMetadata", "ExtensionGlobalQuery", "ExtensionGlobalResult", "ExtensionGovernanceContext", "ExtensionGovernanceMetadata", "ExtensionGovernanceReport", "ExtensionGovernanceResult", "ExtensionHealthAssessment", "ExtensionHealthIndicator", "ExtensionHealthMetadata", "ExtensionHealthSnapshot", "ExtensionHealthState", "ExtensionIdentity", "ExtensionInstallation", "ExtensionInstallationMetadata", "ExtensionInstallationOptions", "ExtensionInstallationResult", "ExtensionLifecycle", "ExtensionLoadBalancingPolicy", "ExtensionLoadBalancingStrategy", "ExtensionLookup", "ExtensionManifestMetadata", "ExtensionMetadata", "ExtensionPackageEntry", "ExtensionPackageMetadata", "ExtensionPackageResource", "ExtensionPackageValidationResult", "ExtensionPermissionMetadata", "ExtensionPermissionResult", "ExtensionPermissionRule", "ExtensionPermissionSet", "ExtensionPlacement", "ExtensionPlacementMetadata", "ExtensionPlacementStrategy", "ExtensionPlatformBuilder", "ExtensionPlatformCapabilities", "ExtensionPlatformContext", "ExtensionPlatformMetadata", "ExtensionPolicyMetadata", "ExtensionPolicyResult", "ExtensionPolicyRule", "ExtensionPolicySet", "ExtensionRecoveryMetadata", "ExtensionRecoveryPlan", "ExtensionRecoveryResult", "ExtensionRecoveryStrategy", "ExtensionRegistryEntry", "ExtensionRegistryMetadata", "ExtensionRegistryQuery", "ExtensionRegistryResult", "ExtensionRequest", "ExtensionResolver", "ExtensionResult", "ExtensionRoutingDecision", "ExtensionRuntimeContext", "ExtensionRuntimeMetadata", "ExtensionRuntimeSnapshot", "ExtensionRuntimeState", "ExtensionSandboxContext", "ExtensionSandboxMetadata", "ExtensionScalingMetadata", "ExtensionScalingPlan", "ExtensionScalingPolicy", "ExtensionScalingRecommendation", "ExtensionSchedulingPolicy", "ExtensionServiceEndpoint", "ExtensionServiceMetadata", "ExtensionServiceRegistration", "ExtensionServiceResolver", "ExtensionSignatureMetadata", "ExtensionTelemetryEvent", "ExtensionTelemetryMetadata", "ExtensionTelemetryMetrics", "ExtensionTelemetrySnapshot", "ExtensionTrustLevel", "ExtensionTrustPolicy", "ExtensionUpdateMetadata", "ExtensionUpdatePlan", "ExtensionUpdatePolicy", "ExtensionUpdateResult", "ExtensionVerificationResult", "FillStyle", "FocusState", "FocusTarget", "FrameStatistics", "GestureEvent", "GestureState", "GestureType", "GlossaryEntry", "GroupProperties", "HierarchyValidationResult", "HistoryCapability", "HistoryEventMetadata", "HistoryEventType", "HistoryMetadata", "HistoryOptionDefinition", "HistoryOptionsSchema", "HistoryPipelineContext", "HistoryProviderResolver", "HistoryRegistry", "HistorySessionMetadata", "HistorySessionState", "HistorySnapshotFactory", "HistorySnapshotMetadata", "HistoryStage", "HistoryStageProgress", "HistorySummaryStatistics", "HistoryTimingStatistics", "HitTarget", "HitTestContext", "HitTestResult", "ImageProperties", "ImportCapability", "ImportEventMetadata", "ImportEventType", "ImportMetadata", "ImportOptionDefinition", "ImportOptionsSchema", "ImportPipelineContext", "ImportProviderResolver", "ImportRegistry", "ImportSessionMetadata", "ImportSessionState", "ImportStage", "ImportStageProgress", "ImportStageStatistics", "ImportTimingStatistics", "InputDispatcher", "InputEventType", "InputRecording", "InputRecordingSession", "InputRuntimeEvent", "InputRuntimeEventMetadata", "InputRuntimeEventType", "LayerMetadata", "MarketplaceEntry", "MarketplaceManifest", "MarketplaceMetadata", "MarketplaceQuery", "MarketplaceRepository", "ModifierKeys", "ObjectMetadata", "ObjectNode", "ObjectRelationship", "ObjectRepository", "ParticipantPresence", "PermissionCategory", "PermissionManifest", "PlaybackOptions", "PlaybackState", "PluginCapability", "PluginEventMetadata", "PluginEventType", "PluginLoadResult", "PluginManifest", "PluginManifestValidator", "PluginMetadata", "PluginPackage", "PluginRegistry", "PluginServices", "PluginSettingDefinition", "PluginSettingsSchema", "PluginState", "Point2D", "PresenceStatus", "ProgressSnapshot", "ProjectEventType", "ProjectHistoryEntry", "ProjectMetadata", "ProjectResources", "ProjectTemplateMetadata", "ProjectValidationIssue", "ProjectValidationResult", "ProviderConfigurationSchema", "ProviderStatistics", "QualityRule", "RegisteredExtension", "RenderContext", "RenderEventMetadata", "RenderEventType", "RenderPassContext", "RenderPassType", "RenderResult", "ReplayStatistics", "ReviewComment", "SandboxCapability", "SandboxContext", "Scale2D", "SelectionItem", "SelectionPresence", "SessionState", "ShapeGeometry", "ShapeType", "ShortcutContext", "ShortcutDefinition", "ShortcutScope", "StrokeStyle", "StyleRule", "SynchronizationProgress", "SynchronizationStatistics", "TextAlignment", "TextProperties", "TimingStatistics", "ToolContext", "ToolType", "TranslationCacheEntry", "TranslationContext", "TranslationHandler", "TranslationIssue", "TranslationPauseResume", "TranslationRecovery", "TranslationRuntimeControl", "Typography", "UndoRedoState", "VectorDocument", "VectorMetadata", "VectorQuery", "VectorSearchResult", "ViewportPresence", "ViewportState", "WorkflowAnalyticsReport", "WorkflowBottleneck", "WorkflowCapability", "WorkflowDefinition", "WorkflowDiff", "WorkflowEdge", "WorkflowEventMetadata", "WorkflowEventType", "WorkflowExecutionContext", "WorkflowExecutionPlan", "WorkflowExecutionStatistics", "WorkflowHistoryEntry", "WorkflowInsight", "WorkflowMetadata", "WorkflowNode", "WorkflowNodeProgress", "WorkflowNodeStatistics", "WorkflowOptimizationEngine", "WorkflowOptimizationMetadata", "WorkflowOptimizationReport", "WorkflowOptionDefinition", "WorkflowOptionsSchema", "WorkflowPipelineContext", "WorkflowPolicyMetadata", "WorkflowPolicyResult", "WorkflowPolicySet", "WorkflowProgressSnapshot", "WorkflowProgressState", "WorkflowProviderResolver", "WorkflowRecommendation", "WorkflowRegistry", "WorkflowReplayMetadata", "WorkflowReplayOptions", "WorkflowReplaySession", "WorkflowReplaySnapshot", "WorkflowRequest", "WorkflowResult", "WorkflowRule", "WorkflowRuntimeContext", "WorkflowRuntimeMetadata", "WorkflowRuntimeSnapshot", "WorkflowRuntimeState", "WorkflowScheduleMetadata", "WorkflowSessionMetadata", "WorkflowSessionSnapshot", "WorkflowSessionState", "WorkflowSimulationEngine", "WorkflowSimulationMetadata", "WorkflowSimulationRequest", "WorkflowSimulationResult", "WorkflowStage", "WorkflowSummaryStatistics", "WorkflowTemplateEngine", "WorkflowTemplateMetadata", "WorkflowTemplateParameter", "WorkflowTimingStatistics", "WorkflowTrend", "WorkflowTrigger", "WorkflowTriggerType", "WorkflowValidationIssue", "WorkflowValidationResult", "WorkflowVersionMetadata", "WorkflowVersionState", "WritingMode"];
type DeliverableContractName = typeof deliverableContractNames[number];
type DeliverableContractMap = {
    readonly [TName in DeliverableContractName]: DeliverableContract;
};
type DeliverableContractFor<TName extends DeliverableContractName> = DeliverableContractMap[TName];
declare function createDeliverableContract(name: DeliverableContractName, id: string, metadata?: JsonObject): DeliverableContract;

interface TranslationIntegrationPort {
    readonly id: string;
    readonly capability: string;
    readonly metadata: JsonObject;
}
declare class TranslationIntegrationRegistry {
    private readonly ports;
    register(port: TranslationIntegrationPort): void;
    list(): readonly TranslationIntegrationPort[];
}
interface TranslationMetric {
    readonly token: string;
    readonly value: number;
    readonly unit: string;
}
interface TranslationDiagnostics {
    readonly issues: readonly string[];
    readonly metrics: readonly TranslationMetric[];
    readonly checkedAt: Timestamp;
}
interface TranslationBudget {
    readonly metricToken: string;
    readonly threshold: number;
}
declare class TranslationProfiler {
    private readonly metrics;
    record(metric: TranslationMetric): void;
    diagnostics(budgets?: readonly TranslationBudget[]): TranslationDiagnostics;
}

declare enum PlatformComponentState {
    Registered = "registered",
    Active = "active",
    Suspended = "suspended",
    Retired = "retired"
}
interface PlatformComponent {
    readonly id: string;
    readonly kind: string;
    readonly state: PlatformComponentState;
    readonly metadata: JsonObject;
}
declare class PlatformRegistry<TComponent extends PlatformComponent = PlatformComponent> {
    private readonly components;
    register(component: TComponent): void;
    get(id: string): TComponent | null;
    list(): readonly TComponent[];
}
interface ProviderContract {
    readonly id: string;
    readonly capability: string;
    readonly metadata: JsonObject;
}
interface ManagedSession {
    readonly id: string;
    readonly ownerId: string;
    readonly metadata: JsonObject;
    readonly createdAt: Timestamp;
}
interface RuntimeSnapshot {
    readonly id: ID<'atlas-runtime-snapshot'>;
    readonly components: readonly PlatformComponent[];
    readonly capturedAt: Timestamp;
}
declare class AtlasKernel {
    private readonly registry;
    constructor(registry?: PlatformRegistry<PlatformComponent>);
    register(component: PlatformComponent): void;
    snapshot(id: ID<'atlas-runtime-snapshot'>): RuntimeSnapshot;
}
declare class AtlasOperatingSystem {
    readonly kernel: AtlasKernel;
    constructor(kernel?: AtlasKernel);
    boot(component: PlatformComponent): RuntimeSnapshot;
}

type WorkflowProvider = AdapterDescriptor;
type WorkflowManager = AdapterDescriptor;
type WorkflowPipeline = AdapterDescriptor;
type WorkflowOptions = AdapterDescriptor;
type WorkflowSession = IntegrationSession;
type WorkflowStatistics = AdapterStatistics;
type WorkflowDesigner = AdapterDescriptor;
type WorkflowScheduler = AdapterDescriptor;
type WorkflowMarketplace = AdapterDescriptor;
type WorkflowApproval = AdapterDescriptor;
type WorkflowVersioning = AdapterDescriptor;
type WorkflowReplay = AdapterDescriptor;
type WorkflowAnalytics = AdapterDescriptor;
type WorkflowPolicy = AdapterDescriptor;
type WorkflowOptimization = AdapterDescriptor;
type WorkflowSimulation = AdapterDescriptor;
type WorkflowRuntime = AdapterDescriptor;
type ExtensionProvider = AdapterDescriptor;
type ExtensionManager = AdapterDescriptor;
type ExtensionRuntime = AdapterDescriptor;
type ExtensionSandbox = AdapterDescriptor;
type ExtensionPermissions = AdapterDescriptor;
type ExtensionEvent = AdapterEvent;
type ExtensionManifest = AdapterDescriptor;
type ExtensionDependencyResolver = AdapterDescriptor;
type ExtensionPackage = AdapterDescriptor;
type ExtensionInstaller = AdapterDescriptor;
type ExtensionUpdater = AdapterDescriptor;
type ExtensionSignature = AdapterDescriptor;
type ExtensionMarketplace = AdapterDescriptor;
type ExtensionPolicy = AdapterDescriptor;
type ExtensionTelemetry = AdapterDescriptor;
type ExtensionDiagnostics = AdapterDescriptor;
type ExtensionHealth = AdapterDescriptor;
type ExtensionRecovery = AdapterDescriptor;
type ExtensionCluster = AdapterDescriptor;
type ExtensionOrchestrator = AdapterDescriptor;
type ExtensionLoadBalancer = AdapterDescriptor;
type ExtensionAutoscaler = AdapterDescriptor;
type ExtensionServiceDiscovery = AdapterDescriptor;
type ExtensionFederation = AdapterDescriptor;
type ExtensionGlobalRegistry = AdapterDescriptor;
type ExtensionGovernance = AdapterDescriptor;
type ExtensionPlatform = AdapterDescriptor;
type EnterpriseProvider = AdapterDescriptor;
type EnterpriseManager = AdapterDescriptor;
type EnterpriseIdentity = AdapterDescriptor;
type EnterpriseAuthentication = AdapterDescriptor;
type EnterpriseAuthorization = AdapterDescriptor;
type EnterpriseSession = IntegrationSession;
type EnterpriseAudit = AdapterDescriptor;
type EnterpriseCompliance = AdapterDescriptor;
type EnterpriseRisk = AdapterDescriptor;
type EnterprisePolicyEngine = AdapterDescriptor;
type EnterprisePolicyEnforcement = AdapterDescriptor;
type EnterprisePlatform = AdapterDescriptor;
type AtlasPlatform = AdapterDescriptor;
type AtlasSDK = AdapterDescriptor;
type AtlasCLI = AdapterDescriptor;
type AtlasCloud = AdapterDescriptor;
type AtlasDistribution = AdapterDescriptor;
type AtlasRuntime = AdapterDescriptor;
type AtlasBootstrap = AdapterDescriptor;
type AtlasApplication = AdapterDescriptor;
type AtlasHost = AdapterDescriptor;
type AtlasOperatingEnvironment = AdapterDescriptor;
type AtlasDistributedKernel = AdapterDescriptor;
type AtlasControlPlane = AdapterDescriptor;
type AtlasDataPlane = AdapterDescriptor;
type AtlasCluster = AdapterDescriptor;
type AtlasFederation = AdapterDescriptor;
type AtlasGlobalPlatform = AdapterDescriptor;
type AtlasEcosystem = AdapterDescriptor;
type AtlasPlatformSDK = AdapterDescriptor;
type AtlasDeveloperPlatform = AdapterDescriptor;
type AtlasCommercialPlatform = AdapterDescriptor;
type AtlasProductPlatform = AdapterDescriptor;
type AtlasSuite = AdapterDescriptor;
type AtlasEdition = AdapterDescriptor;
type AtlasFeatureManagement = AdapterDescriptor;
type AtlasReleaseManagement = AdapterDescriptor;
type AtlasDeliveryPlatform = AdapterDescriptor;
type AtlasPlatformEngineering = AdapterDescriptor;
type AtlasAIPlatform = AdapterDescriptor;
type AtlasAgentPlatform = AdapterDescriptor;
type AtlasAgentRuntime = AdapterDescriptor;
type AtlasAgentMemory = AdapterDescriptor;
type AtlasAgentOrchestration = AdapterDescriptor;
type AtlasAgentGovernance = AdapterDescriptor;
type AtlasAgentMarketplace = AdapterDescriptor;
type AtlasAgentSDK = AdapterDescriptor;
type AtlasAgentCloud = AdapterDescriptor;
type AtlasAgentFleet = AdapterDescriptor;
type AtlasAutonomousPlatform = AdapterDescriptor;
type AtlasObservabilityPlatform = AdapterDescriptor;
type AtlasAIOpsPlatform = AdapterDescriptor;
type AtlasDigitalTwinPlatform = AdapterDescriptor;
type AtlasServiceMesh = AdapterDescriptor;
type AtlasRuntimePlatform = AdapterDescriptor;
type AtlasOperatingPlatform = AdapterDescriptor;
interface PlatformEvent extends AdapterEvent {
    readonly channel: string;
}
interface PlatformPolicy {
    readonly id: string;
    readonly rule: string;
    readonly metadata: JsonObject;
}
interface PlatformTimelineEntry {
    readonly id: string;
    readonly event: PlatformEvent;
    readonly recordedAt: Timestamp;
}

interface ProjectSettings {
    readonly sourceLanguage: string;
    readonly targetLanguage: string;
    readonly metadata: JsonObject;
}
interface ProjectResource {
    readonly id: ID<'translation-project-resource'>;
    readonly kind: string;
    readonly locator: string;
    readonly metadata: JsonObject;
}
interface ProjectAssets {
    readonly resources: readonly ProjectResource[];
}
declare enum ProjectLifecycle {
    Created = "created",
    Active = "active",
    Archived = "archived"
}
interface TranslationProject {
    readonly id: ID<'translation-project'>;
    readonly name: string;
    readonly settings: ProjectSettings;
    readonly assets: ProjectAssets;
    readonly sessions: readonly TranslationSession[];
    readonly lifecycle: ProjectLifecycle;
    readonly metadata: JsonObject;
}
interface ProjectSession {
    readonly projectId: ID<'translation-project'>;
    readonly session: TranslationSession;
}
interface ProjectHistory {
    readonly projectId: ID<'translation-project'>;
    readonly entries: readonly JsonObject[];
}
interface ProjectTemplate {
    readonly id: ID<'translation-project-template'>;
    readonly settings: ProjectSettings;
    readonly resources: readonly ProjectResource[];
}
interface ProjectEvent {
    readonly type: string;
    readonly projectId: ID<'translation-project'>;
    readonly metadata: JsonObject;
    readonly occurredAt: Timestamp;
}
declare class ProjectValidator {
    validate(project: TranslationProject): readonly string[];
}

interface ProviderConfiguration {
    readonly providerId: TranslationProviderId;
    readonly enabled: boolean;
    readonly priority: number;
    readonly metadata: JsonObject;
}
interface ProviderMetric {
    readonly providerId: TranslationProviderId;
    readonly totalRequests: number;
    readonly failures: number;
    readonly averageLatencyMs: number;
}
interface ProviderMetrics {
    readonly metrics: readonly ProviderMetric[];
}
type TranslationMiddleware = (request: TranslationRequest) => TranslationRequest | Promise<TranslationRequest>;
declare class ProviderRegistry {
    private readonly providers;
    register(provider: TranslationProvider): void;
    get(id: TranslationProviderId): TranslationProvider | null;
    list(): readonly TranslationProvider[];
}
declare class ProviderResolver {
    private readonly registry;
    constructor(registry: ProviderRegistry);
    resolve(options: TranslationOptions): TranslationProvider | null;
}
declare class ProviderFallback {
    private readonly providers;
    constructor(providers: readonly TranslationProvider[]);
    translate(request: TranslationRequest): Promise<TranslationResult>;
}
declare class TranslationCache {
    private readonly values;
    get(key: string): TranslationResult | null;
    set(key: string, result: TranslationResult): void;
}
declare class PromptBuilder {
    build(request: TranslationRequest, context?: JsonObject): string;
}
declare class ContextResolver {
    resolve(request: TranslationRequest, additions?: JsonObject): JsonObject;
}

interface GlossaryTerm {
    readonly source: string;
    readonly target: string;
    readonly notes: string | null;
}
interface Glossary {
    readonly id: ID<'translation-glossary'>;
    readonly terms: readonly GlossaryTerm[];
}
interface Terminology {
    readonly id: ID<'translation-terminology'>;
    readonly terms: readonly GlossaryTerm[];
    readonly metadata: JsonObject;
}
interface StyleGuide {
    readonly id: ID<'translation-style-guide'>;
    readonly tone: string;
    readonly rules: readonly string[];
    readonly metadata: JsonObject;
}
interface TranslationMemoryEntry {
    readonly source: string;
    readonly target: string;
    readonly metadata: JsonObject;
}
declare class TranslationMemory {
    private readonly entries;
    add(entry: TranslationMemoryEntry): void;
    lookup(source: string): TranslationMemoryEntry | null;
}
interface QualityIssue {
    readonly code: string;
    readonly message: string;
    readonly severity: 'info' | 'warning' | 'error';
}
interface QualityReport {
    readonly resultId: string;
    readonly confidence: number;
    readonly issues: readonly QualityIssue[];
    readonly checkedAt: Timestamp;
}
interface TranslationQuality {
    readonly resultId: string;
    readonly report: QualityReport;
    readonly metadata: JsonObject;
}
declare class ConsistencyChecker {
    check(result: TranslationResult, glossary?: Glossary | null): QualityReport;
}
declare class TranslationValidator {
    validate(request: TranslationRequest, result: TranslationResult): QualityReport;
}
declare class TranslationQualityEvaluator {
    evaluate(report: QualityReport): TranslationQuality;
}
declare enum ReviewState {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected"
}
interface TranslationReview {
    readonly id: ID<'translation-review'>;
    readonly resultId: string;
    readonly state: ReviewState;
    readonly comments: readonly string[];
}
interface TranslationApproval {
    readonly id: ID<'translation-approval'>;
    readonly reviewId: ID<'translation-review'>;
    readonly approved: boolean;
    readonly approvedAt: Timestamp | null;
    readonly metadata: JsonObject;
}

type WorkflowStepId = ID<'translation-workflow-step'>;
declare enum WorkflowStepStatus {
    Ready = "ready",
    Running = "running",
    Completed = "completed",
    Failed = "failed",
    Skipped = "skipped"
}
interface WorkflowCondition {
    readonly id: ID<'translation-workflow-condition'>;
    evaluate(context: JsonObject): boolean;
}
interface WorkflowStep {
    readonly id: WorkflowStepId;
    readonly name: string;
    readonly metadata: JsonObject;
}
interface WorkflowTransition {
    readonly from: WorkflowStepId;
    readonly to: WorkflowStepId;
    readonly conditionId: string | null;
}
interface TranslationWorkflow {
    readonly id: TranslationWorkflowId;
    readonly name: string;
    readonly steps: readonly WorkflowStep[];
    readonly transitions: readonly WorkflowTransition[];
    readonly metadata: JsonObject;
}
interface WorkflowTemplate {
    readonly id: ID<'translation-workflow-template'>;
    readonly workflow: TranslationWorkflow;
    readonly metadata: JsonObject;
}
interface WorkflowSnapshot {
    readonly workflowId: TranslationWorkflowId;
    readonly completedSteps: readonly WorkflowStepId[];
    readonly capturedAt: Timestamp;
}
interface WorkflowProgress {
    readonly totalSteps: number;
    readonly completedSteps: number;
    readonly failedSteps: number;
}
interface WorkflowHistory {
    readonly workflowId: TranslationWorkflowId;
    readonly snapshots: readonly WorkflowSnapshot[];
}
declare class WorkflowExecutor {
    execute(workflow: TranslationWorkflow, batch: TranslationBatch): WorkflowSnapshot;
}
declare class WorkflowValidator {
    validate(workflow: TranslationWorkflow): readonly string[];
}
interface WorkflowEvent {
    readonly type: string;
    readonly workflowId: TranslationWorkflowId;
    readonly metadata: JsonObject;
    readonly occurredAt: Timestamp;
}

export { type AIAgent, type AIContextManager, type AIConversationMemory, type AIEmbeddingService, type AIEvent, type AIInferenceSession, type AIManager, type AIModelRegistry, type AIOptions, type AIPipeline, type AIProgress, type AIPromptEngine, type AIProvider, type AIReasoningSession, type AIRetrievalEngine, type AISafetyPipeline, type AIStatistics, type AITokenizer, type AIToolCalling, type AIVectorStore, type AdapterDescriptor, type AdapterEvent, type AdapterProgress, type AdapterRegistry, type AdapterStatistics, type AssetCache, type AssetEvent, type AssetManager, type AssetOptions, type AssetPipeline, type AssetProgress, type AssetProvider, type AssetSession, type AssetStatistics, type AtlasAIOpsPlatform, type AtlasAIPlatform, type AtlasAgentCloud, type AtlasAgentFleet, type AtlasAgentGovernance, type AtlasAgentMarketplace, type AtlasAgentMemory, type AtlasAgentOrchestration, type AtlasAgentPlatform, type AtlasAgentRuntime, type AtlasAgentSDK, type AtlasApplication, type AtlasAutonomousPlatform, type AtlasBootstrap, type AtlasCLI, type AtlasCloud, type AtlasCluster, type AtlasCommercialPlatform, type AtlasControlPlane, type AtlasDataPlane, type AtlasDeliveryPlatform, type AtlasDeveloperPlatform, type AtlasDigitalTwinPlatform, type AtlasDistributedKernel, type AtlasDistribution, type AtlasEcosystem, type AtlasEdition, type AtlasFeatureManagement, type AtlasFederation, type AtlasGlobalPlatform, type AtlasHost, AtlasKernel, type AtlasObservabilityPlatform, type AtlasOperatingEnvironment, type AtlasOperatingPlatform, AtlasOperatingSystem, type AtlasPlatform, type AtlasPlatformEngineering, type AtlasPlatformSDK, type AtlasProductPlatform, type AtlasReleaseManagement, type AtlasRuntime, type AtlasRuntimePlatform, type AtlasSDK, type AtlasServiceMesh, type AtlasSuite, type BatchAsset, type BatchCollaboration, type BatchExport, type BatchHistory, type BatchImport, type BatchSnapshot, type BubbleObject, type CloudBackup, type CloudEvent, type CloudManager, type CloudOptions, type CloudPipeline, type CloudProgress, type CloudProvider, type CloudSession, type CloudStatistics, type CloudSync, type CollaborationEvent, type CollaborationManager, type CollaborationOptions, type CollaborationPipeline, type CollaborationPresence, type CollaborationProgress, type CollaborationProvider, type CollaborationSession, type CollaborationStatistics, type CommandExecutor, type CommandHistory, ConsistencyChecker, ContextResolver, DefaultAdapterRegistry, type DeliverableContract, type DeliverableContractFor, type DeliverableContractMap, type DeliverableContractName, type DirtyRegion, type DrawCommand, type EditorCommand, type EditorDocument, type EditorEvent, type EditorObject, type EditorSelection, type EditorSession, type EditorTool, type EditorViewport, type EnterpriseAudit, type EnterpriseAuthentication, type EnterpriseAuthorization, type EnterpriseCompliance, type EnterpriseIdentity, type EnterpriseManager, type EnterprisePlatform, type EnterprisePolicyEnforcement, type EnterprisePolicyEngine, type EnterpriseProvider, type EnterpriseRisk, type EnterpriseSession, type ExportCache, type ExportEvent, type ExportManager, type ExportOptions, type ExportPipeline, type ExportProgress, type ExportProvider, type ExportSession, type ExportStatistics, type ExtensionAutoscaler, type ExtensionCluster, type ExtensionDependencyResolver, type ExtensionDiagnostics, type ExtensionEvent, type ExtensionFederation, type ExtensionGlobalRegistry, type ExtensionGovernance, type ExtensionHealth, type ExtensionInstaller, type ExtensionLoadBalancer, type ExtensionManager, type ExtensionManifest, type ExtensionMarketplace, type ExtensionOrchestrator, type ExtensionPackage, type ExtensionPermissions, type ExtensionPlatform, type ExtensionPoint, type ExtensionPolicy, type ExtensionProvider, type ExtensionRecovery, type ExtensionRegistry, type ExtensionRuntime, type ExtensionSandbox, type ExtensionServiceDiscovery, type ExtensionSignature, type ExtensionTelemetry, type ExtensionUpdater, type FocusManager, type GestureManager, type Glossary, type GlossaryTerm, type GroupObject, type HistoryEvent, type HistoryManager, type HistoryOptions, type HistoryPipeline, type HistoryProgress, type HistoryProvider, type HistorySession, type HistorySnapshot, type HistoryStatistics, type HitTestEngine, type ImageObject, type ImportConflictResolver, type ImportEvent, type ImportManager, type ImportOptions, type ImportPipeline, type ImportProgress, type ImportProvider, type ImportSession, type ImportStatistics, type InputAdapter, type InputContext, type InputEvent, type InputManager, type InputPlayback, type InputRecorder, type IntegrationSession, type Layer, type ManagedSession, type ObjectHierarchy, type PipelineContext, type PipelineEvent, PipelineExecutor, type PipelineNode, type PipelineResult, type PipelineSnapshot, type PipelineStage, type PipelineStageId, type PipelineStageResult, PipelineState, type PlatformComponent, PlatformComponentState, type PlatformEvent, type PlatformPolicy, PlatformRegistry, type PlatformTimelineEntry, type Plugin, type PluginContext, type PluginEvent, type PluginLoader, type PluginManager, type PluginPermissions, type PluginSandbox, type PluginSettings, type ProjectAssets, type ProjectEvent, type ProjectHistory, ProjectLifecycle, type ProjectResource, type ProjectSession, type ProjectSettings, type ProjectTemplate, ProjectValidator, PromptBuilder, type ProviderConfiguration, type ProviderContract, ProviderFallback, type ProviderMetric, type ProviderMetrics, ProviderRegistry, ProviderResolver, type QualityIssue, type QualityReport, type RecoveryPoint, type RenderBackend, type RenderCache, type RenderEvent, type RenderPass, type RenderPipeline, type RenderStatistics, type Renderer, ReviewState, type RuntimeSnapshot, type SceneGraph, type ShapeObject, type ShortcutManager, type StyleGuide, type Terminology, type TextObject, type Transform2D, type TranslationApproval, type TranslationBatch, type TranslationBatchId, type TranslationBudget, TranslationCache, type TranslationCapabilities, type TranslationDiagnostics, type TranslationError, TranslationErrorCode, type TranslationIntegrationPort, TranslationIntegrationRegistry, type TranslationItem, type TranslationItemId, TranslationItemState, type TranslationJob, type TranslationJobId, TranslationMemory, type TranslationMemoryEntry, type TranslationMetric, type TranslationMiddleware, type TranslationOptions, type TranslationPipeline, type TranslationPipelineId, TranslationProfiler, type TranslationProgress, type TranslationProject, type TranslationProvider, type TranslationProviderId, type TranslationQuality, TranslationQualityEvaluator, TranslationQueue, type TranslationRequest, type TranslationRequestId, type TranslationResult, type TranslationResultId, type TranslationReview, TranslationRuntime, TranslationRuntimeState, TranslationScheduler, type TranslationSession, type TranslationSessionId, type TranslationSource, TranslationSourceKind, TranslationValidator, TranslationWorker, type TranslationWorkflow, type TranslationWorkflowId, type UndoRedoManager, WorkerPool, WorkerScheduler, type WorkflowAnalytics, type WorkflowApproval, type WorkflowCondition, type WorkflowDesigner, type WorkflowEvent, WorkflowExecutor, type WorkflowHistory, type WorkflowManager, type WorkflowMarketplace, type WorkflowOptimization, type WorkflowOptions, type WorkflowPipeline, type WorkflowPolicy, type WorkflowProgress, type WorkflowProvider, type WorkflowReplay, type WorkflowRuntime, type WorkflowScheduler, type WorkflowSession, type WorkflowSimulation, type WorkflowSnapshot, type WorkflowStatistics, type WorkflowStep, type WorkflowStepId, WorkflowStepStatus, type WorkflowTemplate, type WorkflowTransition, WorkflowValidator, type WorkflowVersioning, cancelBatch, createAdapterId, createBatchSnapshot, createDeliverableContract, createPipeline, createTranslationBatch, createTranslationItem, createTranslationProgress, createTranslationRequest, createTranslationSession, deliverableContractNames, pauseBatch, resumeBatch, retryFailedItems, updateBatchState };
