// src/lib/rpc/messages.ts

// Import generated types from your OpenAPI client output.
// Adjust names to whatever your generator produced.
import type { ApiErrorData, ApiItemData } from "@/lib/api/Api"; // example type name

export type GetItemRequest = {
    type: "GET_ITEM";
    itemCode: string;
};

export type GetItemResponse =
  | { ok: true; data: ApiItemData }
  | { ok: false; error: string };

export type RequestMessage = GetItemRequest;

// Optional map for scaling nicely later
export type RpcRequestMap = {
    GET_ITEM: {
        req: GetItemRequest;
        res: GetItemResponse;
    };
};