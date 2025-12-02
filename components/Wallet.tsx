import React, { useState } from 'react';
import { 
    WalletIcon, CreditCardIcon, LandmarkIcon, SmartphoneIcon, 
    BanknoteIcon, TrendingUpIcon, TrendingDownIcon, EyeIcon, EyeOffIcon, CopyIcon,
    AlertTriangleIcon, FileTextIcon, PieChartIcon, BriefcaseIcon, UserIcon
} from './Icons';
import { FinanceChart } from './Charts';

const Wallet: React.FC = () => {
  const [showNumbers, setShowNumbers] = useState(false);
  const [chartView, setChartView] = useState<'area' | 'bar'>('area');
  const [timeRange, setTimeRange] = useState<'monthly' | 'yearly'>('monthly');

  // Chart Data
  const monthlyData = [
    { label: 'May', income: 240000, expense: 75000 },
    { label: 'Jun', income: 280000, expense: 92000 },
    { label: 'Jul', income: 255000, expense: 68000 },
    { label: 'Aug', income: 310000, expense: 120000 },
    { label: 'Sep', income: 340000, expense: 85000 },
    { label: 'Oct', income: 350000, expense: 85400 },
  ];

  const yearlyData = [
    { label: '2019', income: 1200000, expense: 850000 },
    { label: '2020', income: 1540000, expense: 980000 },
    { label: '2021', income: 2100000, expense: 1250000 },
    { label: '2022', income: 2850000, expense: 1600000 },
    { label: '2023', income: 3600000, expense: 1950000 },
  ];

  // Financial Stats
  const stats = {
      netWorth: "BDT 8,542,000",
      cashInHand: "BDT 45,000",
      totalBankBalance: "BDT 8,497,000",
      totalIncome: "BDT 350,000",
      totalExpenses: "BDT 85,400",
      totalTransactions: "42",
      totalTxVolume: "BDT 435,400",
      loanBank: "BDT 1,200,000",
      loanFnF: "BDT 0.00"
  };

  const loanAlerts = [
    { id: 1, bank: "UCB BANK", amount: "BDT 25,000", date: "25th Oct, 2023", daysLeft: 2, status: "urgent" },
    { id: 2, bank: "BRAC BANK", amount: "BDT 12,500", date: "30th Oct, 2023", daysLeft: 7, status: "warning" }
  ];

  const fundSources = [
      { source: "Business Revenue", amount: "BDT 200,000", percent: 57, color: "bg-indigo-500" },
      { source: "Freelance", amount: "BDT 120,000", percent: 34, color: "bg-purple-500" },
      { source: "Investments (ROI)", amount: "BDT 30,000", percent: 9, color: "bg-emerald-500" }
  ];

  const expenseBreakdown = [
      { id: 1, cat: "Office Rent", type: "Business", amount: "BDT 35,000", date: "01 Oct" },
      { id: 2, cat: "Family Groceries", type: "Personal", amount: "BDT 12,400", date: "05 Oct" },
      { id: 3, cat: "Server Costs", type: "Business", amount: "BDT 8,500", date: "10 Oct" },
      { id: 4, cat: "Travel (Cox's Bazar)", type: "Personal", amount: "BDT 15,000", date: "15 Oct" },
      { id: 5, cat: "Staff Salaries", type: "Business", amount: "BDT 14,500", date: "20 Oct" },
  ];

  // Mock Banks Data
  const banks = [
      { 
          id: 1, 
          name: "UCB BANK", 
          branch: "Gulshan Corporate Branch",
          accountName: "SAIFUL ALAM RAFI",
          accountNo: "1234 5678 9012 3456",
          routing: "020271628",
          card: "4587 **** **** 9012",
          cardType: "Visa Platinum",
          balance: "BDT 2,450,000",
          theme: "from-red-900 via-red-800 to-black",
          text: "text-red-100"
      },
      { 
          id: 2, 
          name: "PUBALI BANK", 
          branch: "Motijheel Principal Branch",
          accountName: "SAIFUL ALAM RAFI",
          accountNo: "0987 6543 2109 8765",
          routing: "170271625",
          card: "5342 **** **** 1122",
          cardType: "Mastercard World",
          balance: "BDT 1,120,000",
          theme: "from-yellow-900 via-green-900 to-black",
          text: "text-yellow-100"
      },
      { 
          id: 3, 
          name: "THE CITY BANK", 
          branch: "Banani Branch",
          accountName: "SAIFUL ALAM RAFI",
          accountNo: "2100 8899 7766 5544",
          routing: "225271624",
          card: "4321 **** **** 6677",
          cardType: "Amex Platinum",
          balance: "BDT 3,500,000",
          theme: "from-neutral-800 via-neutral-900 to-black border-red-900", // City bank often uses Red/White/Black
          text: "text-white"
      },
      { 
          id: 4, 
          name: "BRAC BANK", 
          branch: "Head Office - Gulshan",
          accountName: "SAIFUL ALAM RAFI",
          accountNo: "1501 2020 3030 4040",
          routing: "060271629",
          card: "4999 **** **** 3344",
          cardType: "Visa Signature",
          balance: "BDT 980,000",
          theme: "from-blue-900 via-indigo-900 to-black",
          text: "text-blue-100"
      },
      { 
          id: 5, 
          name: "MIDLAND BANK", 
          branch: "Dhanmondi Branch",
          accountName: "SAIFUL ALAM RAFI",
          accountNo: "1001 5566 7788 9900",
          routing: "135271621",
          card: "5123 **** **** 8899",
          cardType: "Visa Gold",
          balance: "BDT 447,000",
          theme: "from-teal-900 via-emerald-900 to-black",
          text: "text-teal-100"
      }
  ];

  const digitalWallets = [
      {
          name: "Bkash",
          number: "017XX-XXXXXX",
          balance: "BDT 25,450",
          color: "bg-[#E2136E]"
      },
      {
          name: "Nagad",
          number: "019XX-XXXXXX",
          balance: "BDT 12,320",
          color: "bg-[#F6921E]"
      }
  ];

  const maskNumber = (num: string) => showNumbers ? num : num.replace(/\d(?=\d{4})/g, "•");

  return (
    <div className="p-6 md:p-10 h-full overflow-y-auto custom-scrollbar">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                    <WalletIcon className="w-8 h-8 text-indigo-400" />
                </div>
                My Wallet
            </h1>
            <p className="text-gray-400">Financial overview and asset management.</p>
          </div>
          
          <button 
            onClick={() => setShowNumbers(!showNumbers)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-sm font-medium"
          >
            {showNumbers ? <EyeOffIcon className="w-4 h-4 text-gray-400" /> : <EyeIcon className="w-4 h-4 text-gray-400" />}
            {showNumbers ? "Hide Details" : "Show Details"}
          </button>
      </div>

      {/* Financial Alerts Section */}
      <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
             <AlertTriangleIcon className="w-4 h-4 text-yellow-500" /> 
             Financial Alerts (Loan Repayments)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loanAlerts.map(alert => (
                  <div key={alert.id} className="glass-panel p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${alert.status === 'urgent' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                              <AlertTriangleIcon className="w-4 h-4" />
                          </div>
                          <div>
                              <p className="text-white font-bold text-sm">{alert.bank} Installment</p>
                              <p className="text-xs text-gray-400">Due: <span className="text-white">{alert.date}</span></p>
                          </div>
                      </div>
                      <div className="text-right">
                          <p className="text-white font-bold">{alert.amount}</p>
                          <p className={`text-[10px] font-bold uppercase ${alert.status === 'urgent' ? 'text-red-400' : 'text-yellow-400'}`}>
                              {alert.daysLeft} Days Left
                          </p>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* Financial Overview Chart Section */}
      <div className="glass-panel p-6 rounded-2xl border border-white/5 mb-10">
          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-6 gap-4">
              <div>
                  <h3 className="font-bold text-white text-lg">Financial Performance</h3>
                  <p className="text-sm text-gray-400">Income vs Expenses Analysis ({timeRange === 'monthly' ? 'Last 6 Months' : 'Last 5 Years'})</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                  {/* Time Range Toggle */}
                  <div className="flex bg-white/5 p-1 rounded-lg">
                      <button 
                        onClick={() => setTimeRange('monthly')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${timeRange === 'monthly' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                      >
                          Monthly
                      </button>
                      <button 
                        onClick={() => setTimeRange('yearly')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${timeRange === 'yearly' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                      >
                          Yearly
                      </button>
                  </div>

                  {/* View Type Toggle */}
                  <div className="flex bg-white/5 p-1 rounded-lg">
                      <button 
                        onClick={() => setChartView('area')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartView === 'area' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                      >
                          Area
                      </button>
                      <button 
                        onClick={() => setChartView('bar')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartView === 'bar' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                      >
                          Bar
                      </button>
                  </div>
              </div>
          </div>
          
          <div className="w-full">
               <FinanceChart data={timeRange === 'monthly' ? monthlyData : yearlyData} type={chartView} />
          </div>
      </div>

      {/* Main KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Total Income */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <TrendingUpIcon className="w-16 h-16 text-green-500" />
              </div>
              <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                      <BanknoteIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded">+8.2%</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Income (This Month)</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{stats.totalIncome}</h3>
          </div>

          {/* Total Expenses */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <TrendingDownIcon className="w-16 h-16 text-red-500" />
              </div>
              <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                      <TrendingDownIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold bg-red-500/20 text-red-400 px-2 py-1 rounded">+2.4%</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Expenses (This Month)</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{stats.totalExpenses}</h3>
          </div>

          {/* Total Transactions */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <FileTextIcon className="w-16 h-16 text-blue-500" />
              </div>
              <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                      <FileTextIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-400">{stats.totalTxVolume} Vol</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{stats.totalTransactions}</h3>
          </div>

          {/* Net Worth */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-indigo-900/20 to-transparent">
              <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                      <LandmarkIcon className="w-5 h-5" />
                  </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">Total Net Worth</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{stats.netWorth}</h3>
          </div>
      </div>

      {/* Analytics: Sources & Categorization */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Source of Fund */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5">
              <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-purple-400" />
                  Source of Funds
              </h3>
              <div className="space-y-6">
                  {fundSources.map((fund, idx) => (
                      <div key={idx}>
                          <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-300">{fund.source}</span>
                              <span className="text-white font-bold">{fund.amount}</span>
                          </div>
                          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden flex">
                              <div className={`h-full ${fund.color}`} style={{ width: `${fund.percent}%` }}></div>
                          </div>
                          <div className="text-right mt-1">
                              <span className="text-[10px] text-gray-500">{fund.percent}% Contribution</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Expenses Categorization Table */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5">
               <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <BriefcaseIcon className="w-5 h-5 text-pink-400" />
                        Expenses: Personal vs Business
                    </h3>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">This Month</span>
               </div>
               
               <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                       <thead>
                           <tr className="text-xs text-gray-500 border-b border-white/5">
                               <th className="py-3 font-normal">Date</th>
                               <th className="py-3 font-normal">Category</th>
                               <th className="py-3 font-normal">Type</th>
                               <th className="py-3 font-normal text-right">Amount</th>
                           </tr>
                       </thead>
                       <tbody className="text-sm">
                           {expenseBreakdown.map(item => (
                               <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                   <td className="py-3 text-gray-400">{item.date}</td>
                                   <td className="py-3 font-medium text-white">{item.cat}</td>
                                   <td className="py-3">
                                       <span className={`flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-md border w-fit ${
                                           item.type === 'Business' 
                                           ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                           : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                       }`}>
                                           {item.type === 'Business' ? <BriefcaseIcon className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                                           {item.type}
                                       </span>
                                   </td>
                                   <td className="py-3 text-right text-gray-300 font-mono">{item.amount}</td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
               <div className="mt-4 pt-4 border-t border-white/5 flex justify-end gap-6 text-sm">
                   <div className="text-right">
                       <p className="text-xs text-gray-500">Total Personal</p>
                       <p className="text-purple-400 font-bold">BDT 27,400</p>
                   </div>
                   <div className="text-right">
                       <p className="text-xs text-gray-500">Total Business</p>
                       <p className="text-blue-400 font-bold">BDT 58,000</p>
                   </div>
               </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
           {/* Loan Stats */}
           <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingDownIcon className="w-5 h-5 text-red-400" />
                    Liabilities & Loans
                </h3>
                
                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-400 text-sm">Bank Loans</span>
                            <span className="text-white font-bold">{stats.loanBank}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-red-500 w-[60%]"></div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex justify-between mb-1">
                            <span className="text-gray-400 text-sm">Friends & Family</span>
                            <span className="text-white font-bold">{stats.loanFnF}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-blue-500 w-[0%]"></div>
                        </div>
                    </div>
                </div>
           </div>

           {/* Digital Wallets */}
           <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5">
                <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                    <SmartphoneIcon className="w-5 h-5 text-purple-400" />
                    Digital Wallets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {digitalWallets.map((wallet) => (
                        <div key={wallet.name} className={`relative overflow-hidden rounded-2xl p-6 ${wallet.color} shadow-xl transform transition-transform hover:scale-[1.02]`}>
                             {/* Decorative circles */}
                             <div className="absolute top-[-20px] right-[-20px] w-24 h-24 rounded-full bg-white opacity-20 blur-2xl"></div>
                             <div className="absolute bottom-[-20px] left-[-20px] w-20 h-20 rounded-full bg-black opacity-10 blur-xl"></div>
                             
                             <div className="relative z-10 flex justify-between items-start">
                                 <div>
                                     <h4 className="text-white font-bold text-lg">{wallet.name}</h4>
                                     <p className="text-white/80 text-sm mt-1">{maskNumber(wallet.number)}</p>
                                 </div>
                                 <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                                     <SmartphoneIcon className="w-6 h-6 text-white" />
                                 </div>
                             </div>
                             
                             <div className="relative z-10 mt-8">
                                 <p className="text-white/80 text-xs uppercase tracking-wider">Available Balance</p>
                                 <h3 className="text-2xl font-bold text-white mt-1">{showNumbers ? wallet.balance : '••••••'}</h3>
                             </div>
                        </div>
                    ))}
                </div>
           </div>
      </div>

      {/* Bank Accounts Grid */}
      <div>
          <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-2">
              <LandmarkIcon className="w-6 h-6 text-indigo-400" />
              Bank Accounts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {banks.map((bank) => (
                  <div key={bank.id} className={`
                      relative overflow-hidden rounded-2xl p-6 border border-white/10 shadow-2xl group
                      bg-gradient-to-br ${bank.theme}
                  `}>
                      {/* Abstract Shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                      {/* Header */}
                      <div className="flex justify-between items-start mb-8 relative z-10">
                          <div>
                              <h4 className={`font-bold text-lg ${bank.text}`}>{bank.name}</h4>
                              <p className={`text-xs opacity-70 ${bank.text}`}>{bank.branch}</p>
                          </div>
                          <div className={`p-2 rounded-lg bg-white/10 backdrop-blur-md ${bank.text}`}>
                             <LandmarkIcon className="w-5 h-5" />
                          </div>
                      </div>

                      {/* Chip & Contactless (Visuals) */}
                      <div className="flex items-center gap-3 mb-8 opacity-80 relative z-10">
                          <div className="w-10 h-8 rounded bg-gradient-to-tr from-yellow-200 to-yellow-500 border border-yellow-600 shadow-inner"></div>
                          <svg className={`w-6 h-6 ${bank.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                          </svg>
                      </div>

                      {/* Account Details */}
                      <div className="space-y-1 mb-6 relative z-10">
                          <p className={`text-xs opacity-60 uppercase tracking-widest ${bank.text}`}>Account Number</p>
                          <div className="flex items-center gap-2">
                              <p className={`font-mono text-xl tracking-wider ${bank.text}`}>
                                  {maskNumber(bank.accountNo)}
                              </p>
                              <button 
                                className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded ${bank.text}`}
                                title="Copy Account Number"
                              >
                                  <CopyIcon className="w-3 h-3" />
                              </button>
                          </div>
                      </div>

                      <div className="flex justify-between items-end relative z-10">
                          <div>
                              <p className={`text-xs opacity-60 uppercase ${bank.text}`}>Account Holder</p>
                              <p className={`font-medium tracking-wide ${bank.text}`}>{bank.accountName}</p>
                          </div>
                          <div className="text-right">
                              <p className={`text-xs opacity-60 uppercase ${bank.text}`}>Balance</p>
                              <p className={`font-bold text-lg ${bank.text}`}>{showNumbers ? bank.balance : '••••••'}</p>
                          </div>
                      </div>
                      
                      {/* Footer Info */}
                      <div className={`mt-6 pt-4 border-t border-white/10 flex justify-between text-[10px] ${bank.text} opacity-60 relative z-10`}>
                          <span>Routing: {bank.routing}</span>
                          <span>{bank.cardType}</span>
                      </div>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};

export default Wallet;