export const questions = [
    {
      id: 'ageGroup',
      question: 'What is your age group?',
      options: [
        { value: 'under25', label: 'Under 25', score: 4 },
        { value: '25to34', label: '25-34', score: 3 },
        { value: '35to44', label: '35-44', score: 2 },
        { value: '45to54', label: '45-54', score: 2 },
        { value: '55plus', label: '55 or older', score: 1 },
      ],
    },
    {
      id: 'investmentGoals',
      question: 'What are your primary investment goals?',
      options: [
        { value: 'capitalPreservation', label: 'Capital preservation', score: 1 },
        { value: 'income', label: 'Regular income', score: 2 },
        { value: 'balancedGrowth', label: 'Balanced growth', score: 3 },
        { value: 'aggressiveGrowth', label: 'Aggressive growth', score: 4 },
        { value: 'speculative', label: 'Speculative investments', score: 5 },
      ],
    },
    {
      id: 'riskTolerance',
      question: 'How would you describe your risk tolerance?',
      options: [
        { value: 'veryLow', label: 'Very low - I avoid risk at all costs', score: 1 },
        { value: 'low', label: 'Low - I prefer stable investments', score: 2 },
        { value: 'moderate', label: 'Moderate - I can accept some fluctuations', score: 3 },
        { value: 'high', label: 'High - I\'m comfortable with significant volatility', score: 4 },
        { value: 'veryHigh', label: 'Very high - I seek maximum returns regardless of risk', score: 5 },
      ],
    },
    {
      id: 'investmentHorizon',
      question: 'What is your investment time horizon?',
      options: [
        { value: 'lessThan1Year', label: 'Less than 1 year', score: 1 },
        { value: '1to3Years', label: '1-3 years', score: 2 },
        { value: '3to5Years', label: '3-5 years', score: 3 },
        { value: '5to10Years', label: '5-10 years', score: 4 },
        { value: 'over10Years', label: 'Over 10 years', score: 5 },
      ],
    },
    {
      id: 'incomeStability',
      question: 'How stable is your current income?',
      options: [
        { value: 'veryUnstable', label: 'Very unstable', score: 1 },
        { value: 'somewhatUnstable', label: 'Somewhat unstable', score: 2 },
        { value: 'average', label: 'Average stability', score: 3 },
        { value: 'stable', label: 'Stable', score: 4 },
        { value: 'veryStable', label: 'Very stable', score: 5 },
      ],
    },
    {
      id: 'investmentKnowledge',
      question: 'How would you rate your investment knowledge?',
      options: [
        { value: 'novice', label: 'Novice - I know very little', score: 1 },
        { value: 'beginner', label: 'Beginner - I understand the basics', score: 2 },
        { value: 'intermediate', label: 'Intermediate - I have some experience', score: 3 },
        { value: 'advanced', label: 'Advanced - I am well-versed in investing', score: 4 },
        { value: 'expert', label: 'Expert - I have professional-level knowledge', score: 5 },
      ],
    },
    {
      id: 'portfolioAllocation',
      question: 'What portfolio allocation are you most comfortable with?',
      options: [
        { value: 'veryConservative', label: 'Very conservative (80% bonds, 20% stocks)', score: 1 },
        { value: 'conservative', label: 'Conservative (60% bonds, 40% stocks)', score: 2 },
        { value: 'balanced', label: 'Balanced (50% bonds, 50% stocks)', score: 3 },
        { value: 'growth', label: 'Growth (30% bonds, 70% stocks)', score: 4 },
        { value: 'aggressive', label: 'Aggressive (10% bonds, 90% stocks)', score: 5 },
      ],
    },
    {
      id: 'marketDownturn',
      question: 'How would you react to a significant market downturn?',
      options: [
        { value: 'sellAll', label: 'Sell all investments immediately', score: 1 },
        { value: 'sellSome', label: 'Sell some investments', score: 2 },
        { value: 'doNothing', label: 'Do nothing and wait it out', score: 3 },
        { value: 'buyMore', label: 'Buy more to take advantage of lower prices', score: 4 },
        { value: 'leveragedBuy', label: 'Borrow money to buy even more', score: 5 },
      ],
    },
    {
      id: 'emergencyFund',
      question: 'How much do you have saved in an emergency fund?',
      options: [
        { value: 'none', label: 'I donI\'t have an emergency fund', score: 1 },
        { value: 'less1Month', label: 'Less than 1 month of expenses', score: 2 },
        { value: '1to3Months', label: '1-3 months of expenses', score: 3 },
        { value: '3to6Months', label: '3-6 months of expenses', score: 4 },
        { value: 'over6Months', label: 'Over 6 months of expenses', score: 5 },
      ],
    },
    {
      id: 'retirementPlanning',
      question: 'How actively are you planning for retirement?',
      options: [
        { value: 'notStarted', label: 'I havenI\'t started planning yet', score: 1 },
        { value: 'minimalSavings', label: 'I have minimal retirement savings', score: 2 },
        { value: 'regularContributions', label: 'I make regular contributions to a retirement account', score: 3 },
        { value: 'wellFunded', label: 'My retirement accounts are well-funded', score: 4 },
        { value: 'comprehensivePlan', label: 'I have a comprehensive retirement plan', score: 5 },
      ],
    },
    {
      id: 'cryptoExperience',
      question: 'What is your experience with cryptocurrencies?',
      options: [
        { value: 'neverHeard', label: 'I\'ve never heard of cryptocurrencies', score: 1 },
        { value: 'heard', label: 'I\'ve heard of them but never invested', score: 2 },
        { value: 'minorInvestment', label: 'I\'ve made a minor investment in cryptocurrencies', score: 3 },
        { value: 'activeTrader', label: 'I actively trade cryptocurrencies', score: 4 },
        { value: 'expert', label: 'I\'m an expert in blockchain and cryptocurrencies', score: 5 },
      ],
    },
    {
      id: 'defiKnowledge',
      question: 'How familiar are you with DeFi (Decentralized Finance)?',
      options: [
        { value: 'unfamiliar', label: 'I\'m not familiar with DeFi', score: 1 },
        { value: 'basicUnderstanding', label: 'I have a basic understanding of DeFi', score: 2 },
        { value: 'someExperience', label: 'I have some experience with DeFi platforms', score: 3 },
        { value: 'activeUser', label: 'I\'m an active user of DeFi protocols', score: 4 },
        { value: 'developer', label: 'I develop DeFi applications', score: 5 },
      ],
    },
    {
      id: 'nftInterest',
      question: 'What is your level of interest in NFTs (Non-Fungible Tokens)?',
      options: [
        { value: 'noInterest', label: 'I have no interest in NFTs', score: 1 },
        { value: 'curious', label: 'I\'m curious but havenI\'t invested', score: 2 },
        { value: 'occasionalBuyer', label: 'I occasionally buy NFTs', score: 3 },
        { value: 'activeCollector', label: 'I\'m an active NFT collector', score: 4 },
        { value: 'creator', label: 'I create and sell my own NFTs', score: 5 },
      ],
    },
    {
      id: 'web3Adoption',
      question: 'How likely are you to adopt Web3 technologies in the near future?',
      options: [
        { value: 'veryUnlikely', label: 'Very unlikely', score: 1 },
        { value: 'unlikely', label: 'Unlikely', score: 2 },
        { value: 'neutral', label: 'Neutral', score: 3 },
        { value: 'likely', label: 'Likely', score: 4 },
        { value: 'veryLikely', label: 'Very likely', score: 5 },
      ],
    },
  ]