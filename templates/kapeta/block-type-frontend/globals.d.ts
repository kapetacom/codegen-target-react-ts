//#FILENAME:src/globals.d.ts:create-only
{{ai-type 'documentation'}}
// Type definitions for image imports
declare module '*.jpg' {
    const content: string;
    export default content;
}
declare module '*.png' {
    const content: string;
    export default content;
}
declare module '*.gif' {
    const content: string;
    export default content;
}
declare module '*.svg' {
    const content: string;
    export default content;
}
