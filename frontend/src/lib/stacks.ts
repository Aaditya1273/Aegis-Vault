import { AppConfig, UserSession } from "@stacks/auth";
import { InstanceDataStore } from "@stacks/auth/dist/sessionStore";
import { fetchCallReadOnlyFunction, cvToJSON, Cl } from "@stacks/transactions";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({
    appConfig,
    sessionStore: new InstanceDataStore(),
});

const isMainnet = process.env.NEXT_PUBLIC_STACKS_NETWORK === "mainnet";
export const EFFECTIVE_NETWORK = isMainnet ? "mainnet" : "testnet";

export const CONTRACT_ADDRESS =
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "ST2NJZE3SPW0GCPC0YE4V805HTSAGNQJF1HXT6PKY";
export const VAULT_CONTRACT = process.env.NEXT_PUBLIC_VAULT_CONTRACT || "vault-v2";
export const AEUSD_CONTRACT = process.env.NEXT_PUBLIC_AEUSD_CONTRACT || "aeusd-v2";

function getAppBaseUrl() {
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (typeof window !== "undefined") return window.location.origin;
    return "http://localhost:3000";
}

export function getAppDetails() {
    const base = getAppBaseUrl().replace(/\/$/, "");
    return { name: "Aegis Vault", icon: `${base}/logo.png` };
}

export function getAccountAddress(): string | null {
    if (!userSession.isUserSignedIn()) return null;
    const data = userSession.loadUserData();
    const key = isMainnet ? "mainnet" : "testnet";
    return data.profile?.stxAddress?.[key] ?? null;
}

export function connectWallet(onFinish?: () => void) {
    // showConnect uses a <connect-modal> web component that reads localStorage
    // to persist wallet selection — this crashes in sandboxed iframes and some
    // Brave Shield configs. We use the lower-level showConnect from @stacks/connect
    // but pre-cache the echo detection flag so protocolEchoReplyDetection never
    // touches window.localStorage directly.
    try { (window as any)._blockstackDidCheckEchoReply = false; } catch { /* ignore */ }

    // Dynamically import to avoid any module-level localStorage access
    import("@stacks/connect").then(({ showConnect }) => {
        showConnect({
            appDetails: getAppDetails(),
            userSession,
            onFinish: () => onFinish?.(),
            onCancel: () => {},
        });
    }).catch((e) => {
        console.error("Aegis-Vault: failed to load @stacks/connect", e);
    });
}

export function logout() {
    userSession.signUserOut();
    if (typeof window !== "undefined") window.location.replace("/");
}

export const getVaultStats = async (ownerAddress: string) => {
    try {
        const result = await fetchCallReadOnlyFunction({
            network: EFFECTIVE_NETWORK,
            contractAddress: CONTRACT_ADDRESS,
            contractName: VAULT_CONTRACT,
            functionName: "get-vault",
            functionArgs: [Cl.standardPrincipal(ownerAddress)],
            senderAddress: ownerAddress,
        });
        return cvToJSON(result).value;
    } catch (e) {
        console.error("Error fetching vault stats:", e);
        return null;
    }
};

export const depositCollateral = async (amount: number) => {
    const { openContractCall } = await import("@stacks/connect");
    await openContractCall({
        network: EFFECTIVE_NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: VAULT_CONTRACT,
        functionName: "deposit-collateral",
        functionArgs: [Cl.uint(amount)],
        postConditions: [],
        onFinish: (data: any) => console.log("TX:", data.txId),
    });
};

export const mintaeUSD = async (amount: number) => {
    const { openContractCall } = await import("@stacks/connect");
    await openContractCall({
        network: EFFECTIVE_NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: VAULT_CONTRACT,
        functionName: "mint-aeusd",
        functionArgs: [Cl.uint(amount)],
        postConditions: [],
        onFinish: (data: any) => console.log("TX:", data.txId),
    });
};
