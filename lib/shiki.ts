import { createHighlighter } from 'shiki';

// Use globalThis to persist highlighter across HMR in development
const globalHighlighter = globalThis as unknown as {
    _shiki_highlighter_instance: any;
};

export async function highlightCode(code: string, lang: string = 'typescript') {
    if (!globalHighlighter._shiki_highlighter_instance) {
        globalHighlighter._shiki_highlighter_instance = await createHighlighter({
            themes: ['min-dark'],
            langs: ['typescript', 'tsx', 'bash'],
        });
    }

    return globalHighlighter._shiki_highlighter_instance.codeToHtml(code, {
        lang,
        theme: 'min-dark'
    });
}
