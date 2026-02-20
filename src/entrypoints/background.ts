import { ApiErrorData, ApiItemData } from "@/lib/api/Api";
import { getItem } from "@/lib/api/client";
import { GetItemRequest, GetItemResponse, RequestMessage } from "@/lib/rpc/messages";

export default defineBackground(() => {
    browser.runtime.onMessage.addListener(
        async (message: RequestMessage): Promise<GetItemResponse | undefined> => {
            if (!message || typeof message !== "object") return;

            if (message.type === "GET_ITEM") {
                return handleGetItem(message);
            }

            return
        }
    );
});

async function handleGetItem(message: GetItemRequest): Promise<GetItemResponse> {
    const itemCode = message.itemCode.trim();

    if (!itemCode) {
        return {
            ok: false,
            error: "Missing item code",
        }
    }

    if (!/^[a-z0-9-]+$/i.test(itemCode)) {
        return { ok: false, error: "Invalid item code" };
    }

    try {
        const data = await getItem(itemCode);

        if ('error' in data) {
            return { ok: false, error: data.error ?? "" }
        }
        return { ok: true, data: data as ApiItemData  }
    } catch (err) {
        return {
            ok: false,
            error: err instanceof Error ? err.message : String(err)
        }
    }
}
