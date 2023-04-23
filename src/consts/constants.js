export const YEAR_IN_SECONDS = 365 * 24 * 3600;

export const poolAddresses = {
    97: {
        FUEL: "0x82A5476436B935Ea67DC77706fd4B3eE28611A84",
        PDOGE: "0x29E37b668F0aB680Ff140f9ffF30EF41E635EB05",
        BUSD: "0x92325A71cdacf88E45aD12597EE59E662342D03a",
        WBNB: "0x1fC2B7369FFA75070fCd0559cC62F45f570ed45C",
        BTCB: "0xEb6b13139204cbc9a0EBEc599A49bF6E8d025944",
        ETH: "0x8c4F2E1149e401Cb51dC39df4901c045C42eB329",
        CAKE: "0x18702839B8bA4fAD972ec0f40dF01b5fAcB84433",
        FUEL_BUSD: "0x5a2Fe37A302fafC2a8464C4aF74b73eCDE6ed3c4",
        FUEL_WBNB: "0xBEBdfb3BD91B6f6BD9bCda0Bd7DB4D32EF14d8EB",
        BUSD_PDOGE: "0xf141A066CA00309D5a89488D750e6EE2510A8faB",
        BUSD_WBNB: "0xBb0D8659172F3F9Cc7660313ACa1389Fd7608693",
        BUSD_USDT: "0xE8F53AdE01f093E824fFEE8e09e2028A927405C1",
        BUSD_USDC: "0x6fD92a30935708c444Dd33764B4f8B88daaa5487",
        BTCB_ETH: "0xeD61faC63DEEA6bE0f9a588f939Dcd51B6269C42",

        // not part of the pools only for price 
        BTCB_BUSD: "0x669A2e0E27934Bce91f7043Fc3cDC0a0BE7B9CCF",
        ETH_BUSD: "0xb251495f6C01a7f4f52655c4AB59Aa68e8Ed1A01",
        CAKE_BUSD: "0x480666Cd9922C09BE8b95d300B4386c1792d5433",
        USDT: "0x500F4cbbE7bE063D94cD5D03A4e8CB2e9C7476D1",
        USDC: "0xD6e69dcEE63D3A106EA79F970dFE425F286fc336"
    },

    56: {},
};

export const CONSTANTS = {
    97: {
        CHAIN_ID: 97,
        BURN_ADDRESS: "0x000000000000000000000000000000000000dEaD",
        NODE_URL: 'https://nd-079-679-218.p2pify.com/1f113b0704a4912d12f40583a01a4816',
        PRE_FUEL_TOKEN_CONTRACT: '0x1158f42447eaFCEb2Cb728edaD05904836Bd1dd9',
        PRE_FUEL_DECIMALS: 18,
        BUSD_TOKEN_CONTRACT: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
        BUSD_DECIMALS: 18,
        FUEL_TOKEN_ADDRESS: poolAddresses[97].FUEL,
        FUEL_DECIMALS: 18,
        FUEL_REEDEM_CONTRACT: '0x938dCf9ABf39184B931d63421385643b01c67a54',
        MASTERCHEF: '0x71CB2e735fd04868950c2Ab6C4E95a628580092D',
        MULTICALL: '0xF2D29DB672276f49a7B1d658C894A7529f0BE426',
        FUEL_BUSD_ADDRESS: poolAddresses[97].FUEL_BUSD,
        FUEL_WBNB: poolAddresses[97].FUEL_WBNB,
        PANCKE_ADD: 'https://pancake.kiemtienonline360.com/#/add/',
        PANCAKE_SWAP: 'https://pancake.kiemtienonline360.com/#/swap?outputCurrency=',
        PANCAKE_POOL_INFO: 'https://pancakeswap.finance/info/pool/',
        PANCAKE_TOKEN_INFO: 'https://pancakeswap.finance/info/token/',
        BSC_SCAN: 'https://testnet.bscscan.com/address/'
    },

    56: {
        PANCKE_ADD: 'https://pancakeswap.finance/add/',
        PANCAKE_SWAP: 'https://pancakeswap.finance/swap?outputCurrency=',
        PANCAKE_POOL_INFO: 'https://pancakeswap.finance/info/pool/',
        PANCAKE_TOKEN_INFO: 'https://pancakeswap.finance/info/token/',
        BSC_SCAN: 'https://bscscan.com/address/'
    }
}

//PROD
//export const MULTICALL = '0x1ee38d535d541c55c9dae27b12edf090c608e6fb'
// export const MULTICALL = '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B' // FROM MANOR