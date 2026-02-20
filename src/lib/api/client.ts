import { Api, ApiErrorData, ApiItemData } from "./Api";

const api = new Api({
    baseUrl: "https://api.warerastats.io"
});

export async function getItem(itemCode: string): Promise<ApiItemData | ApiErrorData> {
    const response = await api.item.itemDetail(itemCode);
    return response.json()
}
