import { CONSTANTS } from "./constants"

const C = CONSTANTS[import.meta.env.VITE_APP_CHAIN_ID]

export const POOLS = {
    97: [
         {
            pid: 0,
            order: 0,
            address: C.FUEL_TOKEN_ADDRESS,
            single: true,
            native: true,
            name: 'FUEL',
            quoteTokenAddress: C.FUEL_TOKEN_ADDRESS,
            quoteStablePairAddress: C.FUEL_BUSD_ADDRESS,  // FUEL-BUSD stable pair address
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,
            logo1: 'fuel',
            logo2: ''
        },
        {
            pid: 10,
            order: 1,
            address: '0xe64D316e6AAe57f322A179b118689708b368E163',
            single: true,
            native: false,
            name: 'PDOGE',
            quoteTokenAddress: '0xe64D316e6AAe57f322A179b118689708b368E163', 
            quoteStablePairAddress: '0x8Ef6125DE5F84056287e1f37dE821A808007886D',
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,  
            logo1: 'polydoge',
            logo2: ''
        },
        {
            pid: 1,
            order: 1,
            address: C.FUEL_BUSD_ADDRESS,
            single: false,
            native: true,
            name: 'BUSD-FUEL',
            quoteTokenAddress: C.FUEL_TOKEN_ADDRESS,
            quoteStablePairAddress: C.FUEL_BUSD_ADDRESS,
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,
            tokenPair: C.FUEL_TOKEN_ADDRESS + '/' + C.BUSD_TOKEN_CONTRACT,
            logo1: 'fuel',
            logo2: 'busd'
        },
        {
            pid: 2,
            order: 2,
            address: C.BUSD_TOKEN_CONTRACT,
            single: true,
            native: false,
            name: 'BUSD',
            quoteTokenAddress: C.BUSD_TOKEN_CONTRACT,
            quoteStablePairAddress: '', 
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,
            logo1: 'busd',
            logo2: ''
        },
        {
            pid: 3,
            order: 3,
            address: '0x1fC2B7369FFA75070fCd0559cC62F45f570ed45C',
            single: true,
            native: false,
            name: 'WBNB',
            quoteTokenAddress: '0x1fC2B7369FFA75070fCd0559cC62F45f570ed45C', 
            quoteStablePairAddress: '0xBb0D8659172F3F9Cc7660313ACa1389Fd7608693',
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,  
            logo1: 'wbnb',
            logo2: ''
        },
        {
            pid: 4,
            order: 4,
            address: '0xEb6b13139204cbc9a0EBEc599A49bF6E8d025944',
            single: true,
            native: false,
            name: 'BTCB',
            quoteTokenAddress: '0xEb6b13139204cbc9a0EBEc599A49bF6E8d025944', 
            quoteStablePairAddress: '0x669A2e0E27934Bce91f7043Fc3cDC0a0BE7B9CCF',
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,  
            logo1: 'btc',
            logo2: ''
        },
        {
            pid: 5,
            order: 9,
            address: '0xBb0D8659172F3F9Cc7660313ACa1389Fd7608693',
            single: false,
            native: false,
            name: 'BUSD-WBNB',
            quoteTokenAddress: C.BUSD_TOKEN_CONTRACT,
            quoteStablePairAddress: '',
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,
            tokenPair: C.BUSD_TOKEN_CONTRACT + '/0x1fC2B7369FFA75070fCd0559cC62F45f570ed45C',
            logo1: 'wbnb',
            logo2: 'busd'
        },
        {
            pid: 6,
            order: 5,
            address: '0xc78ed50C2B9fCe81C3727D9E2dfe2729C73Cd20F',
            single: false,
            native: true,
            name: 'WBNB-FUEL',
            quoteTokenAddress: C.FUEL_TOKEN_ADDRESS,
            quoteStablePairAddress: C.FUEL_BUSD_ADDRESS,
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,
            tokenPair: C.FUEL_TOKEN_ADDRESS + '/0x1fC2B7369FFA75070fCd0559cC62F45f570ed45C',
            logo1: 'fuel',
            logo2: 'wbnb'
        },
        {
            pid: 7,
            order: 7,
            address: '0x8c4F2E1149e401Cb51dC39df4901c045C42eB329',
            single: true,
            native: false,
            name: 'ETH',
            quoteTokenAddress: '0x8c4F2E1149e401Cb51dC39df4901c045C42eB329', 
            quoteStablePairAddress: '0xb251495f6C01a7f4f52655c4AB59Aa68e8Ed1A01',
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,  
            logo1: 'eth',
            logo2: ''
        },
        {
            pid: 8,
            order: 8,
            address: '0x18702839B8bA4fAD972ec0f40dF01b5fAcB84433',
            single: true,
            native: false,
            name: 'CAKE',
            quoteTokenAddress: '0x18702839B8bA4fAD972ec0f40dF01b5fAcB84433', 
            quoteStablePairAddress: '0x480666Cd9922C09BE8b95d300B4386c1792d5433',
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,  
            logo1: 'cake',
            logo2: ''
        },
        {
            pid: 9,
            order: 6,
            address: '0x8Ef6125DE5F84056287e1f37dE821A808007886D',
            single: false,
            native: false,
            name: 'BUSD-PDOGE',
            quoteTokenAddress: C.BUSD_TOKEN_CONTRACT,
            quoteStablePairAddress: '',
            stableTokenAddress: C.BUSD_TOKEN_CONTRACT,
            tokenPair: C.BUSD_TOKEN_CONTRACT + '/0xe64D316e6AAe57f322A179b118689708b368E163',
            logo1: 'polydoge',
            logo2: 'busd'
        },
    ]
}