// @ts-ignore
import { buildSbtcDepositAddress, TESTNET, SbtcApiClientTestnet } from 'sbtc';

export const getSbtcDepositAddress = async (stacksAddress: string, btcPubKey: string) => {
    try {
        // Initialize the Testnet client
        const client = new SbtcApiClientTestnet();

        // Fetch current Signer public key
        const signersPublicKey = await client.fetchSignersPublicKey();

        // Build the deposit address
        const deposit = buildSbtcDepositAddress({
            stacksAddress,
            signersPublicKey,
            reclaimLockTime: 950,
            reclaimPublicKey: btcPubKey,
            network: TESTNET,
            maxSignerFee: 1000
        });

        return deposit;
    } catch (error) {
        console.error("[Aegis:sBTC] Failed to build deposit address:", error);
        throw error;
    }
};
