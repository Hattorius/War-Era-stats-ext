type RouteContext = {
    url: URL;
    previousUrl: URL | null;
}

type RouteCleanup = void | (() => void);

type RouteHandler = (ctx: RouteContext) => RouteCleanup;

type RouteRule = {
    name?: string;
    match: (url: URL) => boolean;
    enter: RouteHandler;
}

type SpaRouter = {
    start: () => void;
    stop: () => void;
    refresh: () => void;
}

let pollId: number | null = null;

export const createSpaRouter = (rules: RouteRule[]): SpaRouter => {
    let started = false;
    let currentHref = "";
    let previousUrl: URL | null = null;

    const activeCleanups = new Map<number, () => void>();

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const safeCleanup = (ruleIndex: number) => {
        const cleanup = activeCleanups.get(ruleIndex);
        if (!cleanup) return;
        try {
            cleanup();
        } catch (err) {
            console.error("cleanup error:", err);
        } finally {
            activeCleanups.delete(ruleIndex);
        }
    }

    const evaluate = () => {
        const href = location.href;
        if (href === currentHref) return;
        
        const prev = currentHref ? new URL(currentHref) : previousUrl;
        const next = new URL(href);

        currentHref = href;
        previousUrl = next;

        rules.forEach((rule, index) => {
            safeCleanup(index);
            const matches = rule.match(next);

            if (!matches) {
                return;
            }

            try {
                const cleanup = rule.enter({
                    url: next,
                    previousUrl: prev ?? null,
                });

                if (typeof cleanup === "function") {
                    activeCleanups.set(index, cleanup);
                }
            } catch (err) {
                console.error(`enter error (${rule.name ?? index}):`, err)
            }
        });
    }

    const onUrlMaybeChanged = () => {
        queueMicrotask(evaluate);
    }

    const patchedPushState: History["pushState"] = function(
        this: History,
        ...args: Parameters<History["pushState"]>
    ) {
        const result = originalPushState.apply(this, args);
        onUrlMaybeChanged();
        return result;
    }

    const patchedReplaceState: History["replaceState"] = function(
        this: History,
        ...args: Parameters<History["replaceState"]>
    ) {
        const result = originalReplaceState.apply(this, args);
        onUrlMaybeChanged();
        return result;
    }

    return {
        start() {
            if (started) return;
            started = true;

            history.pushState = patchedPushState;
            history.replaceState = patchedReplaceState;

            window.addEventListener("popstate", onUrlMaybeChanged);
            window.addEventListener("hashchange", onUrlMaybeChanged);

            pollId = window.setInterval(() => {
                if (location.href !== currentHref) {
                    evaluate();
                }
            }, 100);

            evaluate();
        },

        stop() {
            if (!started) return;
            started = false;

            window.removeEventListener("popstate", onUrlMaybeChanged);
            window.removeEventListener("hashchange", onUrlMaybeChanged);

            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;

            if (pollId !== null) {
                window.clearInterval(pollId);
                pollId = null;
            }

            for (const [index] of activeCleanups) {
                safeCleanup(index);
            }
        },

        refresh() {
            currentHref = "";
            evaluate();
        }
    }
}
