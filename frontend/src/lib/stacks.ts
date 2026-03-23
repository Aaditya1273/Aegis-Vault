import { AppConfig, UserSession } from "@stacks/auth";
import { InstanceDataStore } from "@stacks/auth/dist/sessionStore";
import {
    fetchCallReadOnlyFunction,
    cvToJSON,
    Cl,
    PostConditionMode,
    AnchorMode
} from "@stacks/transactions";

const POST_CONDITION_ALLOW = PostConditionMode.Allow;

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({
    appConfig,
    sessionStore: new InstanceDataStore(),
});

export {
    EFFECTIVE_NETWORK,
    isMainnet,
    CONTRACT_ADDRESS,
    VAULT_CONTRACT,
    AEUSD_CONTRACT,
    LP_TOKEN_CONTRACT,
    POOL_CONTRACT,
    SBTC_CONTRACT,
    BTC_TESTNET_CONTRACT
} from "./network";

import {
    EFFECTIVE_NETWORK,
    isMainnet,
    CONTRACT_ADDRESS,
    VAULT_CONTRACT,
    AEUSD_CONTRACT,
    LP_TOKEN_CONTRACT,
    POOL_CONTRACT,
    SBTC_CONTRACT,
    BTC_TESTNET_CONTRACT
} from "./network";

/**
 * Safe Principal Parser to prevent Leather Wallet crashes
 */
export const parseContractPrincipal = (principal: string) => {
    const full = principal.includes(".") ? principal : `${CONTRACT_ADDRESS}.${principal}`;
    const parts = full.split(".");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
        throw new Error(`Invalid contract principal: ${principal}`);
    }
    return Cl.contractPrincipal(parts[0], parts[1]);
};

export const GET_SBTC_PRINCIPAL = () => {
    if (SBTC_CONTRACT.includes(".")) return SBTC_CONTRACT;
    return `${CONTRACT_ADDRESS}.${SBTC_CONTRACT}`;
};

// --- Authentication Helpers ---

export const getAccountAddress = () => {
    if (!userSession.isUserSignedIn()) return null;
    const userData = userSession.loadUserData();
    return userData.profile.stxAddress[isMainnet ? "mainnet" : "testnet"];
};

export const logout = () => {
    userSession.signUserOut();
    window.location.href = "/";
};

export const connectWallet = async (onFinish?: () => void) => {
    const { showConnect } = await import("@stacks/connect");
    showConnect({
        appDetails: {
            name: "Aegis Vault",
            icon: window.location.origin + "/logo.png",
        },
        userSession,
        onFinish: () => {
            onFinish?.();
            window.location.reload();
        },
    });
};

// --- World-Class Transaction System ---

export type ContractIntent = {
    contractAddress?: string;
    contractName: string;
    functionName: string;
    functionArgs: any[];
    postConditionMode?: PostConditionMode;
    postConditions?: any[];
    onBroadcast?: (txId: string) => void;
};

const isPaymentFunction = (functionName: string) => {
    const payments = [
        "deposit-collateral",
        "mint-aeusd",
        "add-liquidity",
        "remove-liquidity",
        "withdraw-collateral",
        "repay-aeusd"
    ];
    return payments.includes(functionName);
};

export const submitContractIntent = async (intent: ContractIntent) => {
    const { openContractCall } = await import("@stacks/connect");

    await openContractCall({
        network: EFFECTIVE_NETWORK as any,
        contractAddress: intent.contractAddress || CONTRACT_ADDRESS,
        contractName: intent.contractName,
        functionName: intent.functionName,
        functionArgs: intent.functionArgs,
        anchorMode: AnchorMode.Any,
        // Institutional Default: Allow only for known payment flows, Deny for everything else
        postConditionMode: intent.postConditionMode ?? (isPaymentFunction(intent.functionName) ? PostConditionMode.Allow : PostConditionMode.Deny),
        postConditions: intent.postConditions || [],
        onFinish: (data: any) => {
            console.log(`[Aegis:TX] ${intent.functionName} ->`, data.txId);
            window.dispatchEvent(new CustomEvent("stacks-transaction", { detail: { txId: data.txId } }));
            intent.onBroadcast?.(data.txId);
        },
    });
};

// --- Public API ---

/**
 * Institutional sBTC Deposit
 * Decimals: 8 (Micro-sBTC)
 */
export const depositCollateral = (amount: number) => {
    const microAmount = BigInt(Math.round(amount * 1e8));
    return submitContractIntent({
        contractName: VAULT_CONTRACT,
        functionName: "deposit-collateral",
        functionArgs: [
            Cl.uint(microAmount),
            parseContractPrincipal(SBTC_CONTRACT)
        ],
    });
};

/**
 * Mint aeUSD Stablecoin
 * Decimals: 6 (Micro-aeUSD)
 */
export const mintaeUSD = (amount: number) => {
    const microAmount = BigInt(Math.round(amount * 1e6));
    return submitContractIntent({
        contractName: VAULT_CONTRACT,
        functionName: "mint-aeusd",
        functionArgs: [Cl.uint(microAmount)],
    });
};

/**
 * Provision Liquidity to aeUSD/sBTC Pool
 */
export const addLiquidity = (amountAeUSD: number, amountSBTC: number, sbtcToken: string) => {
    return submitContractIntent({
        contractName: POOL_CONTRACT,
        functionName: "add-liquidity",
        functionArgs: [
            Cl.uint(BigInt(Math.round(amountAeUSD * 1e6))),
            Cl.uint(BigInt(Math.round(amountSBTC * 1e8))),
            parseContractPrincipal(sbtcToken)
        ],
        postConditionMode: POST_CONDITION_ALLOW,
    });
};

/**
 * Claim BTC Testnet (Mock Faucet for Hackathon)
 */
export const claimTestnetBTC = () => {
    return submitContractIntent({
        contractName: BTC_TESTNET_CONTRACT,
        functionName: "faucet",
        functionArgs: [],
    });
};

/**
 * Toggle Simulation Mode (Redirects Vault & Pool to Mock BTC)
 */
export const toggleSimulationMode = (useMock: boolean) => {
    // 1. Update Vault
    const vaultP = submitContractIntent({
        contractName: VAULT_CONTRACT,
        functionName: "update-sbtc-token",
        functionArgs: [
            useMock
                ? Cl.contractPrincipal(CONTRACT_ADDRESS, BTC_TESTNET_CONTRACT)
                : parseContractPrincipal(SBTC_CONTRACT)
        ],
    });

    return vaultP; // Pool is now agnostic and doesn't need state change
};

/**
 * Deposit Testnet BTC as Collateral (Simulated Flow)
 */
export const depositTestnetBTC = (amount: number) => {
    const microAmount = Math.floor(amount * 100_000_000);

    return submitContractIntent({
        contractName: VAULT_CONTRACT,
        functionName: "deposit-collateral",
        functionArgs: [
            Cl.uint(microAmount),
            Cl.contractPrincipal(CONTRACT_ADDRESS, BTC_TESTNET_CONTRACT)
        ],
        // Use Allow mode for hackathon resilience against library version conflicts
        postConditionMode: PostConditionMode.Allow,
        postConditions: []
    });
};

/**
 * Remove Liquidity and Burn LP Tokens
 */
export const removeLiquidity = (lpAmount: number, sbtcToken: string) => {
    return submitContractIntent({
        contractName: POOL_CONTRACT,
        functionName: "remove-liquidity",
        functionArgs: [
            Cl.uint(BigInt(Math.round(lpAmount * 1e6))),
            parseContractPrincipal(sbtcToken)
        ],
        postConditionMode: POST_CONDITION_ALLOW,
    });
};

/**
 * Swap aeUSD for sBTC
 */
export const swapAEUSDforSBTC = (amountIn: number, sbtcToken: string) => {
    return submitContractIntent({
        contractName: POOL_CONTRACT,
        functionName: "swap-aeusd-for-sbtc",
        functionArgs: [
            Cl.uint(BigInt(Math.round(amountIn * 1e6))),
            parseContractPrincipal(sbtcToken)
        ],
        postConditionMode: POST_CONDITION_ALLOW,
    });
};

/**
 * Swap sBTC for aeUSD
 */
export const swapSBTCforAEUSD = (amountIn: number, sbtcToken: string) => {
    return submitContractIntent({
        contractName: POOL_CONTRACT,
        functionName: "swap-sbtc-for-aeusd",
        functionArgs: [
            Cl.uint(BigInt(Math.round(amountIn * 1e8))),
            parseContractPrincipal(sbtcToken)
        ],
        postConditionMode: POST_CONDITION_ALLOW,
    });
};

/**
 * Get Estimated Swap Output
 */
export const getSwapOutput = async (amountIn: number, fromToken: "aeUSD" | "sBTC") => {
    try {
        const reserves = await getPoolReserves();
        if (!reserves) return 0;

        const reserveIn = fromToken === "aeUSD"
            ? BigInt(reserves.aeusd.value)
            : BigInt(reserves.sbtc.value);
        const reserveOut = fromToken === "aeUSD"
            ? BigInt(reserves.sbtc.value)
            : BigInt(reserves.aeusd.value);

        const amountInBN = BigInt(Math.round(amountIn * (fromToken === "aeUSD" ? 1e6 : 1e8)));

        const result = await fetchCallReadOnlyFunction({
            network: EFFECTIVE_NETWORK as any,
            contractAddress: CONTRACT_ADDRESS,
            contractName: POOL_CONTRACT,
            functionName: "get-swap-output",
            functionArgs: [
                Cl.uint(amountInBN),
                Cl.uint(reserveIn),
                Cl.uint(reserveOut)
            ],
            senderAddress: CONTRACT_ADDRESS,
        });

        const output = cvToJSON(result).value;
        return Number(output.value) / (fromToken === "aeUSD" ? 1e8 : 1e6);
    } catch (e) {
        console.error("Get swap output failed:", e);
        return 0;
    }
};

// --- Read-Only Query Layer ---

export const getVaultStats = async (ownerAddress: string) => {
    try {
        const result = await fetchCallReadOnlyFunction({
            network: EFFECTIVE_NETWORK as any,
            contractAddress: CONTRACT_ADDRESS,
            contractName: VAULT_CONTRACT,
            functionName: "get-vault", // Corrected function name
            functionArgs: [Cl.standardPrincipal(ownerAddress)],
            senderAddress: ownerAddress,
        });

        const json = cvToJSON(result).value;
        // Resilience Check: Ensure we return numbers even on failure
        return {
            collateral: { value: json.collateral?.value || "0" },
            debt: { value: json.debt?.value || "0" },
            sbtcToken: json["sbtc-token"]?.value || "" // Not available in map, need separate fetch if I can
        };
    } catch (e) {
        console.warn("[Aegis:Stats] Read failure:", e);
        return {
            collateral: { value: "0" },
            debt: { value: "0" }
        };
    }
};

export const getVaultSBTC = async () => {
    try {
        return GET_SBTC_PRINCIPAL();
    } catch (e) {
        console.error("getVaultSBTC failed:", e);
        return GET_SBTC_PRINCIPAL();
    }
};

export const getPoolReserves = async () => {
    try {
        const result = await fetchCallReadOnlyFunction({
            network: EFFECTIVE_NETWORK as any,
            contractAddress: CONTRACT_ADDRESS,
            contractName: POOL_CONTRACT,
            functionName: "get-reserves",
            functionArgs: [],
            senderAddress: CONTRACT_ADDRESS,
        });
        const json = cvToJSON(result).value || {};
        return {
            aeusd: json.aeusd || { value: "0" },
            sbtc: json.sbtc || { value: "0" }
        };
    } catch (e) {
        console.error("[Aegis:Error] getPoolReserves failed:", e);
        return { aeusd: { value: "0" }, sbtc: { value: "0" } };
    }
};

export const getTokenBalance = async (ownerAddress: string, identifier: string) => {
    try {
        let addr = CONTRACT_ADDRESS;
        let name = identifier;

        // If identifier is Address.Name, split it
        if (identifier.includes(".")) {
            const parts = identifier.split(".");
            addr = parts[0];
            name = parts[1];
        }

        const result = await fetchCallReadOnlyFunction({
            network: EFFECTIVE_NETWORK as any,
            contractAddress: addr,
            contractName: name,
            functionName: "get-balance",
            functionArgs: [Cl.standardPrincipal(ownerAddress)],
            senderAddress: ownerAddress,
        });

        const json = cvToJSON(result);
        if (json.value && json.value.value) return json.value.value;
        if (json.value) return json.value;
        return "0";
    } catch (e) {
        console.error(`[Aegis:Error] getTokenBalance (${identifier}) failed:`, e);
        return "0";
    }
};
