export interface Vault {
    name: string,
    description: string,
    managerAddress: string,
    vaultId: string,
    totalValue: number,
    totalShares: number,
    managementPolicy: string,
    depositPolicy: string,
    hubChain: Chain,
    spokeChains: Chain[],
}

export interface Chain {
    chain: string,
    totalValue: number,
    address: string,
    assets: Assets[],
}

export interface Assets {
    symbol: string,
    amount: number,
    chain: string,
}