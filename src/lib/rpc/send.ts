import { RpcRequestMap } from "./messages";

export async function rpc<K extends keyof RpcRequestMap>(
    type: K,
    payload: Omit<RpcRequestMap[K]["req"], "type">
): Promise<RpcRequestMap[K]["res"]> {
    const message = { type, ...payload } as RpcRequestMap[K]["req"];

    const response = await browser.runtime.sendMessage(message);
    return response as RpcRequestMap[K]["res"];
}
