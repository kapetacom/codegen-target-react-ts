/*
 * In MSW, when multiple handlers are registered, the order they are applied matters because the
 * request interception happens in a sequential manner. This means that the first matching handler
 * in the list is the one that gets executed. Therefore, we sort the handlers by path specificity.
 *
 * For example, if we have these two handlers:
 * - GET `posts/:authorId`
 * - GET `posts/latest`
 *
 * The `posts/latest` handler should be declared first because it's more specific than
 * `posts/:authorId`. Otherwise, the `posts/:authorId` handler will always be executed because the
 * URL: `posts/latest` will also match the `posts/:authorId` pattern.
 */

import { HttpHandler } from 'msw';

const isPathParam = (segment: string): boolean => segment.startsWith(':');

const comparePathSegments = (a: string, b: string): number => {
    const isAWildcard = isPathParam(a);
    const isBWildcard = isPathParam(b);

    if (isAWildcard && !isBWildcard) return 1;
    if (!isAWildcard && isBWildcard) return -1;
    return 0;
};

const comparePaths = (a: string, b: string): number => {
    const segmentsA = a.split('/');
    const segmentsB = b.split('/');

    for (let i = 0; i < Math.min(segmentsA.length, segmentsB.length); i++) {
        const comparison = comparePathSegments(segmentsA[i], segmentsB[i]);
        if (comparison !== 0) return comparison;
    }

    return segmentsA.length - segmentsB.length;
};

export const sortHandlersByPathSpecificity = (handlers: HttpHandler[]): HttpHandler[] => {
    return handlers.sort((a, b) => comparePaths(a.info.path as string, b.info.path as string));
};
