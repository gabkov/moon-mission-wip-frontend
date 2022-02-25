export const POOLS = {
    97: [
         {
            pid: 0,
            order: 0,
            address: '0x51efE7b080BB9704610c5a6d777676B111E6226d',
            single: true,
            native: true,
            name: 'FUEL',
            quoteTokenAddress: '0x51efE7b080BB9704610c5a6d777676B111E6226d',
            quoteStablePairAddress: '0x98aD770f6d281732D8Ea33494e8eC2b63Da8Ba6C',  // FUEL-BUSD stable pair address
            stableTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',  // BUSD address
            logo1: 'fuel',
            logo2: ''
        },
        {
            pid: 1,
            order: 1,
            address: '0x98aD770f6d281732D8Ea33494e8eC2b63Da8Ba6C',
            single: false,
            native: true,
            name: 'BUSD-FUEL',
            quoteTokenAddress: '0x51efE7b080BB9704610c5a6d777676B111E6226d',
            quoteStablePairAddress: '0x98aD770f6d281732D8Ea33494e8eC2b63Da8Ba6C',
            stableTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
            tokenPair: '0x51efE7b080BB9704610c5a6d777676B111E6226d/0x92325A71cdacf88E45aD12597EE59E662342D03a',
            logo1: 'fuel',
            logo2: 'busd'
        },
        {
            pid: 2,
            order: 2,
            address: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
            single: true,
            native: false,
            name: 'BUSD',
            quoteTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
            quoteStablePairAddress: '', 
            stableTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',  // BUSD address
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
            mainNetTokenAddres: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // REAL WBNB this needs to be removed on prod
            quoteTokenAddress: '0x1fC2B7369FFA75070fCd0559cC62F45f570ed45C', 
            quoteStablePairAddress: '',
            stableTokenAddress: '',  
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
            mainNetTokenAddres: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', // REAL BTCB this needs to be removed on prod
            quoteTokenAddress: '0xEb6b13139204cbc9a0EBEc599A49bF6E8d025944', 
            quoteStablePairAddress: '',
            stableTokenAddress: '',  
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
            quoteTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
            quoteStablePairAddress: '',
            stableTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
            tokenPair: '0x92325A71cdacf88E45aD12597EE59E662342D03a/0x1fC2B7369FFA75070fCd0559cC62F45f570ed45C',
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
            quoteTokenAddress: '0x51efE7b080BB9704610c5a6d777676B111E6226d',
            quoteStablePairAddress: '0x98aD770f6d281732D8Ea33494e8eC2b63Da8Ba6C',
            stableTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
            tokenPair: '0x51efE7b080BB9704610c5a6d777676B111E6226d/0x1fC2B7369FFA75070fCd0559cC62F45f570ed45C',
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
            mainNetTokenAddres: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', // REAL ETH this needs to be removed on prod
            quoteTokenAddress: '0x8c4F2E1149e401Cb51dC39df4901c045C42eB329', 
            quoteStablePairAddress: '',
            stableTokenAddress: '',  
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
            mainNetTokenAddres: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', // REAL CAKE this needs to be removed on prod
            quoteTokenAddress: '0x18702839B8bA4fAD972ec0f40dF01b5fAcB84433', 
            quoteStablePairAddress: '',
            stableTokenAddress: '',  
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
            quoteTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
            quoteStablePairAddress: '',
            stableTokenAddress: '0x92325A71cdacf88E45aD12597EE59E662342D03a',
            tokenPair: '0x92325A71cdacf88E45aD12597EE59E662342D03a/0xe64D316e6AAe57f322A179b118689708b368E163',
            logo1: 'polydoge',
            logo2: 'busd'
        },
    ]
}