// Inspiration: https://github.com/typescript-eslint/typescript-eslint/blob/a91bb9e264544fc635a44468c2543b94fa83ac1c/packages/eslint-plugin/src/rules/no-unnecessary-type-assertion.ts

import { ESLintUtils, AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { TSESTree } from "@typescript-eslint/utils";
import type { RuleModule } from "@typescript-eslint/utils/ts-eslint";

type TOptions = [];
type TMessageId = "asAnyFirst" | "chainTooLong";

const createRule = ESLintUtils.RuleCreator((name) => name);

export const name = "unsafe-casting";

export const rule: RuleModule<TMessageId, TOptions> = createRule<
  TOptions,
  TMessageId
>({
  name,
  meta: {
    docs: {
      description: "Disallow unsafe type castings",
    },
    fixable: "code",
    messages: {
      asAnyFirst: "Explicitly cast to `any` before casting to another type.",
      chainTooLong:
        "Having a chain of more than two type castings doesn't make sense.",
    },
    schema: [],
    type: "problem",
  },
  defaultOptions: [],
  create: (context) => {
    const foundNodeSet = new Set<TSESTree.TSAsExpression>();
    const visitedOutermostNodeSet = new Set<TSESTree.TSAsExpression>();

    return {
      // Skip `TSTypeAssertion` because it should be banned by `@typescript-eslint/consistent-type-assertions`
      "TSAsExpression"(node: TSESTree.TSAsExpression): void {
        foundNodeSet.add(node);
      },

      "Program:exit"(): void {
        for (const node of foundNodeSet) {
          let outermostNode: TSESTree.TSAsExpression = node;
          while (outermostNode.parent?.type === AST_NODE_TYPES.TSAsExpression) {
            // Walk up the chain
            outermostNode = outermostNode.parent;
          }

          if (visitedOutermostNodeSet.has(outermostNode)) {
            continue; // Skip
          }

          visitedOutermostNodeSet.add(outermostNode);

          const chain = takeCastingChainFromOutermostNode(outermostNode);

          // Error: three or more castings (`as X as Y as Z`) don't make sense
          if (chain.length > 2) {
            context.report({
              node: outermostNode.typeAnnotation,
              messageId: "chainTooLong",
            });
          }

          // Single `as X` -- no chaining
          else if (chain.length === 1) {
            if (isAllowedSingleCasting(outermostNode)) {
              continue;
            }

            // Error: invalid type
            context.report({
              node: outermostNode.typeAnnotation,
              messageId: "asAnyFirst",
              fix: (fixer) => {
                return [
                  fixer.insertTextBefore(
                    outermostNode.typeAnnotation,
                    "any as ",
                  ),
                ];
              },
            });
          }

          // Two castings: `as X as Y`
          else {
            const [outerCasting, innerCasting] = chain;

            // Error: `as X as Y` where `X` is not `any`
            if (
              innerCasting.typeAnnotation.type !== AST_NODE_TYPES.TSAnyKeyword
            ) {
              context.report({
                node: innerCasting.typeAnnotation,
                messageId: "asAnyFirst",
              });
            }

            // Error: `as X as Y` where `Y` is `any`
            else if (
              outerCasting.typeAnnotation.type === AST_NODE_TYPES.TSAnyKeyword
            ) {
              context.report({
                node: outerCasting.typeAnnotation,
                messageId: "asAnyFirst",
              });
            }
          }
        }
      },
    };
  },
});

function takeCastingChainFromOutermostNode(
  node: TSESTree.TSAsExpression,
): Array<TSESTree.TSAsExpression> {
  const result: Array<TSESTree.TSAsExpression> = [node];

  let cursor: TSESTree.TSAsExpression = node;
  while (cursor.expression.type === AST_NODE_TYPES.TSAsExpression) {
    // Walk down the chain
    result.push(cursor.expression);
    cursor = cursor.expression;
  }

  return result;
}

/**
 * - `as any`
 * - `as unknown`
 * - `as const`
 */
function isAllowedSingleCasting(node: TSESTree.TSAsExpression): boolean {
  return (
    node.typeAnnotation.type === AST_NODE_TYPES.TSAnyKeyword ||
    node.typeAnnotation.type === AST_NODE_TYPES.TSUnknownKeyword ||
    isConstCasting(node.typeAnnotation)
  );
}

function isConstCasting(node: TSESTree.TypeNode): boolean {
  return (
    node.type === AST_NODE_TYPES.TSTypeReference &&
    node.typeName.type === AST_NODE_TYPES.Identifier &&
    node.typeName.name === "const"
  );
}
