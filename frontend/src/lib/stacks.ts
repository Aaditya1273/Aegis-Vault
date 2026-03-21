import {
    AppConfig,
    UserSession
} from "@stacks/connect";
import {
    createNetwork
} from "@stacks/network";
import {
    fetchCallReadOnlyFunction,
    cvToJSON,
    Cl
} from "@stacks/transactions";

const appConfig = new AppConfig(["store_write", "publish_data"]);

const createSafeUserSession = (): UserSession => {
    if (typeof window === "undefined") return new UserSession({ appConfig });
    try {
        // Test if localStorage is accessible
        localStorage.getItem("test");
        return new UserSession({ appConfig });
    } catch (e) {
        console.warn("Aegis-Vault: localStorage access is denied. Session will not persist.");
        // Return a mock object to prevent the entire app from crashing during module evaluation
        return {
            appConfig,
            isUserSignedIn: () => false,
            isSignInPending: () => false,
            loadUserData: () => null,
            signUserOut: () => { },
            // Add stubs for other potential calls
            generatePreSignRequest: () => "",
            handlePendingSignIn: async () => { },
            store: {}
        } as unknown as UserSession;
    }
};

export const userSession = createSafeUserSession();

// Network Configuration
export const NETWORK = createNetwork("devnet"); // Switch to "mainnet" or "testnet" for production
export const SUBNET_URL = "http://localhost:18443";
export const IS_SUBNET = process.env.NEXT_PUBLIC_IS_SUBNET === "true";

export const EFFECTIVE_NETWORK = IS_SUBNET
    ? createNetwork({ network: "devnet", client: { baseUrl: SUBNET_URL } })
    : NETWORK;

export const CONTRACT_ADDRESS = "ST2NJZE3SPW0GCPC0YE4V805HTSAGNQJF1HXT6PKY";
export const VAULT_CONTRACT = "vault";
export const AEUSD_CONTRACT = "aeusd";

/**
 * Fetches vault statistics for a given owner.
 */
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

/**
 * Initiates the wallet connection flow.
 */
export const login = async () => {
    const { showConnect } = await import("@stacks/connect");
    showConnect({
        appDetails: {
            name: "Aegis-Vault",
            icon: window.location.origin + "/logo.png",
        },
        redirectTo: "/",
        onFinish: () => {
            window.location.reload();
        },
        userSession,
    });
};

/**
 * Signs the user out and reloads the page.
 */
export const logout = () => {
    userSession.signUserOut();
    window.location.reload();
};

/**
 * Deposits sBTC collateral into the vault.
 */
export const depositCollateral = async (amount: number) => {
    const { openContractCall } = await import("@stacks/connect");

    await openContractCall({
        network: EFFECTIVE_NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: VAULT_CONTRACT,
        functionName: "deposit-sbtc",
        functionArgs: [Cl.uint(amount)],
        postConditions: [],
        onFinish: (data) => {
            console.log("Transaction ID:", (data as any).txId || (data as any).txid);
        },
        onCancel: () => {
            console.log("Transaction canceled");
        },
        sponsored: true,
    });
};

/**
 * Mints aeUSD stablecoins against collateral.
 */
export const mintaeUSD = async (amount: number) => {
    const { openContractCall } = await import("@stacks/connect");

    await openContractCall({
        network: EFFECTIVE_NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: VAULT_CONTRACT,
        functionName: "mint-aeusd",
        functionArgs: [Cl.uint(amount)],
        postConditions: [],
        onFinish: (data) => {
            console.log("Transaction ID:", (data as any).txId || (data as any).txid);
        },
        sponsored: true,
    });
};
