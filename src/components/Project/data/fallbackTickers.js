// Fallback tickers in case API fails - 1000 most popular stocks
const fallbackTickers = [
    // Major Tech Companies
    'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'AMD', 'INTC', 'CRM', 'ORCL', 'ADBE', 'PYPL', 'UBER', 'LYFT', 'ZM', 'SHOP', 'SQ',
    
    // Major ETFs and Indices
    'SPY', 'QQQ', 'IWM', 'VTI', 'VOO', 'VEA', 'VWO', 'BND', 'AGG', 'TLT', 'GLD', 'SLV', 'USO', 'XLE', 'XLF', 'XLK', 'XLV', 'XLI', 'XLP', 'XLU', 'XLY', 'XLB',
    'TQQQ', 'SQQQ', 'UVXY', 'VXX', 'VIX', 'SPX', 'NDX', 'RUT', 'VIX', 'VVIX', 'UVXY', 'SVXY', 'XIV', 'VXX', 'VXZ',
    
    // Financial Sector
    'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'USB', 'PNC', 'TFC', 'COF', 'AXP', 'BLK', 'SCHW', 'ICE', 'CME', 'SPGI', 'MCO', 'FICO', 'V', 'MA', 'DFS', 'SYF',
    
    // Healthcare & Pharma
    'JNJ', 'PFE', 'UNH', 'ABBV', 'MRK', 'TMO', 'ABT', 'DHR', 'BMY', 'AMGN', 'GILD', 'CVS', 'CI', 'ANTM', 'HUM', 'CNC', 'WBA', 'CVX', 'XOM', 'COP', 'EOG', 'SLB',
    
    // Consumer & Retail
    'WMT', 'HD', 'COST', 'TGT', 'LOW', 'TJX', 'ROST', 'DG', 'DLTR', 'AMZN', 'EBAY', 'ETSY', 'BABA', 'JD', 'PDD', 'BIDU', 'NIO', 'XPEV', 'LI', 'XPENG', 'NIO',
    
    // Industrial & Manufacturing
    'BA', 'CAT', 'GE', 'MMM', 'HON', 'UPS', 'FDX', 'RTX', 'LMT', 'NOC', 'GD', 'LHX', 'TDG', 'HEI', 'TXT', 'DE', 'CNH', 'AGCO', 'CAT', 'DE', 'CNH', 'AGCO',
    
    // Energy & Utilities
    'XOM', 'CVX', 'COP', 'EOG', 'SLB', 'HAL', 'BKR', 'PSX', 'VLO', 'MPC', 'NEE', 'DUK', 'SO', 'D', 'AEP', 'EXC', 'XEL', 'PCG', 'SRE', 'WEC', 'DTE', 'ED',
    
    // Communication & Media
    'DIS', 'CMCSA', 'CHTR', 'VZ', 'T', 'TMUS', 'S', 'LUMN', 'CTL', 'VZ', 'T', 'TMUS', 'S', 'LUMN', 'CTL', 'NFLX', 'DIS', 'CMCSA', 'CHTR', 'FOX', 'NWSA', 'PARA',
    
    // Consumer Goods
    'KO', 'PEP', 'PG', 'ULTA', 'SBUX', 'MCD', 'YUM', 'CMG', 'DPZ', 'PZZA', 'DRI', 'BLMN', 'DIN', 'CAKE', 'JACK', 'WEN', 'BROS', 'SHAK', 'WING', 'LOVE', 'FAT',
    
    // Real Estate & REITs
    'AMT', 'CCI', 'EQIX', 'DLR', 'PLD', 'PSA', 'SPG', 'O', 'VNQ', 'IYR', 'SCHH', 'RWR', 'ICF', 'REM', 'MORT', 'PFF', 'PGX', 'PGF', 'PFFR', 'PFFA', 'PFFD',
    
    // Materials & Mining
    'FCX', 'NEM', 'GOLD', 'ABX', 'NEM', 'GOLD', 'ABX', 'FCX', 'RIO', 'BHP', 'VALE', 'SCCO', 'AA', 'AL', 'X', 'NUE', 'STLD', 'RS', 'CMC', 'SCHN', 'CENX', 'KALU',
    
    // Transportation & Logistics
    'UPS', 'FDX', 'EXPD', 'CHRW', 'JBHT', 'LSTR', 'ODFL', 'SAIA', 'XPO', 'GXO', 'KNX', 'ARCB', 'HUBG', 'YRCW', 'WERN', 'HTLD', 'MART', 'PTSI', 'USAK', 'CVLG',
    
    // Technology Hardware & Semiconductors
    'AAPL', 'NVDA', 'AMD', 'INTC', 'QCOM', 'AVGO', 'MU', 'TXN', 'ADI', 'MCHP', 'MRVL', 'KLAC', 'LRCX', 'AMAT', 'ASML', 'TSM', 'UMC', 'SMIC', 'GFS', 'INTC',
    
    // Software & Cloud
    'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'META', 'CRM', 'ORCL', 'ADBE', 'PYPL', 'UBER', 'LYFT', 'ZM', 'SHOP', 'SQ', 'TWLO', 'OKTA', 'CRWD', 'ZS', 'NET', 'DDOG',
    
    // Biotech & Healthcare Tech
    'GILD', 'AMGN', 'BIIB', 'REGN', 'VRTX', 'ALXN', 'ILMN', 'DXCM', 'ISRG', 'IDXX', 'ALGN', 'COO', 'WST', 'TMO', 'DHR', 'ABT', 'JNJ', 'PFE', 'MRK', 'BMY',
    
    // Emerging Markets & International
    'BABA', 'JD', 'PDD', 'BIDU', 'NIO', 'XPEV', 'LI', 'XPENG', 'TCEHY', 'NTES', 'BILI', 'TME', 'DIDI', 'XPEV', 'LI', 'NIO', 'XPEV', 'LI', 'XPENG', 'NIO',
    
    // Cryptocurrency & Blockchain
    'COIN', 'MSTR', 'RIOT', 'MARA', 'HUT', 'BITF', 'CLSK', 'CIFR', 'SOS', 'MOGO', 'SQ', 'PYPL', 'TSLA', 'MSTR', 'RIOT', 'MARA', 'HUT', 'BITF', 'CLSK',
    
    // Electric Vehicles & Clean Energy
    'TSLA', 'NIO', 'XPEV', 'LI', 'XPENG', 'RIVN', 'LCID', 'FSR', 'NKLA', 'WKHS', 'IDEX', 'SOLO', 'CANOO', 'GOEV', 'ARVL', 'LEV', 'EVGO', 'CHPT', 'BLNK',
    
    // Gaming & Entertainment
    'ATVI', 'EA', 'TTWO', 'ZNGA', 'U', 'RBLX', 'NTDOY', 'SNE', 'MSFT', 'GOOGL', 'META', 'NFLX', 'DIS', 'CMCSA', 'CHTR', 'FOX', 'NWSA', 'PARA', 'VIAC', 'DISCA',
    
    // Food & Beverage
    'KO', 'PEP', 'MNST', 'KDP', 'FIZZ', 'CELH', 'BROS', 'SHAK', 'WING', 'LOVE', 'FAT', 'MCD', 'YUM', 'CMG', 'DPZ', 'PZZA', 'DRI', 'BLMN', 'DIN', 'CAKE', 'JACK',
    
    // Luxury & Fashion
    'LVMUY', 'KER.PA', 'LUX', 'ULTA', 'SBUX', 'NKE', 'UA', 'LULU', 'SKX', 'CROX', 'DECK', 'VFC', 'GPS', 'LB', 'URBN', 'ANF', 'AEO', 'BKE', 'ZUMZ', 'HIBB',
    
    // Home & Garden
    'HD', 'LOW', 'TGT', 'WMT', 'COST', 'TJX', 'ROST', 'DG', 'DLTR', 'BURL', 'FIVE', 'OLLI', 'BIG',

    // Other
    'SOFI'
];

export { fallbackTickers };