import type { AtlasDocument, BubbleDocument, LayerDocument, PageDocument, ProjectDocument } from '@atlas/atlas-document';
import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import { RenderResultStatus, type RenderContext, type RenderResult } from '../contracts';
import { createRenderNode, RenderNodeKind, type RenderNode, type RenderTree } from '../tree';

export class DocumentRenderEngine {
  public render(context: RenderContext): RenderResult {
    return {
      status: RenderResultStatus.Success,
      tree: this.createTree(context.document),
      errors: []
    };
  }

  public createTree(document: AtlasDocument): RenderTree {
    const workspace = document.workspace;
    const root = createRenderNode(
      this.nodeId('root', String(document.id)),
      String(document.id),
      RenderNodeKind.Root,
      {
        documentId: String(document.id),
        projectCount: document.projectCount
      },
      [
        createRenderNode(
          this.nodeId('workspace', String(workspace.id)),
          String(workspace.id),
          RenderNodeKind.Workspace,
          {
            name: workspace.name,
            projectCount: workspace.projectCount
          },
          workspace.projects.map((project) => this.createProjectNode(project))
        )
      ]
    );

    return {
      root,
      createdAt: new Date().toISOString() as Timestamp
    };
  }

  private createProjectNode(project: ProjectDocument): RenderNode {
    return createRenderNode(
      this.nodeId('project', String(project.id)),
      String(project.id),
      RenderNodeKind.Project,
      {
        name: project.name,
        pageCount: project.pageCount
      },
      project.pages.map((page) => this.createPageNode(page))
    );
  }

  private createPageNode(page: PageDocument): RenderNode {
    return createRenderNode(
      this.nodeId('page', String(page.id)),
      String(page.id),
      RenderNodeKind.Page,
      {
        name: page.name,
        index: page.index,
        layerCount: page.layerCount
      },
      page.layers.map((layer) => this.createLayerNode(layer))
    );
  }

  private createLayerNode(layer: LayerDocument): RenderNode {
    return createRenderNode(
      this.nodeId('layer', String(layer.id)),
      String(layer.id),
      RenderNodeKind.Layer,
      {
        name: layer.name,
        bubbleCount: layer.bubbleCount
      },
      layer.bubbles.map((bubble) => this.createBubbleNode(bubble))
    );
  }

  private createBubbleNode(bubble: BubbleDocument): RenderNode {
    return createRenderNode(
      this.nodeId('bubble', String(bubble.id)),
      String(bubble.id),
      RenderNodeKind.Bubble,
      {
        hasOcr: bubble.hasOCR(),
        hasTranslation: bubble.hasTranslation(),
        geometry: this.asJsonObject(bubble.geometry),
        content: this.asJsonObject(bubble.content)
      }
    );
  }

  private nodeId(kind: string, sourceId: string): ID<'render-node'> {
    return `render:${kind}:${sourceId}` as ID<'render-node'>;
  }

  private asJsonObject(value: object): JsonObject {
    return value as JsonObject;
  }
}
