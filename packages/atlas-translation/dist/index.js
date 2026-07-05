// src/adapters.ts
var DefaultAdapterRegistry = class {
  adapters = /* @__PURE__ */ new Map();
  register(adapter) {
    this.adapters.set(adapter.id, adapter);
  }
  list() {
    return [...this.adapters.values()];
  }
};
function createAdapterId(scope, name) {
  return `${scope}:${name}`;
}

// src/foundation.ts
var TranslationItemState = /* @__PURE__ */ ((TranslationItemState2) => {
  TranslationItemState2["Created"] = "created";
  TranslationItemState2["Queued"] = "queued";
  TranslationItemState2["Running"] = "running";
  TranslationItemState2["Paused"] = "paused";
  TranslationItemState2["Completed"] = "completed";
  TranslationItemState2["Failed"] = "failed";
  TranslationItemState2["Cancelled"] = "cancelled";
  return TranslationItemState2;
})(TranslationItemState || {});
var TranslationSourceKind = /* @__PURE__ */ ((TranslationSourceKind2) => {
  TranslationSourceKind2["Image"] = "image";
  TranslationSourceKind2["Clipboard"] = "clipboard";
  TranslationSourceKind2["PdfPage"] = "pdf-page";
  TranslationSourceKind2["ArchiveEntry"] = "archive-entry";
  TranslationSourceKind2["Remote"] = "remote";
  TranslationSourceKind2["Virtual"] = "virtual";
  return TranslationSourceKind2;
})(TranslationSourceKind || {});
var TranslationErrorCode = /* @__PURE__ */ ((TranslationErrorCode2) => {
  TranslationErrorCode2["ProviderUnavailable"] = "provider-unavailable";
  TranslationErrorCode2["ProviderFailed"] = "provider-failed";
  TranslationErrorCode2["PipelineFailed"] = "pipeline-failed";
  TranslationErrorCode2["ValidationFailed"] = "validation-failed";
  TranslationErrorCode2["Cancelled"] = "cancelled";
  return TranslationErrorCode2;
})(TranslationErrorCode || {});
function createTranslationProgress(total, completed = 0, failed = 0, running = 0) {
  const percent = total <= 0 ? 0 : Math.round((completed + failed) / total * 100);
  return { total, completed, failed, running, percent };
}
function createTranslationItem(id, source, metadata = {}) {
  return {
    id,
    source,
    state: "created" /* Created */,
    progress: createTranslationProgress(1),
    pipelineId: null,
    resultId: null,
    metadata
  };
}
function createTranslationRequest(id, itemId, text, options, context = {}) {
  return { id, itemId, text, context, options, createdAt: (/* @__PURE__ */ new Date()).toISOString() };
}

// src/batch.ts
var TranslationRuntimeState = /* @__PURE__ */ ((TranslationRuntimeState2) => {
  TranslationRuntimeState2["Idle"] = "idle";
  TranslationRuntimeState2["Running"] = "running";
  TranslationRuntimeState2["Paused"] = "paused";
  TranslationRuntimeState2["Completed"] = "completed";
  TranslationRuntimeState2["Failed"] = "failed";
  TranslationRuntimeState2["Cancelled"] = "cancelled";
  return TranslationRuntimeState2;
})(TranslationRuntimeState || {});
var TranslationQueue = class {
  jobs = [];
  enqueue(job) {
    this.jobs.push(job);
    this.jobs.sort((left, right) => right.priority - left.priority);
  }
  dequeue() {
    return this.jobs.shift() ?? null;
  }
  snapshot() {
    return [...this.jobs];
  }
};
var TranslationWorker = class {
  constructor(id) {
    this.id = id;
  }
  id;
  claim(queue) {
    return queue.dequeue();
  }
};
var WorkerPool = class {
  constructor(size) {
    this.size = size;
  }
  size;
  capacity() {
    return this.size;
  }
};
var WorkerScheduler = class {
  next(queue) {
    return queue.dequeue();
  }
};
var TranslationScheduler = class extends WorkerScheduler {
};
var TranslationRuntime = class {
  constructor(queue = new TranslationQueue(), scheduler = new TranslationScheduler()) {
    this.queue = queue;
    this.scheduler = scheduler;
  }
  queue;
  scheduler;
  schedule(job) {
    this.queue.enqueue(job);
  }
  next() {
    return this.scheduler.next(this.queue);
  }
};
function createTranslationBatch(id, items, metadata = {}) {
  return {
    id,
    items: [...items],
    state: "idle" /* Idle */,
    progress: summarizeProgress(items),
    metadata
  };
}
function createTranslationSession(id, name, batches, metadata = {}) {
  const items = batches.flatMap((batch) => batch.items);
  return { id, name, batches: [...batches], state: "idle" /* Idle */, progress: summarizeProgress(items), metadata };
}
function updateBatchState(batch, state) {
  return { ...batch, state };
}
function pauseBatch(batch) {
  return updateBatchState(batch, "paused" /* Paused */);
}
function resumeBatch(batch) {
  return updateBatchState(batch, "running" /* Running */);
}
function cancelBatch(batch) {
  return updateBatchState(batch, "cancelled" /* Cancelled */);
}
function retryFailedItems(batch) {
  return { ...batch, items: batch.items.map((item) => item.state === "failed" /* Failed */ ? { ...item, state: "queued" /* Queued */ } : item) };
}
function createBatchSnapshot(batch) {
  return { batch, capturedAt: (/* @__PURE__ */ new Date()).toISOString() };
}
function summarizeProgress(items) {
  const completed = items.filter((item) => item.state === "completed" /* Completed */).length;
  const failed = items.filter((item) => item.state === "failed" /* Failed */).length;
  const running = items.filter((item) => item.state === "running" /* Running */).length;
  return createTranslationProgress(items.length, completed, failed, running);
}

// src/deliverable-contracts.ts
var deliverableContractNames = [
  "AIAgentGoal",
  "AIAgentMetadata",
  "AIAgentPlan",
  "AIAgentResult",
  "AIAgentTask",
  "AICapability",
  "AIContextMetadata",
  "AIContextPriority",
  "AIContextSource",
  "AIEmbeddingMetadata",
  "AIEmbeddingRequest",
  "AIEmbeddingResult",
  "AIEventMetadata",
  "AIEventType",
  "AIExecutionContext",
  "AIInferenceOperation",
  "AIInferenceRequest",
  "AIInferenceResult",
  "AIInferenceSessionMetadata",
  "AIInferenceSessionSnapshot",
  "AIInferenceSessionState",
  "AIMetadata",
  "AIModelCapability",
  "AIModelMetadata",
  "AIModelVersion",
  "AIOptionDefinition",
  "AIOptionsSchema",
  "AIPipelineContext",
  "AIProgressSnapshot",
  "AIProgressState",
  "AIPromptContext",
  "AIPromptTemplate",
  "AIPromptVariable",
  "AIProviderResolver",
  "AIProviderStatistics",
  "AIReasoningSessionMetadata",
  "AIReasoningSessionSnapshot",
  "AIReasoningSessionState",
  "AIReasoningStep",
  "AIRegistry",
  "AIRetrievalMetadata",
  "AIRetrievalRequest",
  "AIRetrievalResult",
  "AIRetrievalStrategy",
  "AISafetyMetadata",
  "AISafetyPolicy",
  "AISafetyResult",
  "AISafetyRule",
  "AIStage",
  "AISummaryStatistics",
  "AITimingStatistics",
  "AITokenSequence",
  "AITokenStatistics",
  "AITokenizerMetadata",
  "AIToolDefinition",
  "AIToolInvocation",
  "AIToolResult",
  "AdapterContext",
  "ApprovalDecision",
  "ApprovalMetadata",
  "ApprovalPolicy",
  "ApprovalRequest",
  "ApprovalResponse",
  "ApprovalRoute",
  "AssetCacheEntry",
  "AssetCachePolicy",
  "AssetCacheStatistics",
  "AssetCapability",
  "AssetEventMetadata",
  "AssetEventType",
  "AssetMetadata",
  "AssetOptionDefinition",
  "AssetOptionsSchema",
  "AssetPipelineContext",
  "AssetProviderResolver",
  "AssetRegistry",
  "AssetSessionMetadata",
  "AssetSessionState",
  "AssetStage",
  "AssetStageProgress",
  "AssetTimingStatistics",
  "AtlasAIGateway",
  "AtlasAIPlatformMetadata",
  "AtlasAgentBuilder",
  "AtlasAgentCapabilities",
  "AtlasAgentCatalog",
  "AtlasAgentManifest",
  "AtlasAgentMetadata",
  "AtlasAgentPackage",
  "AtlasAgentPackageBuilder",
  "AtlasAgentProject",
  "AtlasAgentRegistry",
  "AtlasAgentRuntimeCapabilities",
  "AtlasAgentRuntimeMetadata",
  "AtlasAgentSession",
  "AtlasAnomalyEngine",
  "AtlasApplicationBuilder",
  "AtlasApplicationContext",
  "AtlasApplicationLifecycle",
  "AtlasApplicationMetadata",
  "AtlasApprovalPolicy",
  "AtlasArtifact",
  "AtlasAuditRegistry",
  "AtlasAutonomousMetadata",
  "AtlasBootstrapContext",
  "AtlasBootstrapMetadata",
  "AtlasBootstrapResult",
  "AtlasBootstrapValidator",
  "AtlasCLICommand",
  "AtlasCLIContext",
  "AtlasCLIMetadata",
  "AtlasCLIRegistry",
  "AtlasCloudDeployment",
  "AtlasCloudEnvironment",
  "AtlasCloudMetadata",
  "AtlasCloudProject",
  "AtlasCloudRuntime",
  "AtlasCloudScaling",
  "AtlasClusterCapabilities",
  "AtlasClusterMetadata",
  "AtlasClusterNode",
  "AtlasClusterTopology",
  "AtlasCommercialMetadata",
  "AtlasConfigurationRegistry",
  "AtlasControlPlaneCapabilities",
  "AtlasControlPlaneMetadata",
  "AtlasDataPlaneCapabilities",
  "AtlasDataPlaneMetadata",
  "AtlasDecisionEngine",
  "AtlasDeliveryEnvironment",
  "AtlasDeliveryMetadata",
  "AtlasDeliveryPipeline",
  "AtlasDeliveryPolicy",
  "AtlasDeployment",
  "AtlasDeveloperPlatformBuilder",
  "AtlasDeveloperPlatformCapabilities",
  "AtlasDeveloperPlatformContext",
  "AtlasDeveloperPlatformMetadata",
  "AtlasDistributedCapabilities",
  "AtlasDistributedKernelMetadata",
  "AtlasDistributionMetadata",
  "AtlasDistributionResult",
  "AtlasEcosystemCapabilities",
  "AtlasEcosystemMetadata",
  "AtlasEditionCapabilities",
  "AtlasEditionCatalog",
  "AtlasEditionDefinition",
  "AtlasEditionMetadata",
  "AtlasEngineeringServiceCatalog",
  "AtlasEnvironmentBuilder",
  "AtlasEnvironmentCapabilities",
  "AtlasEnvironmentContext",
  "AtlasEnvironmentMetadata",
  "AtlasExecutionContext",
  "AtlasExecutionMetadata",
  "AtlasExecutionRuntime",
  "AtlasFeatureCatalog",
  "AtlasFeatureEvaluator",
  "AtlasFeatureMetadata",
  "AtlasFeaturePolicy",
  "AtlasFeatureRegistry",
  "AtlasFederationCapabilities",
  "AtlasFederationCluster",
  "AtlasFederationMetadata",
  "AtlasFederationTopology",
  "AtlasFleetHealth",
  "AtlasFleetManager",
  "AtlasFleetMetadata",
  "AtlasFleetRegistry",
  "AtlasFleetTopology",
  "AtlasGlobalCapabilities",
  "AtlasGlobalPlatformContext",
  "AtlasGlobalPlatformMetadata",
  "AtlasGlobalRegistry",
  "AtlasGoldenPathCatalog",
  "AtlasGovernanceMetadata",
  "AtlasHostBuilder",
  "AtlasHostCapabilities",
  "AtlasHostContext",
  "AtlasHostMetadata",
  "AtlasIncidentCorrelation",
  "AtlasKernelBuilder",
  "AtlasKernelCapabilities",
  "AtlasKernelContext",
  "AtlasKernelMetadata",
  "AtlasKernelNode",
  "AtlasKernelTopology",
  "AtlasLicenseManager",
  "AtlasLogRegistry",
  "AtlasMarketplaceMetadata",
  "AtlasMemoryMetadata",
  "AtlasMemoryPolicy",
  "AtlasMemoryRegistry",
  "AtlasMemoryStore",
  "AtlasMeshSecurity",
  "AtlasMeshTelemetry",
  "AtlasMetricsRegistry",
  "AtlasModelRegistry",
  "AtlasObservationEngine",
  "AtlasOperatingContext",
  "AtlasOperatingLifecycle",
  "AtlasOperatingMetadata",
  "AtlasOperatingSystemBuilder",
  "AtlasOperatingSystemCapabilities",
  "AtlasOperatingSystemContext",
  "AtlasOperatingSystemMetadata",
  "AtlasOperationalIntelligence",
  "AtlasPlanningEngine",
  "AtlasPlatformBuilder",
  "AtlasPlatformCapabilities",
  "AtlasPlatformContext",
  "AtlasPlatformCoordinator",
  "AtlasPlatformEngineeringCapabilities",
  "AtlasPlatformEngineeringMetadata",
  "AtlasPlatformMetadata",
  "AtlasPlatformRegistry",
  "AtlasPlatformSDKBuilder",
  "AtlasPlatformSDKCapabilities",
  "AtlasPlatformSDKContext",
  "AtlasPlatformSDKMetadata",
  "AtlasPolicyEngine",
  "AtlasPolicyRegistry",
  "AtlasPredictionEngine",
  "AtlasProductCatalog",
  "AtlasProductMetadata",
  "AtlasPromptRegistry",
  "AtlasPublisherRegistry",
  "AtlasReleaseChannel",
  "AtlasReleaseMetadata",
  "AtlasReleasePolicy",
  "AtlasReleaseRegistry",
  "AtlasReleaseVersion",
  "AtlasRepository",
  "AtlasResourceRegistry",
  "AtlasRuntimeCapabilities",
  "AtlasRuntimeContext",
  "AtlasRuntimeLifecycle",
  "AtlasRuntimeManager",
  "AtlasRuntimeMetadata",
  "AtlasRuntimeProfile",
  "AtlasRuntimeRegistry",
  "AtlasRuntimeTelemetry",
  "AtlasSDKBuilder",
  "AtlasSDKCapabilities",
  "AtlasSDKContext",
  "AtlasSDKMetadata",
  "AtlasScenarioEngine",
  "AtlasScheduler",
  "AtlasServiceCatalog",
  "AtlasServiceRegistry",
  "AtlasSimulationEngine",
  "AtlasSubscriptionManager",
  "AtlasSuiteCapabilities",
  "AtlasSuiteCatalog",
  "AtlasSuiteDefinition",
  "AtlasSuiteMetadata",
  "AtlasSystemRegistry",
  "AtlasTelemetryMetadata",
  "AtlasTenantManager",
  "AtlasTopologyRegistry",
  "AtlasTraceRegistry",
  "AtlasTrafficPolicy",
  "AtlasTwinMetadata",
  "AtlasTwinModel",
  "AtlasTwinRegistry",
  "AtlasWorkflow",
  "AtlasWorkflowMetadata",
  "AtlasWorkflowPolicy",
  "AtlasWorkflowScheduler",
  "AtlasWorkload",
  "AtlasWorkloadRegistry",
  "BackendCapabilities",
  "BackendType",
  "BatchAssetResult",
  "BatchAssetSession",
  "BatchCollaborationResult",
  "BatchCollaborationSession",
  "BatchExportResult",
  "BatchExportSession",
  "BatchHistoryResult",
  "BatchHistorySession",
  "BatchImportResult",
  "BatchImportSession",
  "BrowserInputAdapter",
  "BubbleGeometry",
  "BubbleType",
  "CacheEntry",
  "CacheKey",
  "CloudAuthentication",
  "CloudBackupMetadata",
  "CloudBackupPolicy",
  "CloudCapability",
  "CloudEventMetadata",
  "CloudEventType",
  "CloudMetadata",
  "CloudOperation",
  "CloudOptionDefinition",
  "CloudOptionsSchema",
  "CloudPipelineContext",
  "CloudProgressSnapshot",
  "CloudProgressState",
  "CloudProviderResolver",
  "CloudProviderStatistics",
  "CloudRegistry",
  "CloudRestorePoint",
  "CloudResult",
  "CloudRetentionPolicy",
  "CloudSessionMetadata",
  "CloudSessionSnapshot",
  "CloudSessionState",
  "CloudStage",
  "CloudSummaryStatistics",
  "CloudSyncDirection",
  "CloudSyncMetadata",
  "CloudSyncPolicy",
  "CloudSyncState",
  "CloudTimingStatistics",
  "CloudTransferStatistics",
  "CollaborationCapability",
  "CollaborationEventMetadata",
  "CollaborationEventType",
  "CollaborationMetadata",
  "CollaborationOptionDefinition",
  "CollaborationOptionsSchema",
  "CollaborationPipelineContext",
  "CollaborationProgressState",
  "CollaborationProviderResolver",
  "CollaborationRegistry",
  "CollaborationSessionMetadata",
  "CollaborationSessionSnapshot",
  "CollaborationSessionState",
  "CollaborationStage",
  "CollaborationSummaryStatistics",
  "CollaborationTimingStatistics",
  "CommandContext",
  "CommandExecution",
  "CommandExecutionResult",
  "CommandHistoryEntry",
  "CommandResult",
  "ConflictResolution",
  "ConflictStrategy",
  "ContextSnapshot",
  "ConversationMemoryEntry",
  "ConversationMemoryMetadata",
  "ConversationMemoryPolicy",
  "CursorPresence",
  "DirtyRectangle",
  "DirtyRegionCollection",
  "DocumentState",
  "DrawCommandMetadata",
  "DrawCommandType",
  "EditorEventType",
  "EditorState",
  "EnterpriseAuditEvent",
  "EnterpriseAuditMetadata",
  "EnterpriseAuditQuery",
  "EnterpriseAuditReport",
  "EnterpriseAuthenticationContext",
  "EnterpriseAuthenticationMetadata",
  "EnterpriseAuthenticationRequest",
  "EnterpriseAuthenticationResult",
  "EnterpriseAuthorizationContext",
  "EnterpriseAuthorizationMetadata",
  "EnterpriseAuthorizationRequest",
  "EnterpriseAuthorizationResult",
  "EnterpriseCapability",
  "EnterpriseComplianceContext",
  "EnterpriseComplianceControl",
  "EnterpriseComplianceReport",
  "EnterpriseComplianceResult",
  "EnterpriseContext",
  "EnterpriseEnforcementContext",
  "EnterpriseEnforcementMetadata",
  "EnterpriseEnforcementResult",
  "EnterpriseIdentityAttributes",
  "EnterpriseIdentityGroup",
  "EnterpriseIdentityMetadata",
  "EnterpriseIdentityProfile",
  "EnterpriseLifecycle",
  "EnterpriseManagerMetadata",
  "EnterpriseMetadata",
  "EnterpriseObligationProcessor",
  "EnterprisePlatformBuilder",
  "EnterprisePlatformCapabilities",
  "EnterprisePlatformContext",
  "EnterprisePlatformMetadata",
  "EnterprisePolicyContext",
  "EnterprisePolicyDecision",
  "EnterprisePolicyEvaluation",
  "EnterprisePolicyMetadata",
  "EnterpriseProviderRegistry",
  "EnterpriseProviderResult",
  "EnterpriseRegistry",
  "EnterpriseRiskAssessment",
  "EnterpriseRiskReport",
  "EnterpriseRiskResult",
  "EnterpriseRiskScore",
  "EnterpriseSessionContext",
  "EnterpriseSessionManager",
  "EnterpriseSessionMetadata",
  "EnterpriseSessionResult",
  "ExportCacheEntry",
  "ExportCacheKey",
  "ExportCapability",
  "ExportEventMetadata",
  "ExportEventType",
  "ExportMetadata",
  "ExportOptionDefinition",
  "ExportOptionsSchema",
  "ExportPipelineContext",
  "ExportProviderResolver",
  "ExportRegistry",
  "ExportSessionMetadata",
  "ExportSessionState",
  "ExportStage",
  "ExportStageProgress",
  "ExportStageStatistics",
  "ExportTimingStatistics",
  "ExtensionCapability",
  "ExtensionCapabilityGrant",
  "ExtensionClusterMembership",
  "ExtensionClusterMetadata",
  "ExtensionClusterNode",
  "ExtensionClusterTopology",
  "ExtensionCompatibility",
  "ExtensionDependencyGraph",
  "ExtensionDependencyMetadata",
  "ExtensionDependencyNode",
  "ExtensionDependencyResult",
  "ExtensionDiagnosticIssue",
  "ExtensionDiagnosticRecommendation",
  "ExtensionDiagnosticReport",
  "ExtensionEndpoint",
  "ExtensionEventContext",
  "ExtensionEventMetadata",
  "ExtensionEventType",
  "ExtensionFederationCluster",
  "ExtensionFederationMetadata",
  "ExtensionFederationPolicy",
  "ExtensionFederationTopology",
  "ExtensionGlobalEntry",
  "ExtensionGlobalMetadata",
  "ExtensionGlobalQuery",
  "ExtensionGlobalResult",
  "ExtensionGovernanceContext",
  "ExtensionGovernanceMetadata",
  "ExtensionGovernanceReport",
  "ExtensionGovernanceResult",
  "ExtensionHealthAssessment",
  "ExtensionHealthIndicator",
  "ExtensionHealthMetadata",
  "ExtensionHealthSnapshot",
  "ExtensionHealthState",
  "ExtensionIdentity",
  "ExtensionInstallation",
  "ExtensionInstallationMetadata",
  "ExtensionInstallationOptions",
  "ExtensionInstallationResult",
  "ExtensionLifecycle",
  "ExtensionLoadBalancingPolicy",
  "ExtensionLoadBalancingStrategy",
  "ExtensionLookup",
  "ExtensionManifestMetadata",
  "ExtensionMetadata",
  "ExtensionPackageEntry",
  "ExtensionPackageMetadata",
  "ExtensionPackageResource",
  "ExtensionPackageValidationResult",
  "ExtensionPermissionMetadata",
  "ExtensionPermissionResult",
  "ExtensionPermissionRule",
  "ExtensionPermissionSet",
  "ExtensionPlacement",
  "ExtensionPlacementMetadata",
  "ExtensionPlacementStrategy",
  "ExtensionPlatformBuilder",
  "ExtensionPlatformCapabilities",
  "ExtensionPlatformContext",
  "ExtensionPlatformMetadata",
  "ExtensionPolicyMetadata",
  "ExtensionPolicyResult",
  "ExtensionPolicyRule",
  "ExtensionPolicySet",
  "ExtensionRecoveryMetadata",
  "ExtensionRecoveryPlan",
  "ExtensionRecoveryResult",
  "ExtensionRecoveryStrategy",
  "ExtensionRegistryEntry",
  "ExtensionRegistryMetadata",
  "ExtensionRegistryQuery",
  "ExtensionRegistryResult",
  "ExtensionRequest",
  "ExtensionResolver",
  "ExtensionResult",
  "ExtensionRoutingDecision",
  "ExtensionRuntimeContext",
  "ExtensionRuntimeMetadata",
  "ExtensionRuntimeSnapshot",
  "ExtensionRuntimeState",
  "ExtensionSandboxContext",
  "ExtensionSandboxMetadata",
  "ExtensionScalingMetadata",
  "ExtensionScalingPlan",
  "ExtensionScalingPolicy",
  "ExtensionScalingRecommendation",
  "ExtensionSchedulingPolicy",
  "ExtensionServiceEndpoint",
  "ExtensionServiceMetadata",
  "ExtensionServiceRegistration",
  "ExtensionServiceResolver",
  "ExtensionSignatureMetadata",
  "ExtensionTelemetryEvent",
  "ExtensionTelemetryMetadata",
  "ExtensionTelemetryMetrics",
  "ExtensionTelemetrySnapshot",
  "ExtensionTrustLevel",
  "ExtensionTrustPolicy",
  "ExtensionUpdateMetadata",
  "ExtensionUpdatePlan",
  "ExtensionUpdatePolicy",
  "ExtensionUpdateResult",
  "ExtensionVerificationResult",
  "FillStyle",
  "FocusState",
  "FocusTarget",
  "FrameStatistics",
  "GestureEvent",
  "GestureState",
  "GestureType",
  "GlossaryEntry",
  "GroupProperties",
  "HierarchyValidationResult",
  "HistoryCapability",
  "HistoryEventMetadata",
  "HistoryEventType",
  "HistoryMetadata",
  "HistoryOptionDefinition",
  "HistoryOptionsSchema",
  "HistoryPipelineContext",
  "HistoryProviderResolver",
  "HistoryRegistry",
  "HistorySessionMetadata",
  "HistorySessionState",
  "HistorySnapshotFactory",
  "HistorySnapshotMetadata",
  "HistoryStage",
  "HistoryStageProgress",
  "HistorySummaryStatistics",
  "HistoryTimingStatistics",
  "HitTarget",
  "HitTestContext",
  "HitTestResult",
  "ImageProperties",
  "ImportCapability",
  "ImportEventMetadata",
  "ImportEventType",
  "ImportMetadata",
  "ImportOptionDefinition",
  "ImportOptionsSchema",
  "ImportPipelineContext",
  "ImportProviderResolver",
  "ImportRegistry",
  "ImportSessionMetadata",
  "ImportSessionState",
  "ImportStage",
  "ImportStageProgress",
  "ImportStageStatistics",
  "ImportTimingStatistics",
  "InputDispatcher",
  "InputEventType",
  "InputRecording",
  "InputRecordingSession",
  "InputRuntimeEvent",
  "InputRuntimeEventMetadata",
  "InputRuntimeEventType",
  "LayerMetadata",
  "MarketplaceEntry",
  "MarketplaceManifest",
  "MarketplaceMetadata",
  "MarketplaceQuery",
  "MarketplaceRepository",
  "ModifierKeys",
  "ObjectMetadata",
  "ObjectNode",
  "ObjectRelationship",
  "ObjectRepository",
  "ParticipantPresence",
  "PermissionCategory",
  "PermissionManifest",
  "PlaybackOptions",
  "PlaybackState",
  "PluginCapability",
  "PluginEventMetadata",
  "PluginEventType",
  "PluginLoadResult",
  "PluginManifest",
  "PluginManifestValidator",
  "PluginMetadata",
  "PluginPackage",
  "PluginRegistry",
  "PluginServices",
  "PluginSettingDefinition",
  "PluginSettingsSchema",
  "PluginState",
  "Point2D",
  "PresenceStatus",
  "ProgressSnapshot",
  "ProjectEventType",
  "ProjectHistoryEntry",
  "ProjectMetadata",
  "ProjectResources",
  "ProjectTemplateMetadata",
  "ProjectValidationIssue",
  "ProjectValidationResult",
  "ProviderConfigurationSchema",
  "ProviderStatistics",
  "QualityRule",
  "RegisteredExtension",
  "RenderContext",
  "RenderEventMetadata",
  "RenderEventType",
  "RenderPassContext",
  "RenderPassType",
  "RenderResult",
  "ReplayStatistics",
  "ReviewComment",
  "SandboxCapability",
  "SandboxContext",
  "Scale2D",
  "SelectionItem",
  "SelectionPresence",
  "SessionState",
  "ShapeGeometry",
  "ShapeType",
  "ShortcutContext",
  "ShortcutDefinition",
  "ShortcutScope",
  "StrokeStyle",
  "StyleRule",
  "SynchronizationProgress",
  "SynchronizationStatistics",
  "TextAlignment",
  "TextProperties",
  "TimingStatistics",
  "ToolContext",
  "ToolType",
  "TranslationCacheEntry",
  "TranslationContext",
  "TranslationHandler",
  "TranslationIssue",
  "TranslationPauseResume",
  "TranslationRecovery",
  "TranslationRuntimeControl",
  "Typography",
  "UndoRedoState",
  "VectorDocument",
  "VectorMetadata",
  "VectorQuery",
  "VectorSearchResult",
  "ViewportPresence",
  "ViewportState",
  "WorkflowAnalyticsReport",
  "WorkflowBottleneck",
  "WorkflowCapability",
  "WorkflowDefinition",
  "WorkflowDiff",
  "WorkflowEdge",
  "WorkflowEventMetadata",
  "WorkflowEventType",
  "WorkflowExecutionContext",
  "WorkflowExecutionPlan",
  "WorkflowExecutionStatistics",
  "WorkflowHistoryEntry",
  "WorkflowInsight",
  "WorkflowMetadata",
  "WorkflowNode",
  "WorkflowNodeProgress",
  "WorkflowNodeStatistics",
  "WorkflowOptimizationEngine",
  "WorkflowOptimizationMetadata",
  "WorkflowOptimizationReport",
  "WorkflowOptionDefinition",
  "WorkflowOptionsSchema",
  "WorkflowPipelineContext",
  "WorkflowPolicyMetadata",
  "WorkflowPolicyResult",
  "WorkflowPolicySet",
  "WorkflowProgressSnapshot",
  "WorkflowProgressState",
  "WorkflowProviderResolver",
  "WorkflowRecommendation",
  "WorkflowRegistry",
  "WorkflowReplayMetadata",
  "WorkflowReplayOptions",
  "WorkflowReplaySession",
  "WorkflowReplaySnapshot",
  "WorkflowRequest",
  "WorkflowResult",
  "WorkflowRule",
  "WorkflowRuntimeContext",
  "WorkflowRuntimeMetadata",
  "WorkflowRuntimeSnapshot",
  "WorkflowRuntimeState",
  "WorkflowScheduleMetadata",
  "WorkflowSessionMetadata",
  "WorkflowSessionSnapshot",
  "WorkflowSessionState",
  "WorkflowSimulationEngine",
  "WorkflowSimulationMetadata",
  "WorkflowSimulationRequest",
  "WorkflowSimulationResult",
  "WorkflowStage",
  "WorkflowSummaryStatistics",
  "WorkflowTemplateEngine",
  "WorkflowTemplateMetadata",
  "WorkflowTemplateParameter",
  "WorkflowTimingStatistics",
  "WorkflowTrend",
  "WorkflowTrigger",
  "WorkflowTriggerType",
  "WorkflowValidationIssue",
  "WorkflowValidationResult",
  "WorkflowVersionMetadata",
  "WorkflowVersionState",
  "WritingMode"
];
function createDeliverableContract(name, id, metadata = {}) {
  return { id, kind: name, metadata };
}

// src/integration.ts
var TranslationIntegrationRegistry = class {
  ports = /* @__PURE__ */ new Map();
  register(port) {
    this.ports.set(port.id, port);
  }
  list() {
    return [...this.ports.values()];
  }
};
var TranslationProfiler = class {
  metrics = /* @__PURE__ */ new Map();
  record(metric) {
    this.metrics.set(metric.token, metric);
  }
  diagnostics(budgets = []) {
    const metrics = [...this.metrics.values()];
    const issues = budgets.flatMap((budget) => {
      const metric = this.metrics.get(budget.metricToken);
      return metric !== void 0 && metric.value > budget.threshold ? [`${budget.metricToken} exceeded budget.`] : [];
    });
    return { issues, metrics, checkedAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
};

// src/pipeline.ts
var PipelineState = /* @__PURE__ */ ((PipelineState2) => {
  PipelineState2["Ready"] = "ready";
  PipelineState2["Running"] = "running";
  PipelineState2["Completed"] = "completed";
  PipelineState2["Failed"] = "failed";
  PipelineState2["Cancelled"] = "cancelled";
  return PipelineState2;
})(PipelineState || {});
var PipelineExecutor = class {
  async execute(pipeline, context) {
    const stageResults = [];
    let state = "completed" /* Completed */;
    for (const stage of pipeline.stages) {
      const result = await stage.execute(context);
      stageResults.push(result);
      if (result.state === "failed" /* Failed */ || result.state === "cancelled" /* Cancelled */) {
        state = result.state;
        break;
      }
    }
    return { pipelineId: pipeline.id, state, stageResults, result: null };
  }
  snapshot(pipeline, result) {
    const failed = result.stageResults.find((stageResult) => stageResult.state === "failed" /* Failed */);
    return {
      pipelineId: pipeline.id,
      state: result.state,
      completedStages: result.stageResults.filter((stageResult) => stageResult.state === "completed" /* Completed */).map((stageResult) => stageResult.stageId),
      failedStage: failed?.stageId ?? null,
      capturedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
};
function createPipeline(id, stages) {
  return { id, stages: [...stages] };
}

// src/platform.ts
var PlatformComponentState = /* @__PURE__ */ ((PlatformComponentState2) => {
  PlatformComponentState2["Registered"] = "registered";
  PlatformComponentState2["Active"] = "active";
  PlatformComponentState2["Suspended"] = "suspended";
  PlatformComponentState2["Retired"] = "retired";
  return PlatformComponentState2;
})(PlatformComponentState || {});
var PlatformRegistry = class {
  components = /* @__PURE__ */ new Map();
  register(component) {
    this.components.set(component.id, component);
  }
  get(id) {
    return this.components.get(id) ?? null;
  }
  list() {
    return [...this.components.values()];
  }
};
var AtlasKernel = class {
  constructor(registry = new PlatformRegistry()) {
    this.registry = registry;
  }
  registry;
  register(component) {
    this.registry.register(component);
  }
  snapshot(id) {
    return { id, components: this.registry.list(), capturedAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
};
var AtlasOperatingSystem = class {
  constructor(kernel = new AtlasKernel()) {
    this.kernel = kernel;
  }
  kernel;
  boot(component) {
    this.kernel.register(component);
    return this.kernel.snapshot(`snapshot:${component.id}`);
  }
};

// src/project.ts
var ProjectLifecycle = /* @__PURE__ */ ((ProjectLifecycle2) => {
  ProjectLifecycle2["Created"] = "created";
  ProjectLifecycle2["Active"] = "active";
  ProjectLifecycle2["Archived"] = "archived";
  return ProjectLifecycle2;
})(ProjectLifecycle || {});
var ProjectValidator = class {
  validate(project) {
    return project.name.trim().length === 0 ? ["Project name is required."] : [];
  }
};

// src/providers.ts
var ProviderRegistry = class {
  providers = /* @__PURE__ */ new Map();
  register(provider) {
    this.providers.set(provider.id, provider);
  }
  get(id) {
    return this.providers.get(id) ?? null;
  }
  list() {
    return [...this.providers.values()];
  }
};
var ProviderResolver = class {
  constructor(registry) {
    this.registry = registry;
  }
  registry;
  resolve(options) {
    return this.registry.list().find((provider) => provider.capabilities.languages.includes(options.targetLanguage)) ?? null;
  }
};
var ProviderFallback = class {
  constructor(providers) {
    this.providers = providers;
  }
  providers;
  async translate(request) {
    let lastError = null;
    for (const provider of this.providers) {
      try {
        return await provider.translate(request);
      } catch (error) {
        lastError = error;
      }
    }
    throw lastError instanceof Error ? lastError : new Error("All translation providers failed.");
  }
};
var TranslationCache = class {
  values = /* @__PURE__ */ new Map();
  get(key) {
    return this.values.get(key) ?? null;
  }
  set(key, result) {
    this.values.set(key, result);
  }
};
var PromptBuilder = class {
  build(request, context = {}) {
    return JSON.stringify({ text: request.text, options: request.options, context });
  }
};
var ContextResolver = class {
  resolve(request, additions = {}) {
    return { ...request.context, ...additions };
  }
};

// src/quality.ts
var TranslationMemory = class {
  entries = /* @__PURE__ */ new Map();
  add(entry) {
    this.entries.set(entry.source, entry);
  }
  lookup(source) {
    return this.entries.get(source) ?? null;
  }
};
var ConsistencyChecker = class {
  check(result, glossary = null) {
    const issues = glossary === null ? [] : glossary.terms.filter((term) => result.text.includes(term.source)).map((term) => ({ code: "glossary-source-leak", message: `Source term remains: ${term.source}`, severity: "warning" }));
    return { resultId: result.id, confidence: result.confidence, issues, checkedAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
};
var TranslationValidator = class {
  validate(request, result) {
    const issues = result.text.trim().length === 0 ? [{ code: "empty-result", message: "Translation result is empty.", severity: "error" }] : [];
    const confidence = request.text.trim().length === 0 ? 0 : result.confidence;
    return { resultId: result.id, confidence, issues, checkedAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
};
var TranslationQualityEvaluator = class {
  evaluate(report) {
    return { resultId: report.resultId, report, metadata: {} };
  }
};
var ReviewState = /* @__PURE__ */ ((ReviewState2) => {
  ReviewState2["Pending"] = "pending";
  ReviewState2["Approved"] = "approved";
  ReviewState2["Rejected"] = "rejected";
  return ReviewState2;
})(ReviewState || {});

// src/workflow.ts
var WorkflowStepStatus = /* @__PURE__ */ ((WorkflowStepStatus2) => {
  WorkflowStepStatus2["Ready"] = "ready";
  WorkflowStepStatus2["Running"] = "running";
  WorkflowStepStatus2["Completed"] = "completed";
  WorkflowStepStatus2["Failed"] = "failed";
  WorkflowStepStatus2["Skipped"] = "skipped";
  return WorkflowStepStatus2;
})(WorkflowStepStatus || {});
var WorkflowExecutor = class {
  execute(workflow, batch) {
    return {
      workflowId: workflow.id,
      completedSteps: workflow.steps.map((step) => step.id),
      capturedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
};
var WorkflowValidator = class {
  validate(workflow) {
    return workflow.steps.length === 0 ? ["Workflow must contain at least one step."] : [];
  }
};
export {
  AtlasKernel,
  AtlasOperatingSystem,
  ConsistencyChecker,
  ContextResolver,
  DefaultAdapterRegistry,
  PipelineExecutor,
  PipelineState,
  PlatformComponentState,
  PlatformRegistry,
  ProjectLifecycle,
  ProjectValidator,
  PromptBuilder,
  ProviderFallback,
  ProviderRegistry,
  ProviderResolver,
  ReviewState,
  TranslationCache,
  TranslationErrorCode,
  TranslationIntegrationRegistry,
  TranslationItemState,
  TranslationMemory,
  TranslationProfiler,
  TranslationQualityEvaluator,
  TranslationQueue,
  TranslationRuntime,
  TranslationRuntimeState,
  TranslationScheduler,
  TranslationSourceKind,
  TranslationValidator,
  TranslationWorker,
  WorkerPool,
  WorkerScheduler,
  WorkflowExecutor,
  WorkflowStepStatus,
  WorkflowValidator,
  cancelBatch,
  createAdapterId,
  createBatchSnapshot,
  createDeliverableContract,
  createPipeline,
  createTranslationBatch,
  createTranslationItem,
  createTranslationProgress,
  createTranslationRequest,
  createTranslationSession,
  deliverableContractNames,
  pauseBatch,
  resumeBatch,
  retryFailedItems,
  updateBatchState
};
//# sourceMappingURL=index.js.map