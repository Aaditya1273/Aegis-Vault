import {
    AppConfig,
    UserSession,
    showConnect
} from "@stacks/connect";
import {
    StacksMainnet,
    StacksTestnet,
    StacksDevnet
} from "@stacks/network";
import {
    callReadOnlyFunction,
    standardPrincipalCV,
    uintCV,
    cvToJSON
} from "@stacks/transactions";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

export const NETWORK = new StacksDevnet(); // Switch to Mainnet/Testnet for production
export const SUBNET_URL = "http://localhost:18443"; // Placeholder for Subnet RPC
export const IS_SUBNET = process.env.NEXT_PUBLIC_IS_SUBNET === "true";

export const EFFECTIVE_NETWORK = IS_SUBNET
    ? new StacksDevnet({ url: SUBNET_URL })
    : NETWORK;

export const CONTRACT_ADDRESS = "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"; // Devnet default
export const VAULT_CONTRACT = "vault";
export const AEUSD_CONTRACT = "aeusd";

export const getVaultStats = async (ownerAddress: string) => {
    try {
        const result = await callReadOnlyFunction({
            network: NETWORK,
            contractAddress: CONTRACT_ADDRESS,
            contractName: VAULT_CONTRACT,
            functionName: "get-vault",
            functionArgs: [standardPrincipalCV(ownerAddress)],
            senderAddress: ownerAddress,
        });
        return cvToJSON(result).value;
    } catch (e) {
        console.error("Error fetching vault stats:", e);
        return null;
    }
};

export const login = () => {
    showConnect({
        appDetails: {
            name: "Aegis-Vault",
            icon: "https://your-app-icon.com/logo.png",
        },
        onFinish: () => {
            window.location.reload();
        },
        userSession,
    });
};

export const logout = () => {
    userSession.signUserOut();
    window.location.reload();
};

export const depositCollateral = async (amount: number) => {
    const { openContractCall } = await import("@stacks/connect");

    await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: VAULT_CONTRACT,
        functionName: "deposit-sbtc",
        functionArgs: [uintCV(amount)],
        postConditions: [], // Add post-conditions for safety
        onFinish: (data) => {
            console.log("Transaction ID:", (data as any).txId || (data as any).txid);
        },
        onCancel: () => {
            console.log("Transaction canceled");
        },
        sponsored: true, // This enables Account Abstraction/Sponsored UX
    });
};

export const mintaeUSD = async (amount: number) => {
    const { openContractCall } = await import("@stacks/connect");

    await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: VAULT_CONTRACT,
        functionName: "mint-aeusd",
        functionArgs: [uintCV(amount)],
        postConditions: [],
        onFinish: (data) => {
            console.log("Transaction ID:", (data as any).txId || (data as any).txid);
        },
        sponsored: true,
    });
};
