import type {
  User, KYCEntry, Order, Stock, WalletTransaction, P2PTransfer, P2PDispute,
  AMLAlert, AuditLog, SupportTicket, Lesson, NewsArticle, Badge as BadgeType,
  RafikiConversation, RevenueDataPoint, AUMSnapshot, UserGrowthPoint,
  VolumeDataPoint, Campaign, ReferralEntry, CohortData, RiskIncident,
  MarginCall, ConcentrationRisk, FeatureFlag, GlobalLimit, SystemMetric,
  SystemAlert, DerivativesPosition, DerivativesCertification, STRReport,
  AdminUser, WaitlistEntry, LiveChatSession,
} from "../types";

// ── Chart Data ────────────────────────────────────────────────────

export const MOCK_REVENUE_DATA: RevenueDataPoint[] = [
  { month: "Oct", trading: 3200000, p2p: 980000, withdrawal: 420000, total: 4600000 },
  { month: "Nov", trading: 3800000, p2p: 1100000, withdrawal: 510000, total: 5410000 },
  { month: "Dec", trading: 4100000, p2p: 1250000, withdrawal: 580000, total: 5930000 },
  { month: "Jan", trading: 3600000, p2p: 1050000, withdrawal: 490000, total: 5140000 },
  { month: "Feb", trading: 4400000, p2p: 1350000, withdrawal: 620000, total: 6370000 },
  { month: "Mar", trading: 4820000, p2p: 1490000, withdrawal: 670000, total: 6980000 },
  { month: "Apr", trading: 4200000, p2p: 1280000, withdrawal: 590000, total: 6070000 },
];

export const MOCK_AUM_DATA: AUMSnapshot[] = [
  { date: "Oct", equities: 1600000000, etfs: 320000000, bonds: 180000000, cash: 210000000, total: 2310000000 },
  { date: "Nov", equities: 1720000000, etfs: 340000000, bonds: 190000000, cash: 220000000, total: 2470000000 },
  { date: "Dec", equities: 1840000000, etfs: 360000000, bonds: 200000000, cash: 240000000, total: 2640000000 },
  { date: "Jan", equities: 1780000000, etfs: 350000000, bonds: 195000000, cash: 230000000, total: 2555000000 },
  { date: "Feb", equities: 1920000000, etfs: 380000000, bonds: 210000000, cash: 250000000, total: 2760000000 },
  { date: "Mar", equities: 2050000000, etfs: 400000000, bonds: 220000000, cash: 265000000, total: 2935000000 },
  { date: "Apr", equities: 2140000000, etfs: 420000000, bonds: 230000000, cash: 275000000, total: 3065000000 },
];

export const MOCK_USER_GROWTH: UserGrowthPoint[] = [
  { date: "Mon", users: 47200, newUsers: 180, churned: 12 },
  { date: "Tue", users: 47390, newUsers: 210, churned: 8 },
  { date: "Wed", users: 47620, newUsers: 240, churned: 15 },
  { date: "Thu", users: 47880, newUsers: 270, churned: 10 },
  { date: "Fri", users: 48130, newUsers: 265, churned: 18 },
  { date: "Sat", users: 48230, newUsers: 120, churned: 6 },
  { date: "Sun", users: 48291, newUsers: 80, churned: 4 },
];

export const MOCK_VOLUME_DATA: VolumeDataPoint[] = [
  { day: "Mon", volume: 98000000, trades: 1240, buyVolume: 62000000, sellVolume: 36000000 },
  { day: "Tue", volume: 124000000, trades: 1580, buyVolume: 78000000, sellVolume: 46000000 },
  { day: "Wed", volume: 109000000, trades: 1390, buyVolume: 67000000, sellVolume: 42000000 },
  { day: "Thu", volume: 137000000, trades: 1720, buyVolume: 85000000, sellVolume: 52000000 },
  { day: "Fri", volume: 142000000, trades: 1840, buyVolume: 91000000, sellVolume: 51000000 },
  { day: "Sat", volume: 58000000, trades: 720, buyVolume: 38000000, sellVolume: 20000000 },
];

// ── NSE Stocks ────────────────────────────────────────────────────

export const MOCK_NSE_STOCKS: Stock[] = [
  { ticker: "SCOM", name: "Safaricom PLC", sector: "Telecom", lastPrice: 18.75, change: 0.25, changePct: 1.35, volume: 8420000, marketCap: 74850000000, pe: 14.2, yearHigh: 22.10, yearLow: 14.30, assetClass: "equity", tradingStatus: "active" },
  { ticker: "EQTY", name: "Equity Group Holdings", sector: "Banking", lastPrice: 46.80, change: -0.40, changePct: -0.85, volume: 3210000, marketCap: 176400000000, pe: 8.7, yearHigh: 52.50, yearLow: 38.00, assetClass: "equity", tradingStatus: "active" },
  { ticker: "KCB", name: "KCB Group PLC", sector: "Banking", lastPrice: 38.20, change: 0.60, changePct: 1.60, volume: 2870000, marketCap: 122720000000, pe: 7.4, yearHigh: 44.00, yearLow: 29.50, assetClass: "equity", tradingStatus: "active" },
  { ticker: "EABL", name: "East African Breweries", sector: "Consumer Goods", lastPrice: 142.50, change: -2.00, changePct: -1.38, volume: 420000, marketCap: 112680000000, pe: 21.3, yearHigh: 168.00, yearLow: 120.00, assetClass: "equity", tradingStatus: "active" },
  { ticker: "COOP", name: "Co-operative Bank", sector: "Banking", lastPrice: 14.35, change: 0.15, changePct: 1.06, volume: 4120000, marketCap: 84440000000, pe: 6.8, yearHigh: 17.20, yearLow: 11.50, assetClass: "equity", tradingStatus: "active" },
  { ticker: "BAT", name: "British American Tobacco", sector: "Consumer Goods", lastPrice: 460.00, change: 5.00, changePct: 1.10, volume: 85000, marketCap: 18400000000, pe: 12.1, yearHigh: 495.00, yearLow: 400.00, assetClass: "equity", tradingStatus: "active" },
  { ticker: "NCBA", name: "NCBA Group PLC", sector: "Banking", lastPrice: 34.70, change: -0.30, changePct: -0.86, volume: 1540000, marketCap: 56500000000, pe: 9.2, yearHigh: 40.00, yearLow: 28.00, assetClass: "equity", tradingStatus: "active" },
  { ticker: "ABSA", name: "Absa Bank Kenya", sector: "Banking", lastPrice: 15.10, change: 0.10, changePct: 0.67, volume: 2300000, marketCap: 82160000000, pe: 7.9, yearHigh: 17.50, yearLow: 12.00, assetClass: "equity", tradingStatus: "active" },
  { ticker: "STAG", name: "Standard Group", sector: "Media", lastPrice: 18.00, change: -0.50, changePct: -2.70, volume: 120000, marketCap: 3240000000, pe: 7.6, yearHigh: 24.00, yearLow: 14.00, assetClass: "equity", tradingStatus: "halted" },
  { ticker: "WPP", name: "WPP Scangroup", sector: "Marketing", lastPrice: 8.25, change: 0.05, changePct: 0.61, volume: 88000, marketCap: 2310000000, pe: 18.4, yearHigh: 10.50, yearLow: 6.50, assetClass: "equity", tradingStatus: "active" },
];

export const MOCK_NSE_ETFS: Stock[] = [
  { ticker: "NSETF", name: "NSE 25 Share Index ETF", sector: "ETF", lastPrice: 24.80, change: 0.30, changePct: 1.22, volume: 480000, marketCap: 4960000000, yearHigh: 27.50, yearLow: 20.00, assetClass: "etf", tradingStatus: "active" },
  { ticker: "EACTF", name: "East Africa Growth ETF", sector: "ETF", lastPrice: 18.40, change: -0.20, changePct: -1.08, volume: 290000, marketCap: 2760000000, yearHigh: 21.00, yearLow: 15.50, assetClass: "etf", tradingStatus: "active" },
];

// ── Users ─────────────────────────────────────────────────────────

export const MOCK_USERS: User[] = [
  {
    id: "USR001", OlkasisId: "ZAN-001-2024", name: "James Mwangi", email: "j.mwangi@email.com",
    phone: "+254712345678", dob: "1990-03-15", gender: "male", nationality: "Kenyan",
    address: { street: "14 Westlands Ave", city: "Nairobi", county: "Nairobi", country: "Kenya", postalCode: "00100" },
    accountType: "individual", accountStatus: "active", kycStatus: "verified",
    riskProfile: "moderate", registeredAt: "2024-01-15T09:30:00Z", lastActive: "2026-04-16T08:00:00Z",
    wallet: { checkIn: 245000, account: 1820000, pending: 50000, held: 120000 },
    portfolio: { totalValue: 2450000, totalCost: 1980000, pnl: 470000, pnlPct: 23.7, holdings: [] },
    cdscNumber: "CDSC0012345", referredBy: "USR010", totalTrades: 284, totalDeposits: 3200000,
    totalWithdrawals: 980000, complianceFlags: 0, openTickets: 0, deviceOS: "iOS", location: "Nairobi",
    isDerivativesEnabled: true, loginHistory: [
      { timestamp: "2026-04-16T08:00:00Z", device: "iPhone 14", location: "Nairobi, KE", ip: "197.232.1.1", success: true },
      { timestamp: "2026-04-15T19:22:00Z", device: "iPhone 14", location: "Nairobi, KE", ip: "197.232.1.1", success: true },
    ],
  },
  {
    id: "USR002", OlkasisId: "ZAN-002-2024", name: "Faith Njeri", email: "faith.njeri@email.com",
    phone: "+254723456789", dob: "1995-07-22", gender: "female", nationality: "Kenyan",
    address: { street: "7 Karen Road", city: "Nairobi", county: "Nairobi", country: "Kenya", postalCode: "00502" },
    accountType: "individual", accountStatus: "active", kycStatus: "verified",
    riskProfile: "conservative", registeredAt: "2024-02-10T11:00:00Z", lastActive: "2026-04-15T14:30:00Z",
    wallet: { checkIn: 82000, account: 640000, pending: 0, held: 0 },
    portfolio: { totalValue: 820000, totalCost: 750000, pnl: 70000, pnlPct: 9.3, holdings: [] },
    cdscNumber: "CDSC0023456", totalTrades: 67, totalDeposits: 980000, totalWithdrawals: 280000,
    complianceFlags: 0, openTickets: 1, deviceOS: "Android", location: "Nairobi", isDerivativesEnabled: false,
    loginHistory: [],
  },
  {
    id: "USR003", OlkasisId: "ZAN-003-2024", name: "Peter Kamau", email: "p.kamau@email.com",
    phone: "+254734567890", dob: "1985-11-08", gender: "male", nationality: "Kenyan",
    address: { street: "22 Kilimani Lane", city: "Nairobi", county: "Nairobi", country: "Kenya", postalCode: "00200" },
    accountType: "joint", accountStatus: "active", kycStatus: "verified",
    riskProfile: "aggressive", registeredAt: "2023-11-20T08:00:00Z", lastActive: "2026-04-16T07:15:00Z",
    wallet: { checkIn: 580000, account: 4200000, pending: 200000, held: 800000 },
    portfolio: { totalValue: 8400000, totalCost: 6100000, pnl: 2300000, pnlPct: 37.7, holdings: [] },
    cdscNumber: "CDSC0034567", totalTrades: 891, totalDeposits: 12000000, totalWithdrawals: 3800000,
    complianceFlags: 1, openTickets: 0, deviceOS: "iOS", location: "Nairobi", isDerivativesEnabled: true,
    loginHistory: [],
  },
  {
    id: "USR004", OlkasisId: "ZAN-004-2024", name: "Amina Hassan", email: "a.hassan@email.com",
    phone: "+254745678901", dob: "2002-04-14", gender: "female", nationality: "Kenyan",
    address: { street: "5 Parklands Rd", city: "Nairobi", county: "Nairobi", country: "Kenya", postalCode: "00620" },
    accountType: "individual", accountStatus: "pending", kycStatus: "pending",
    riskProfile: "moderate", registeredAt: "2026-04-14T15:00:00Z", lastActive: "2026-04-14T15:30:00Z",
    wallet: { checkIn: 0, account: 0, pending: 0, held: 0 },
    portfolio: { totalValue: 0, totalCost: 0, pnl: 0, pnlPct: 0, holdings: [] },
    totalTrades: 0, totalDeposits: 0, totalWithdrawals: 0, complianceFlags: 0, openTickets: 0,
    deviceOS: "Android", location: "Nairobi", isDerivativesEnabled: false, loginHistory: [],
  },
  {
    id: "USR005", OlkasisId: "ZAN-005-2023", name: "David Ochieng", email: "d.ochieng@email.com",
    phone: "+254756789012", dob: "1978-09-25", gender: "male", nationality: "Kenyan",
    address: { street: "18 Hurlingham", city: "Nairobi", county: "Nairobi", country: "Kenya", postalCode: "00100" },
    accountType: "individual", accountStatus: "suspended", kycStatus: "verified",
    riskProfile: "aggressive", registeredAt: "2023-06-01T09:00:00Z", lastActive: "2026-03-28T10:00:00Z",
    wallet: { checkIn: 12000, account: 0, pending: 0, held: 0 },
    portfolio: { totalValue: 120000, totalCost: 180000, pnl: -60000, pnlPct: -33.3, holdings: [] },
    cdscNumber: "CDSC0056789", totalTrades: 1240, totalDeposits: 4500000, totalWithdrawals: 4400000,
    complianceFlags: 3, openTickets: 2, deviceOS: "Android", location: "Nairobi", isDerivativesEnabled: false,
    loginHistory: [],
  },
  {
    id: "USR006", OlkasisId: "ZAN-006-2025", name: "Grace Wanjiku", email: "g.wanjiku@email.com",
    phone: "+254767890123", dob: "1993-12-03", gender: "female", nationality: "Kenyan",
    address: { street: "9 Kileleshwa", city: "Nairobi", county: "Nairobi", country: "Kenya", postalCode: "00200" },
    accountType: "individual", accountStatus: "active", kycStatus: "verified",
    riskProfile: "moderate", registeredAt: "2025-01-10T12:00:00Z", lastActive: "2026-04-15T20:00:00Z",
    wallet: { checkIn: 145000, account: 890000, pending: 30000, held: 60000 },
    portfolio: { totalValue: 1200000, totalCost: 1050000, pnl: 150000, pnlPct: 14.3, holdings: [] },
    cdscNumber: "CDSC0067890", totalTrades: 148, totalDeposits: 1800000, totalWithdrawals: 680000,
    complianceFlags: 0, openTickets: 0, deviceOS: "iOS", location: "Nairobi", isDerivativesEnabled: false,
    loginHistory: [],
  },
];

// ── Waitlist ──────────────────────────────────────────────────────

export const MOCK_WAITLIST: WaitlistEntry[] = [
  { id: "WL001", name: "Collins Omondi", email: "c.omondi@email.com", phone: "+254711000001", joinedAt: "2026-04-14T08:00:00Z", position: 1, status: "invited", source: "referral", referralCode: "JM2024" },
  { id: "WL002", name: "Lucy Otieno", email: "l.otieno@email.com", phone: "+254711000002", joinedAt: "2026-04-14T09:20:00Z", position: 2, status: "waiting", source: "organic" },
  { id: "WL003", name: "Brian Mutua", email: "b.mutua@email.com", phone: "+254711000003", joinedAt: "2026-04-14T11:00:00Z", position: 3, status: "waiting", source: "social" },
  { id: "WL004", name: "Stella Achieng", email: "s.achieng@email.com", phone: "+254711000004", joinedAt: "2026-04-15T07:30:00Z", position: 4, status: "waiting", source: "ad" },
  { id: "WL005", name: "Kevin Njoroge", email: "k.njoroge@email.com", phone: "+254711000005", joinedAt: "2026-04-15T10:00:00Z", position: 5, status: "waiting", source: "referral", referralCode: "GW2025" },
  { id: "WL006", name: "Rita Mwenda", email: "r.mwenda@email.com", phone: "+254711000006", joinedAt: "2026-04-15T12:30:00Z", position: 6, status: "registered", source: "organic" },
];

// ── KYC ──────────────────────────────────────────────────────────

export const MOCK_KYC_QUEUE: KYCEntry[] = [
  {
    id: "KYC001", userId: "USR004", userName: "Amina Hassan", userEmail: "a.hassan@email.com",
    accountType: "individual", submittedAt: "2026-04-14T15:00:00Z", waitTime: "2d",
    priority: "urgent", documents: [{ type: "national_id", url: "#", uploadedAt: "2026-04-14T15:00:00Z", ocrData: { name: "AMINA HASSAN", dob: "2002-04-14", idNo: "38291047" } }],
    selfieUrl: "#", livenessScore: 92, verificationProvider: "smile_id", providerStatus: "passed",
    riskScore: 18, riskFlags: [], status: "pending",
  },
  {
    id: "KYC002", userId: "USR007", userName: "Samuel Kipchoge", userEmail: "s.kipchoge@email.com",
    accountType: "individual", submittedAt: "2026-04-15T09:00:00Z", waitTime: "1d",
    priority: "high", documents: [{ type: "passport", url: "#", uploadedAt: "2026-04-15T09:00:00Z" }],
    selfieUrl: "#", livenessScore: 78, verificationProvider: "onfido", providerStatus: "manual_review",
    riskScore: 42, riskFlags: [{ type: "Low liveness score", severity: "medium", description: "Liveness check score below threshold" }], status: "pending",
  },
  {
    id: "KYC003", userId: "USR008", userName: "Mercy Akinyi", userEmail: "m.akinyi@email.com",
    accountType: "joint", submittedAt: "2026-04-15T11:30:00Z", waitTime: "22h",
    priority: "normal", documents: [{ type: "national_id", url: "#", uploadedAt: "2026-04-15T11:30:00Z" }],
    selfieUrl: "#", livenessScore: 96, verificationProvider: "smile_id", providerStatus: "passed",
    riskScore: 12, riskFlags: [], status: "pending",
    coHolders: [{ name: "John Akinyi", email: "j.akinyi@email.com", phone: "+254711222333", kycStatus: "pending", relationship: "Spouse" }],
  },
  {
    id: "KYC004", userId: "USR009", userName: "Patrick Ndegwa", userEmail: "p.ndegwa@email.com",
    accountType: "individual", submittedAt: "2026-04-16T07:00:00Z", waitTime: "2h",
    priority: "normal", documents: [{ type: "driving_license", url: "#", uploadedAt: "2026-04-16T07:00:00Z" }],
    livenessScore: 88, verificationProvider: "smile_id", providerStatus: "passed",
    riskScore: 24, riskFlags: [], status: "pending",
  },
];

// ── Orders ────────────────────────────────────────────────────────

export const MOCK_ORDERS: Order[] = [
  { id: "ORD001", userId: "USR001", userName: "James Mwangi", ticker: "SCOM", companyName: "Safaricom PLC", side: "buy", type: "limit", quantity: 5000, price: 18.50, executedPrice: 18.52, totalValue: 92600, status: "executed", placedAt: "2026-04-16T08:00:00Z", executedAt: "2026-04-16T08:01:30Z", settlementStatus: "pending", settlementDate: "2026-04-21", fees: 462, assetClass: "equity" },
  { id: "ORD002", userId: "USR003", userName: "Peter Kamau", ticker: "EQTY", companyName: "Equity Group", side: "sell", type: "market", quantity: 2000, price: 46.80, executedPrice: 46.75, totalValue: 93500, status: "executed", placedAt: "2026-04-16T08:05:00Z", executedAt: "2026-04-16T08:05:22Z", settlementStatus: "pending", settlementDate: "2026-04-21", fees: 467, assetClass: "equity" },
  { id: "ORD003", userId: "USR006", userName: "Grace Wanjiku", ticker: "KCB", companyName: "KCB Group PLC", side: "buy", type: "limit", quantity: 1000, price: 38.00, totalValue: 38000, status: "pending", placedAt: "2026-04-16T09:00:00Z", fees: 190, assetClass: "equity" },
  { id: "ORD004", userId: "USR002", userName: "Faith Njeri", ticker: "EABL", companyName: "East African Breweries", side: "buy", type: "limit", quantity: 200, price: 140.00, totalValue: 28000, status: "cancelled", placedAt: "2026-04-15T14:00:00Z", fees: 0, assetClass: "equity" },
  { id: "ORD005", userId: "USR001", userName: "James Mwangi", ticker: "NSETF", companyName: "NSE 25 ETF", side: "buy", type: "market", quantity: 10000, price: 24.80, executedPrice: 24.82, totalValue: 248200, status: "executed", placedAt: "2026-04-15T10:00:00Z", executedAt: "2026-04-15T10:00:45Z", settlementStatus: "settled", settlementDate: "2026-04-18", fees: 1241, assetClass: "etf" },
  { id: "ORD006", userId: "USR005", userName: "David Ochieng", ticker: "SCOM", companyName: "Safaricom PLC", side: "sell", type: "market", quantity: 20000, price: 17.00, totalValue: 340000, status: "failed", placedAt: "2026-03-28T10:00:00Z", fees: 0, assetClass: "equity" },
];

// ── Derivatives ───────────────────────────────────────────────────

export const MOCK_DERIVATIVES_POSITIONS: DerivativesPosition[] = [
  { id: "DRV001", userId: "USR001", userName: "James Mwangi", ticker: "SCOM-FUT-JUN26", type: "futures", direction: "long", quantity: 10000, entryPrice: 18.00, currentPrice: 18.75, pnl: 7500, pnlPct: 4.17, marginUsed: 45000, marginAvailable: 380000, marginUtilization: 10.6, liquidationPrice: 15.20, expiry: "2026-06-30", status: "open" },
  { id: "DRV002", userId: "USR003", userName: "Peter Kamau", ticker: "EQTY-FUT-SEP26", type: "futures", direction: "short", quantity: 5000, entryPrice: 50.00, currentPrice: 46.80, pnl: 16000, pnlPct: 6.40, marginUsed: 120000, marginAvailable: 180000, marginUtilization: 40.0, liquidationPrice: 54.50, expiry: "2026-09-30", status: "open" },
  { id: "DRV003", userId: "USR010", userName: "Michael Kariuki", ticker: "KCB-OPT-JUN26", type: "options", direction: "long", quantity: 3000, entryPrice: 2.50, currentPrice: 1.20, pnl: -3900, pnlPct: -52.0, marginUsed: 7500, marginAvailable: 8000, marginUtilization: 93.8, liquidationPrice: 0.80, expiry: "2026-06-30", status: "at_risk" },
  { id: "DRV004", userId: "USR011", userName: "Josephine Wambua", ticker: "SCOM-FUT-SEP26", type: "futures", direction: "long", quantity: 50000, entryPrice: 20.00, currentPrice: 18.75, pnl: -62500, pnlPct: -6.25, marginUsed: 450000, marginAvailable: 12000, marginUtilization: 97.4, liquidationPrice: 18.40, expiry: "2026-09-30", status: "margin_call" },
];

export const MOCK_DERIVATIVES_CERTS: DerivativesCertification[] = [
  { id: "CERT001", userId: "USR008", userName: "Mercy Akinyi", submittedAt: "2026-04-15T14:00:00Z", score: 82, passMark: 75, status: "pending_review", quizAnswers: [] },
  { id: "CERT002", userId: "USR009", userName: "Patrick Ndegwa", submittedAt: "2026-04-16T09:00:00Z", score: 91, passMark: 75, status: "pending_review", quizAnswers: [] },
  { id: "CERT003", userId: "USR012", userName: "Nancy Chebet", submittedAt: "2026-04-14T11:00:00Z", score: 68, passMark: 75, status: "rejected", reviewedBy: "Nick Juma", quizAnswers: [] },
];

// ── Wallet Transactions ───────────────────────────────────────────

export const MOCK_WALLET_TRANSACTIONS: WalletTransaction[] = [
  { id: "TX001", ref: "TXN-2026-001", userId: "USR001", user: "James Mwangi", type: "deposit", category: "M-Pesa Deposit", amount: 100000, fee: 0, netAmount: 100000, method: "mpesa", status: "completed", description: "M-Pesa deposit", walletBefore: 145000, walletAfter: 245000, timestamp: "2026-04-16T07:00:00Z", mpesaRef: "QFH8TXYQ71" },
  { id: "TX002", ref: "TXN-2026-002", userId: "USR003", user: "Peter Kamau", type: "withdrawal", category: "Bank Withdrawal", amount: 500000, fee: 500, netAmount: 499500, method: "bank_transfer", status: "pending", description: "Bank withdrawal request", walletBefore: 580000, walletAfter: 80000, timestamp: "2026-04-16T06:45:00Z" },
  { id: "TX003", ref: "TXN-2026-003", userId: "USR002", user: "Faith Njeri", type: "trade_buy", category: "Trade Settlement", amount: 38000, fee: 190, netAmount: 38190, method: "internal", status: "completed", description: "Buy KCB 1000 shares", walletBefore: 680000, walletAfter: 641810, timestamp: "2026-04-15T14:30:00Z" },
  { id: "TX004", ref: "TXN-2026-004", userId: "USR001", user: "James Mwangi", type: "p2p_send", category: "P2P Transfer", amount: 20000, fee: 20, netAmount: 20020, method: "internal", status: "completed", description: "Send to Grace Wanjiku", walletBefore: 265000, walletAfter: 244980, timestamp: "2026-04-15T12:00:00Z" },
  { id: "TX005", ref: "TXN-2026-005", userId: "USR005", user: "David Ochieng", type: "deposit", category: "Card Deposit", amount: 50000, fee: 1500, netAmount: 48500, method: "card", status: "failed", description: "Card deposit declined", walletBefore: 12000, walletAfter: 12000, timestamp: "2026-04-15T10:00:00Z" },
  { id: "TX006", ref: "TXN-2026-006", userId: "USR006", user: "Grace Wanjiku", type: "p2p_receive", category: "P2P Transfer", amount: 20000, fee: 0, netAmount: 20000, method: "internal", status: "completed", description: "Received from James Mwangi", walletBefore: 125000, walletAfter: 145000, timestamp: "2026-04-15T12:00:30Z" },
  { id: "TX007", ref: "TXN-2026-007", userId: "USR001", user: "James Mwangi", type: "dividend", category: "Dividend Payment", amount: 12500, fee: 0, netAmount: 12500, method: "internal", status: "completed", description: "SCOM interim dividend", walletBefore: 232480, walletAfter: 244980, timestamp: "2026-04-14T09:00:00Z" },
  { id: "TX008", ref: "TXN-2026-008", userId: "USR003", user: "Peter Kamau", type: "refund", category: "Trade Refund", amount: 5000, fee: 0, netAmount: 5000, method: "internal", status: "completed", description: "Failed order refund", walletBefore: 575000, walletAfter: 580000, timestamp: "2026-04-14T15:00:00Z", processedBy: "Nick Juma" },
];

// ── P2P ───────────────────────────────────────────────────────────

export const MOCK_P2P_TRANSFERS: P2PTransfer[] = [
  { id: "P2P001", ref: "P2P-2026-001", senderId: "USR001", senderName: "James Mwangi", receiverId: "USR006", receiverName: "Grace Wanjiku", amount: 20000, fee: 20, type: "p2p", method: "Olkasis_id", status: "completed", note: "Lunch", timestamp: "2026-04-15T12:00:00Z", hasDispute: false },
  { id: "P2P002", ref: "P2P-2026-002", senderId: "USR003", senderName: "Peter Kamau", receiverId: "USR002", receiverName: "Faith Njeri", amount: 150000, fee: 150, type: "business", method: "phone", status: "completed", timestamp: "2026-04-15T09:30:00Z", hasDispute: false },
  { id: "P2P003", ref: "P2P-2026-003", senderId: "USR002", senderName: "Faith Njeri", receiverId: "USR007", receiverName: "Samuel Kipchoge", amount: 5000, fee: 5, type: "gift", method: "qr", status: "disputed", timestamp: "2026-04-14T16:00:00Z", hasDispute: true, disputeId: "DSP001" },
  { id: "P2P004", ref: "P2P-2026-004", senderId: "USR006", senderName: "Grace Wanjiku", receiverId: "USR001", receiverName: "James Mwangi", amount: 8000, fee: 8, type: "p2p", method: "Olkasis_id", status: "pending", timestamp: "2026-04-16T08:30:00Z", hasDispute: false },
  { id: "P2P005", ref: "P2P-2026-005", senderId: "USR005", senderName: "David Ochieng", receiverId: "USR013", receiverName: "Alex Maina", amount: 2500000, fee: 2500, type: "business", method: "Olkasis_id", status: "completed", timestamp: "2026-04-13T11:00:00Z", hasDispute: false },
];

export const MOCK_P2P_DISPUTES: P2PDispute[] = [
  { id: "DSP001", transferId: "P2P003", ref: "P2P-2026-003", senderName: "Faith Njeri", receiverName: "Samuel Kipchoge", amount: 5000, reason: "Sent to wrong person", description: "Transferred funds to wrong recipient by mistake.", status: "investigating", openedAt: "2026-04-14T17:00:00Z", updatedAt: "2026-04-15T09:00:00Z", priority: "medium" },
  { id: "DSP002", transferId: "P2P005", ref: "P2P-2026-005", senderName: "David Ochieng", receiverName: "Alex Maina", amount: 2500000, reason: "Unauthorized transfer", description: "Sender claims they did not authorize this transfer.", status: "open", openedAt: "2026-04-14T13:00:00Z", updatedAt: "2026-04-14T13:00:00Z", priority: "high" },
];

// ── Compliance ────────────────────────────────────────────────────

export const MOCK_AML_ALERTS: AMLAlert[] = [
  { id: "AML001", userId: "USR003", userName: "Peter Kamau", type: "large_transaction", severity: "high", status: "investigating", description: "Wire transfer of KES 2.5M to unverified account", amount: 2500000, triggeredAt: "2026-04-16T06:00:00Z", assignedTo: "Jane Compliance", relatedTransactions: ["TX002"] },
  { id: "AML002", userId: "USR005", userName: "David Ochieng", type: "unusual_pattern", severity: "critical", status: "open", description: "12 rapid transactions within 30 minutes totalling KES 800K", amount: 800000, triggeredAt: "2026-04-15T22:00:00Z", relatedTransactions: ["TX004", "TX005"] },
  { id: "AML003", userId: "USR013", userName: "Alex Maina", type: "circular_transfer", severity: "high", status: "open", description: "Detected circular transfer pattern A→B→C→A totalling KES 5M", amount: 5000000, triggeredAt: "2026-04-15T18:00:00Z", relatedTransactions: ["P2P005"] },
  { id: "AML004", userId: "USR014", userName: "Sarah Onyango", type: "dormant_reactivation", severity: "medium", status: "resolved", description: "Dormant account reactivated after 18 months, immediate large deposit", amount: 1200000, triggeredAt: "2026-04-14T10:00:00Z", assignedTo: "Jane Compliance", relatedTransactions: [], notes: "Customer provided satisfactory explanation — salary bonus." },
  { id: "AML005", userId: "USR003", userName: "Peter Kamau", type: "velocity_breach", severity: "medium", status: "open", description: "P2P transfer velocity exceeds 5x daily average", amount: 750000, triggeredAt: "2026-04-16T07:30:00Z", relatedTransactions: ["P2P002"] },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "AUD001", adminId: "ADM001", adminName: "Nick Juma", adminRole: "super_admin", action: "KYC_APPROVED", target: "User", targetId: "USR001", details: "Approved KYC for James Mwangi", ipAddress: "192.168.1.100", timestamp: "2026-04-16T08:30:00Z", severity: "info", outcome: "success" },
  { id: "AUD002", adminId: "ADM002", adminName: "Jane Compliance", adminRole: "compliance", action: "AML_ALERT_ESCALATED", target: "AMLAlert", targetId: "AML002", details: "Escalated AML alert for David Ochieng to MLRO", ipAddress: "192.168.1.101", timestamp: "2026-04-16T07:45:00Z", severity: "critical", outcome: "success" },
  { id: "AUD003", adminId: "ADM003", adminName: "Tom Support", adminRole: "customer_support", action: "ACCOUNT_SUSPENDED", target: "User", targetId: "USR005", details: "Suspended account pending compliance review", ipAddress: "192.168.1.102", timestamp: "2026-04-15T16:00:00Z", severity: "warning", outcome: "success" },
  { id: "AUD004", adminId: "ADM001", adminName: "Nick Juma", adminRole: "super_admin", action: "FEATURE_FLAG_TOGGLED", target: "System", details: "Disabled Crypto Integration feature flag", ipAddress: "192.168.1.100", timestamp: "2026-04-15T14:00:00Z", severity: "warning", outcome: "success" },
  { id: "AUD005", adminId: "ADM004", adminName: "Mike Ops", adminRole: "operations", action: "MANUAL_CREDIT", target: "Wallet", targetId: "USR003", details: "Manual credit KES 5,000 — failed order refund", ipAddress: "192.168.1.103", timestamp: "2026-04-14T15:00:00Z", severity: "warning", outcome: "success" },
  { id: "AUD006", adminId: "ADM002", adminName: "Jane Compliance", adminRole: "compliance", action: "LOGIN_ATTEMPT", target: "System", details: "Admin login from new IP — flagged but verified", ipAddress: "197.232.12.88", timestamp: "2026-04-14T09:00:00Z", severity: "warning", outcome: "success" },
];

export const MOCK_STR_REPORTS: STRReport[] = [
  { id: "STR001", userId: "USR005", userName: "David Ochieng", relatedAlerts: ["AML002"], totalAmount: 800000, dateRange: "2026-04-15", reason: "Rapid velocity transactions with unusual pattern", narrative: "Account holder conducted 12 rapid transactions within 30 minutes totalling KES 800,000 with no apparent business justification. Prior account history shows average of 2–3 transactions per week.", status: "submitted", createdBy: "Jane Compliance", createdAt: "2026-04-15T23:00:00Z", submittedAt: "2026-04-16T08:00:00Z", regulatoryRef: "FRC-STR-2026-0042" },
  { id: "STR002", userId: "USR013", userName: "Alex Maina", relatedAlerts: ["AML003"], totalAmount: 5000000, dateRange: "2026-04-13 to 2026-04-15", reason: "Circular transfer pattern", narrative: "Detected circular transfer pattern involving three accounts totalling KES 5M over two days. Pattern consistent with layering stage of money laundering.", status: "pending_approval", createdBy: "Jane Compliance", createdAt: "2026-04-16T07:00:00Z" },
];

// ── Support ───────────────────────────────────────────────────────

export const MOCK_TICKETS: SupportTicket[] = [
  { id: "TKT001", ref: "SUP-2026-001", userId: "USR002", userName: "Faith Njeri", userEmail: "faith.njeri@email.com", category: "withdrawal", priority: "urgent", status: "open", subject: "Withdrawal pending for 3 days", messages: [{ id: "M1", sender: "user", senderName: "Faith Njeri", content: "My withdrawal of KES 50,000 has been pending for 3 days. Please help.", timestamp: "2026-04-14T10:00:00Z", isInternal: false }, { id: "M2", sender: "agent", senderName: "Tom Support", content: "Hi Faith, I can see your withdrawal. Let me escalate this to operations.", timestamp: "2026-04-14T10:30:00Z", isInternal: false }], assignedTo: "Tom Support", createdAt: "2026-04-14T10:00:00Z", updatedAt: "2026-04-14T10:30:00Z", slaDeadline: "2026-04-14T14:00:00Z", tags: ["withdrawal", "delayed"] },
  { id: "TKT002", ref: "SUP-2026-002", userId: "USR004", userName: "Amina Hassan", userEmail: "a.hassan@email.com", category: "kyc", priority: "high", status: "in_progress", subject: "KYC document rejected - need help", messages: [{ id: "M1", sender: "user", senderName: "Amina Hassan", content: "My national ID was rejected. What documents do I need?", timestamp: "2026-04-15T09:00:00Z", isInternal: false }], createdAt: "2026-04-15T09:00:00Z", updatedAt: "2026-04-15T09:00:00Z", slaDeadline: "2026-04-15T17:00:00Z", tags: ["kyc", "documents"] },
  { id: "TKT003", ref: "SUP-2026-003", userId: "USR001", userName: "James Mwangi", userEmail: "j.mwangi@email.com", category: "trading", priority: "medium", status: "resolved", subject: "Order filled at wrong price", messages: [], createdAt: "2026-04-13T14:00:00Z", updatedAt: "2026-04-13T16:00:00Z", slaDeadline: "2026-04-14T14:00:00Z", resolvedAt: "2026-04-13T16:00:00Z", satisfactionScore: 4, tags: ["trading", "price"] },
];

export const MOCK_LIVE_CHATS: LiveChatSession[] = [
  { id: "CHT001", userId: "USR006", userName: "Grace Wanjiku", agentName: "Tom Support", status: "active", startedAt: "2026-04-16T09:00:00Z", queue: 0, topic: "P2P transfer issue", messages: [{ id: "M1", sender: "user", senderName: "Grace Wanjiku", content: "Hi, I sent KES 8000 but the recipient says they haven't received it.", timestamp: "2026-04-16T09:00:00Z", isInternal: false }, { id: "M2", sender: "agent", senderName: "Tom Support", content: "Hi Grace! Let me check that for you right away.", timestamp: "2026-04-16T09:01:00Z", isInternal: false }] },
  { id: "CHT002", userId: "USR015", userName: "Eric Mutiso", status: "waiting", startedAt: "2026-04-16T09:10:00Z", queue: 2, topic: "Account login issue", messages: [] },
  { id: "CHT003", userId: "USR016", userName: "Pauline Auma", status: "waiting", startedAt: "2026-04-16T09:12:00Z", queue: 3, topic: "Deposit not reflected", messages: [] },
];

// ── Content ───────────────────────────────────────────────────────

export const MOCK_LESSONS: Lesson[] = [
  { id: "LES001", title: "Introduction to NSE", description: "Learn the basics of the Nairobi Securities Exchange.", type: "video", status: "published", difficulty: "beginner", category: "Market Fundamentals", duration: 15, completions: 12480, avgRating: 4.7, quizPassRate: 91, prerequisites: [], publishedAt: "2024-06-01", updatedAt: "2025-01-15" },
  { id: "LES002", title: "How to Read a Stock Chart", description: "Technical analysis basics for NSE stocks.", type: "interactive", status: "published", difficulty: "intermediate", category: "Technical Analysis", duration: 25, completions: 8240, avgRating: 4.5, quizPassRate: 78, prerequisites: ["LES001"], publishedAt: "2024-07-10", updatedAt: "2025-02-01" },
  { id: "LES003", title: "Understanding P/E Ratios", description: "Fundamental analysis — valuation metrics explained.", type: "article", status: "published", difficulty: "intermediate", category: "Fundamental Analysis", duration: 10, completions: 6120, avgRating: 4.3, prerequisites: ["LES001"], publishedAt: "2024-08-15", updatedAt: "2025-01-20" },
  { id: "LES004", title: "Derivatives 101", description: "Introduction to futures and options on the NSE.", type: "quiz", status: "draft", difficulty: "advanced", category: "Derivatives", duration: 30, completions: 0, avgRating: 0, quizPassRate: 0, prerequisites: ["LES001", "LES002", "LES003"], updatedAt: "2026-04-10" },
  { id: "LES005", title: "Building a Diversified Portfolio", description: "Asset allocation strategies for Kenyan investors.", type: "video", status: "published", difficulty: "beginner", category: "Portfolio Management", duration: 20, completions: 9800, avgRating: 4.8, quizPassRate: 88, prerequisites: ["LES001"], publishedAt: "2024-09-01", updatedAt: "2025-03-01" },
];

export const MOCK_BADGES: BadgeType[] = [
  { id: "BDG001", name: "First Trade", description: "Execute your first trade on olkasis", icon: "🎯", criteria: "Complete 1 trade", earnedCount: 28420, color: "bg-blue-500", createdAt: "2024-01-01" },
  { id: "BDG002", name: "Market Scholar", description: "Complete 5 learning lessons", icon: "📚", criteria: "Complete 5 lessons", earnedCount: 15840, color: "bg-emerald-500", createdAt: "2024-01-01" },
  { id: "BDG003", name: "Power Saver", description: "Maintain KES 100K+ in wallet for 30 days", icon: "💰", criteria: "100K+ wallet balance for 30 days", earnedCount: 4280, color: "bg-amber-500", createdAt: "2024-03-01" },
  { id: "BDG004", name: "Referral Champion", description: "Refer 5 friends who complete KYC", icon: "🏆", criteria: "5 successful referrals", earnedCount: 840, color: "bg-purple-500", createdAt: "2024-04-01" },
];

export const MOCK_NEWS: NewsArticle[] = [
  { id: "NEWS001", title: "NSE Market Update: SCOM Gains on Strong Earnings", summary: "Safaricom shares rise 1.35% following Q4 earnings beat.", category: "Market Update", status: "published", publishedAt: "2026-04-16T08:00:00Z", views: 4280, isPushNotification: true, author: "olkasis Research" },
  { id: "NEWS002", title: "CBK Holds Interest Rates at 10.75%", summary: "Central Bank of Kenya maintains rates amid inflation concerns.", category: "Macro", status: "published", publishedAt: "2026-04-15T14:00:00Z", views: 8420, isPushNotification: true, author: "olkasis Research" },
  { id: "NEWS003", title: "New ETF Listed on NSE — What You Need to Know", summary: "Details on the latest ETF offering and how to invest.", category: "Products", status: "draft", views: 0, isPushNotification: false, author: "olkasis Research" },
];

// ── Rafiki ────────────────────────────────────────────────────────

export const MOCK_RAFIKI_CONVERSATIONS: RafikiConversation[] = [
  { id: "RAF001", userId: "USR001", userName: "James Mwangi", query: "How do I buy Safaricom shares?", response: "You can buy SCOM shares by going to Trade → Search SCOM → Select Buy, enter your quantity and price.", sentiment: "positive", isFlagged: false, timestamp: "2026-04-16T09:14:00Z", escalated: false, satisfactionScore: 5, topic: "Trading Help" },
  { id: "RAF002", userId: "USR004", userName: "Amina Hassan", query: "What is the minimum investment amount?", response: "The minimum investment is KES 100. You can start with any amount above this.", sentiment: "neutral", isFlagged: false, timestamp: "2026-04-16T09:02:00Z", escalated: false, satisfactionScore: 4, topic: "Account Info" },
  { id: "RAF003", userId: "USR007", userName: "Samuel Kipchoge", query: "Can I get guaranteed returns?", response: "I'm not able to guarantee returns on investments. All investing involves risk...", sentiment: "negative", isFlagged: true, flagReason: "User seeking guaranteed returns — potential mis-selling risk", timestamp: "2026-04-16T08:45:00Z", escalated: false, topic: "Returns", actionStatus: "pending" },
  { id: "RAF004", userId: "USR006", userName: "Grace Wanjiku", query: "How to withdraw my dividends?", response: "Dividends are automatically credited to your Account Wallet. You can withdraw from Wallets → Withdraw.", sentiment: "positive", isFlagged: false, timestamp: "2026-04-16T08:30:00Z", escalated: false, satisfactionScore: 5, topic: "Withdrawals" },
  { id: "RAF005", userId: "USR005", userName: "David Ochieng", query: "Is this a pyramid scheme?", response: "olkasis is a fully licensed stockbroker regulated by the Capital Markets Authority (CMA) of Kenya...", sentiment: "negative", isFlagged: true, flagReason: "Potential reputation risk — user questioning legitimacy", timestamp: "2026-04-16T08:12:00Z", escalated: true, topic: "Compliance Risk", actionStatus: "pending" },
  { id: "RAF006", userId: "USR002", userName: "Faith Njeri", query: "What stocks should I buy?", response: "I can't provide specific investment advice, but I can show you the tools to research stocks on olkasis...", sentiment: "neutral", isFlagged: false, timestamp: "2026-04-15T16:00:00Z", escalated: false, satisfactionScore: 3, topic: "Investment Advice" },
];

// ── Risk ──────────────────────────────────────────────────────────

export const MOCK_RISK_INCIDENTS: RiskIncident[] = [
  { id: "RI001", type: "Unusual Trading Pattern", severity: "medium", status: "investigating", description: "Coordinated buy orders in SCOM across 8 accounts within 2-minute window", affectedUsers: 8, detectedAt: "2026-04-16T10:22:00Z", assignedTo: "Jane Compliance" },
  { id: "RI002", type: "Large Withdrawal Spike", severity: "high", status: "open", description: "Withdrawal requests 340% above daily average — potential bank run signal", affectedUsers: 147, potentialLoss: 12000000, detectedAt: "2026-04-16T08:15:00Z" },
  { id: "RI003", type: "Account Takeover Attempt", severity: "critical", status: "resolved", description: "Credential stuffing attack detected — 24 accounts targeted, all blocked", affectedUsers: 24, detectedAt: "2026-04-15T22:40:00Z", resolvedAt: "2026-04-15T23:10:00Z" },
  { id: "RI004", type: "Settlement Reconciliation Break", severity: "medium", status: "resolved", description: "T+3 settlement mismatch of KES 48K between broker and platform records", potentialLoss: 48000, detectedAt: "2026-04-15T09:00:00Z", resolvedAt: "2026-04-15T14:30:00Z" },
];

export const MOCK_MARGIN_CALLS: MarginCall[] = [
  { id: "MC001", userId: "USR011", userName: "Josephine Wambua", position: "SCOM-FUT-SEP26 Long 50k", marginShortfall: 38000, marginCallTime: "2026-04-16T07:00:00Z", deadline: "2026-04-16T13:00:00Z", status: "issued", currentMargin: 12000, requiredMargin: 50000 },
  { id: "MC002", userId: "USR017", userName: "Eric Owino", position: "EQTY-OPT-JUN26 Short 2k", marginShortfall: 15000, marginCallTime: "2026-04-15T14:00:00Z", deadline: "2026-04-15T20:00:00Z", status: "liquidated", currentMargin: 0, requiredMargin: 15000 },
];

export const MOCK_CONCENTRATION_RISK: ConcentrationRisk[] = [
  { ticker: "SCOM", companyName: "Safaricom PLC", platformHolding: 2140000000, platformPct: 28.4, userCount: 31200, riskLevel: "medium" },
  { ticker: "EQTY", companyName: "Equity Group Holdings", platformHolding: 1370000000, platformPct: 18.2, userCount: 24800, riskLevel: "low" },
  { ticker: "KCB", companyName: "KCB Group PLC", platformHolding: 1108000000, platformPct: 14.7, userCount: 19200, riskLevel: "low" },
  { ticker: "EABL", companyName: "East African Breweries", platformHolding: 851000000, platformPct: 11.3, userCount: 8400, riskLevel: "low" },
  { ticker: "COOP", companyName: "Co-operative Bank", platformHolding: 678000000, platformPct: 9.0, userCount: 14200, riskLevel: "low" },
];

// ── Marketing ─────────────────────────────────────────────────────

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: "CMP001", name: "Refer a Friend", type: "referral", reward: "KES 500 per referral", rewardAmount: 500, uses: 2568, budget: 2000000, spent: 1284000, status: "active", startDate: "2026-01-01", conversionRate: 18.4, roi: 2.8 },
  { id: "CMP002", name: "New User Bonus", type: "onboarding", reward: "KES 200 credit", rewardAmount: 200, uses: 4820, budget: 1500000, spent: 964000, status: "active", startDate: "2026-01-01", conversionRate: 100, roi: 4.2 },
  { id: "CMP003", name: "Q2 Trading Boost", type: "trading", reward: "Zero commission", rewardAmount: 0, uses: 1204, budget: 500000, spent: 280000, status: "paused", startDate: "2026-04-01", endDate: "2026-06-30", conversionRate: 42.1, roi: 1.9 },
  { id: "CMP004", name: "First Deposit Match", type: "deposit", reward: "10% match up to KES 1,000", rewardAmount: 1000, uses: 380, budget: 800000, spent: 120000, status: "draft", startDate: "2026-05-01", conversionRate: 0, roi: 0 },
];

export const MOCK_REFERRALS: ReferralEntry[] = [
  { id: "REF001", referrerName: "Peter Kamau", referrerId: "USR003", referralsCount: 42, successfulReferrals: 38, totalBonus: 19000, pendingBonus: 2000, lastReferral: "2026-04-15" },
  { id: "REF002", referrerName: "James Mwangi", referrerId: "USR001", referralsCount: 28, successfulReferrals: 24, totalBonus: 12000, pendingBonus: 0, lastReferral: "2026-04-10" },
  { id: "REF003", referrerName: "Grace Wanjiku", referrerId: "USR006", referralsCount: 15, successfulReferrals: 13, totalBonus: 6500, pendingBonus: 1000, lastReferral: "2026-04-12" },
  { id: "REF004", referrerName: "Faith Njeri", referrerId: "USR002", referralsCount: 8, successfulReferrals: 7, totalBonus: 3500, pendingBonus: 500, lastReferral: "2026-04-08" },
];

export const MOCK_COHORT_DATA: CohortData[] = [
  { cohort: "Jan 2025", users: 3240, month1: 68, month2: 54, month3: 48, month6: 38, month12: 31 },
  { cohort: "Feb 2025", users: 2980, month1: 71, month2: 57, month3: 51, month6: 40 },
  { cohort: "Mar 2025", users: 4120, month1: 65, month2: 52, month3: 46, month6: 36 },
  { cohort: "Apr 2025", users: 3680, month1: 69, month2: 55, month3: 49, month6: 39 },
  { cohort: "May 2025", users: 4840, month1: 72, month2: 58, month3: 52, month6: 41 },
  { cohort: "Jun 2025", users: 3920, month1: 70, month2: 56, month3: 50, month6: 32 },
];

// ── System ────────────────────────────────────────────────────────

export const MOCK_FEATURE_FLAGS: FeatureFlag[] = [
  { id: "FF001", name: "P2P Transfers", description: "Allow peer-to-peer transfers between users", enabled: true, category: "payments", enabledAt: "2024-01-01", updatedBy: "Nick Juma", rolloutPct: 100 },
  { id: "FF002", name: "Fractional Shares", description: "Enable fractional share purchases", enabled: true, category: "trading", enabledAt: "2024-06-01", updatedBy: "Nick Juma", rolloutPct: 100 },
  { id: "FF003", name: "Crypto Integration", description: "Connect crypto wallet functionality", enabled: false, category: "experimental", updatedBy: "Nick Juma" },
  { id: "FF004", name: "Rafiki AI Chat", description: "AI-powered investment assistant", enabled: true, category: "ai", enabledAt: "2025-01-01", updatedBy: "Nick Juma", rolloutPct: 100 },
  { id: "FF005", name: "Auto-Invest Plans", description: "Automated recurring investment plans", enabled: false, category: "trading", updatedBy: "Nick Juma", rolloutPct: 0 },
  { id: "FF006", name: "Social Trading", description: "Copy trading from top performers", enabled: false, category: "social", updatedBy: "Nick Juma", rolloutPct: 0 },
  { id: "FF007", name: "Derivatives Trading", description: "Futures and options for certified users", enabled: true, category: "trading", enabledAt: "2025-06-01", updatedBy: "Mike Ops", rolloutPct: 100 },
  { id: "FF008", name: "Junior Accounts", description: "Accounts for minors with guardian oversight", enabled: true, category: "trading", enabledAt: "2024-09-01", updatedBy: "Nick Juma", rolloutPct: 100 },
];

export const MOCK_GLOBAL_LIMITS: GlobalLimit[] = [
  { id: "GL001", name: "Daily P2P Limit", description: "Maximum P2P transfer per user per day", value: 500000, unit: "KES", min: 50000, max: 2000000, category: "p2p" },
  { id: "GL002", name: "Single P2P Transaction Max", description: "Maximum single P2P transfer amount", value: 100000, unit: "KES", min: 10000, max: 500000, category: "p2p" },
  { id: "GL003", name: "Daily Withdrawal Limit", description: "Maximum withdrawal per user per day", value: 2000000, unit: "KES", min: 500000, max: 10000000, category: "withdrawal" },
  { id: "GL004", name: "Minimum Deposit", description: "Minimum deposit amount", value: 100, unit: "KES", min: 50, max: 1000, category: "deposit" },
  { id: "GL005", name: "Maximum Single Order Value", description: "Max value per single trade order", value: 5000000, unit: "KES", min: 1000000, max: 20000000, category: "trading" },
];

export const MOCK_SYSTEM_METRICS: SystemMetric[] = [
  { service: "API Gateway", uptime: 99.98, p50: 48, p95: 142, p99: 280, errorRate: 0.02, status: "healthy" },
  { service: "Auth Service", uptime: 100.00, p50: 22, p95: 68, p99: 120, errorRate: 0.00, status: "healthy" },
  { service: "Trading Engine", uptime: 99.95, p50: 85, p95: 210, p99: 420, errorRate: 0.05, status: "healthy" },
  { service: "Payment Gateway", uptime: 99.80, p50: 320, p95: 890, p99: 1800, errorRate: 0.20, status: "degraded" },
  { service: "Wallet Service", uptime: 99.92, p50: 62, p95: 180, p99: 340, errorRate: 0.08, status: "healthy" },
  { service: "Notification Service", uptime: 99.70, p50: 180, p95: 520, p99: 980, errorRate: 0.30, status: "degraded" },
  { service: "Rafiki AI", uptime: 99.85, p50: 420, p95: 1200, p99: 2400, errorRate: 0.15, status: "healthy" },
];

export const MOCK_SYSTEM_ALERTS: SystemAlert[] = [
  { id: "SA001", type: "Payment Gateway Latency", severity: "warning", message: "M-Pesa callback P95 latency 89% above baseline (890ms vs 480ms)", service: "Payment Gateway", timestamp: "2026-04-16T08:00:00Z", resolved: false },
  { id: "SA002", type: "High Error Rate", severity: "critical", message: "Notification service error rate spiked to 0.30% — SMS delivery failures", service: "Notification Service", timestamp: "2026-04-16T07:30:00Z", resolved: false },
  { id: "SA003", type: "DB Connection Pool", severity: "warning", message: "PostgreSQL connection pool at 78% capacity during market open", service: "Trading Engine", timestamp: "2026-04-16T07:00:00Z", resolved: true },
];

// ── Admin Users ───────────────────────────────────────────────────

export const MOCK_ADMIN_USERS: AdminUser[] = [
  { id: "ADM001", name: "Nick Juma", email: "nick.j@olkasis.com", role: "super_admin", lastLogin: "2026-04-16T08:00:00Z", ipAddress: "192.168.1.100", is2FAEnabled: true, status: "active", createdAt: "2023-01-01", permissions: ["*"] },
  { id: "ADM002", name: "Collins Murichu", email: "collins.m@olkasis.com", role: "compliance", lastLogin: "2026-04-16T07:45:00Z", ipAddress: "192.168.1.101", is2FAEnabled: true, status: "active", createdAt: "2023-03-01", permissions: [] },
  { id: "ADM003", name: "Brian Githinji", email: "brian.g@olkasis.com", role: "customer_support", lastLogin: "2026-04-16T09:00:00Z", ipAddress: "192.168.1.102", is2FAEnabled: true, status: "active", createdAt: "2023-06-01", permissions: [] },
  { id: "ADM004", name: "Kevin Mwangi", email: "kevin.m@olkasis.com", role: "operations", lastLogin: "2026-04-15T17:00:00Z", ipAddress: "192.168.1.103", is2FAEnabled: true, status: "active", createdAt: "2024-01-15", permissions: [] },
  { id: "ADM005", name: "Lisa Agotsa", email: "lisa.a@olkasis.com", role: "marketing", lastLogin: "2026-04-15T14:00:00Z", ipAddress: "192.168.1.104", is2FAEnabled: false, status: "active", createdAt: "2024-06-01", permissions: [] },
  { id: "ADM006", name: "Ken Calipso", email: "ken.c@olkasis.com", role: "data_analyst", lastLogin: "2026-04-14T16:00:00Z", ipAddress: "192.168.1.105", is2FAEnabled: true, status: "inactive", createdAt: "2025-01-01", permissions: [] },
];
