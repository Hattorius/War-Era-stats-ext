import { createSpaRouter } from "@/utils/spa-router";
import { mountTradingPage } from "./trading";

export default defineContentScript({
    matches: ["*://app.warera.io/*"],
    world: "MAIN",
    main() {
        const router = createSpaRouter([
            {
                name: "trading",
                match: (url) => url.pathname === "/market/trading",
                enter: ({ url }) => mountTradingPage(url),
            }
        ]);

        router.start();

        return () => {
            router.stop();
        }
    },
});
