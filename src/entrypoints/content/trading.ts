import { rpc } from "@/lib/rpc/send";

export const mountTradingPage = (url: URL) => {
    const itemCode = url.searchParams.get("itemCode") ?? 'bread';

    let cancelled = false;

    (async () => {
        const response = await rpc("GET_ITEM", { itemCode });
        if (response.ok) {
            console.log(response.data);
        }
    })();


    return () => cancelled = true;
}