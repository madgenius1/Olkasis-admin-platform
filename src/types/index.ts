// ═══════════════════════════════════════════════════════════════
// Olkasis ADMIN — Global Type Definitions
// ═══════════════════════════════════════════════════════════════

export type AdminRole =
  | "super_admin"
  | "compliance"
  | "customer_support"
  | "operations"
  | "marketing"
  | "data_analyst";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  lastLogin: string;
  ipAddress: string;
  is2FAEnabled: boolean;
  status: "active" | "suspended" | "inactive";
  createdAt: string;
  permissions: string[];
}

// ── Users ─────────────────────────────────────────────────────

export type KYCStatus = "verified" | "pending" | "rejected" | "not_started";
export type AccountType = "individual" | "joint" | "junior";
export type AccountStatus = "active" | "suspended" | "inactive" | "pending";
export type RiskProfile = "conservative" | "moderate" | "aggressive";
export type Gender = "male" | "female" | "other";

export interface UserAddress {
  street: string;
  city: string;
  county: string;
  country: string;
  postalCode: string;
}

export interface UserWallet {
  checkIn: number;
  account: number;
  pending: number;
  held: number;
}

export interface PortfolioHolding {
  ticker: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPct: number;
  allocation: number;
}

export interface UserPortfolio {
  totalValue: number;
  totalCost: number;
  pnl: number;
  pnlPct: number;
  holdings: PortfolioHolding[];
}

export interface LoginRecord {
  timestamp: string;
  device: string;
  location: string;
  ip: string;
  success: boolean;
}

export interface User {
  id: string;
  OlkasisId: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: Gender;
  nationality: string;
  address: UserAddress;
  accountType: AccountType;
  accountStatus: AccountStatus;
  kycStatus: KYCStatus;
  riskProfile: RiskProfile;
  registeredAt: string;
  lastActive: string;
  wallet: UserWallet;
  portfolio: UserPortfolio;
  cdscNumber?: string;
  referredBy?: string;
  totalTrades: number;
  totalDeposits: number;
  totalWithdrawals: number;
  complianceFlags: number;
  openTickets: number;
  deviceOS?: string;
  location?: string;
  isDerivativesEnabled: boolean;
  loginHistory: LoginRecord[];
}

export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  referralCode?: string;
  position: number;
  status: "waiting" | "invited" | "registered";
  source: "organic" | "referral" | "social" | "ad";
}

// ── KYC ──────────────────────────────────────────────────────

export type KYCPriority = "urgent" | "high" | "normal";
export type KYCDocumentType = "national_id" | "passport" | "driving_license";
export type VerificationProvider = "smile_id" | "onfido" | "manual";

export interface KYCDocument {
  type: KYCDocumentType;
  url: string;
  uploadedAt: string;
  ocrData?: Record<string, string>;
}

export interface KYCRiskFlag {
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export interface CoHolder {
  name: string;
  email: string;
  phone: string;
  kycStatus: KYCStatus;
  relationship: string;
}

export interface KYCEntry {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  accountType: AccountType;
  submittedAt: string;
  waitTime: string;
  priority: KYCPriority;
  documents: KYCDocument[];
  selfieUrl?: string;
  livenessScore?: number;
  verificationProvider: VerificationProvider;
  providerStatus: "passed" | "failed" | "pending" | "manual_review";
  riskScore: number;
  riskFlags: KYCRiskFlag[];
  status: KYCStatus;
  rejectionReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  coHolders?: CoHolder[];
}

// ── Trading ───────────────────────────────────────────────────

export type OrderSide = "buy" | "sell";
export type OrderType = "market" | "limit" | "stop" | "stop_limit";
export type OrderStatus = "pending" | "executed" | "cancelled" | "partial" | "failed" | "expired";
export type AssetClass = "equity" | "etf" | "bond" | "derivative";
export type SettlementStatus = "pending" | "settled" | "failed";

export interface Order {
  id: string;
  userId: string;
  userName: string;
  ticker: string;
  companyName: string;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  price: number;
  executedPrice?: number;
  totalValue: number;
  status: OrderStatus;
  placedAt: string;
  executedAt?: string;
  settlementStatus?: SettlementStatus;
  settlementDate?: string;
  brokerRef?: string;
  fees: number;
  assetClass: AssetClass;
}

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  lastPrice: number;
  change: number;
  changePct: number;
  volume: number;
  marketCap: number;
  pe?: number;
  yearHigh: number;
  yearLow: number;
  assetClass: AssetClass;
  tradingStatus: "active" | "halted" | "suspended";
}

export interface DerivativesPosition {
  id: string;
  userId: string;
  userName: string;
  ticker: string;
  type: "futures" | "options";
  direction: "long" | "short";
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPct: number;
  marginUsed: number;
  marginAvailable: number;
  marginUtilization: number;
  liquidationPrice: number;
  expiry: string;
  status: "open" | "at_risk" | "margin_call" | "closed";
}

export interface DerivativesCertification {
  id: string;
  userId: string;
  userName: string;
  submittedAt: string;
  score: number;
  passMark: number;
  status: "pending_review" | "approved" | "rejected";
  reviewedBy?: string;
  quizAnswers: Array<{ question: string; answer: string; correct: boolean }>;
}

// ── Wallets ───────────────────────────────────────────────────

export type TransactionType =
  | "deposit" | "withdrawal" | "p2p_send" | "p2p_receive"
  | "trade_buy" | "trade_sell" | "fee" | "refund" | "credit" | "dividend";
export type PaymentMethod = "mpesa" | "card" | "bank_transfer" | "internal";
export type TransactionStatus = "completed" | "pending" | "failed" | "reversed" | "processing";

export interface WalletTransaction {
  id: string;
  ref: string;
  userId: string;
  user: string;
  type: TransactionType;
  category: string;
  amount: number;
  fee: number;
  netAmount: number;
  method: PaymentMethod;
  status: TransactionStatus;
  description: string;
  walletBefore: number;
  walletAfter: number;
  timestamp: string;
  mpesaRef?: string;
  reversalReason?: string;
  processedBy?: string;
}

// ── P2P ──────────────────────────────────────────────────────

export type P2PStatus = "completed" | "pending" | "failed" | "reversed" | "disputed";
export type P2PDisputeStatus =
  | "open" | "investigating" | "resolved_refund" | "resolved_no_action" | "escalated";

export interface P2PTransfer {
  id: string;
  ref: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  amount: number;
  fee: number;
  type: "p2p" | "gift" | "business";
  method: "Olkasis_id" | "phone" | "qr";
  status: P2PStatus;
  note?: string;
  timestamp: string;
  hasDispute: boolean;
  disputeId?: string;
}

export interface P2PDispute {
  id: string;
  transferId: string;
  ref: string;
  senderName: string;
  receiverName: string;
  amount: number;
  reason: string;
  description: string;
  status: P2PDisputeStatus;
  openedAt: string;
  updatedAt: string;
  evidence?: string[];
  resolvedBy?: string;
  resolution?: string;
  priority: "low" | "medium" | "high";
}

// ── Compliance ────────────────────────────────────────────────

export type AMLAlertType =
  | "large_transaction" | "unusual_pattern" | "rapid_movement"
  | "circular_transfer" | "dormant_reactivation" | "velocity_breach" | "high_risk_jurisdiction";
export type AMLAlertStatus = "open" | "investigating" | "resolved" | "escalated" | "false_positive";
export type STRStatus = "draft" | "pending_approval" | "submitted" | "acknowledged";

export interface AMLAlert {
  id: string;
  userId: string;
  userName: string;
  type: AMLAlertType;
  severity: "low" | "medium" | "high" | "critical";
  status: AMLAlertStatus;
  description: string;
  amount?: number;
  triggeredAt: string;
  assignedTo?: string;
  notes?: string;
  relatedTransactions: string[];
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  adminRole: AdminRole;
  action: string;
  target: string;
  targetId?: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  severity: "info" | "warning" | "critical";
  outcome: "success" | "failure";
}

export interface STRReport {
  id: string;
  userId: string;
  userName: string;
  relatedAlerts: string[];
  totalAmount: number;
  dateRange: string;
  reason: string;
  narrative: string;
  status: STRStatus;
  createdBy: string;
  createdAt: string;
  submittedAt?: string;
  regulatoryRef?: string;
}

// ── Support ───────────────────────────────────────────────────

export type TicketStatus = "open" | "in_progress" | "pending_user" | "resolved" | "closed";
export type TicketPriority = "urgent" | "high" | "medium" | "low";
export type TicketCategory =
  | "kyc" | "withdrawal" | "deposit" | "trading" | "p2p" | "account" | "technical" | "other";

export interface TicketMessage {
  id: string;
  sender: "user" | "agent" | "system";
  senderName: string;
  content: string;
  timestamp: string;
  isInternal: boolean;
}

export interface SupportTicket {
  id: string;
  ref: string;
  userId: string;
  userName: string;
  userEmail: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  messages: TicketMessage[];
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  slaDeadline: string;
  resolvedAt?: string;
  satisfactionScore?: number;
  tags: string[];
}

export interface LiveChatSession {
  id: string;
  userId: string;
  userName: string;
  agentName?: string;
  status: "waiting" | "active" | "resolved";
  startedAt: string;
  queue: number;
  topic?: string;
  messages: TicketMessage[];
}

// ── Content ───────────────────────────────────────────────────

export type LessonType = "video" | "article" | "quiz" | "interactive";
export type LessonStatus = "published" | "draft" | "archived";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: LessonType;
  status: LessonStatus;
  difficulty: DifficultyLevel;
  category: string;
  duration: number;
  thumbnail?: string;
  completions: number;
  avgRating: number;
  quizPassRate?: number;
  prerequisites: string[];
  publishedAt?: string;
  updatedAt: string;
  badgeId?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earnedCount: number;
  color: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  status: "published" | "scheduled" | "draft";
  publishedAt?: string;
  scheduledAt?: string;
  views: number;
  isPushNotification: boolean;
  author: string;
}

// ── Rafiki AI ─────────────────────────────────────────────────

export type RafikiSentiment = "positive" | "neutral" | "negative";
export type RafikiActionStatus = "pending" | "approved" | "rejected" | "modified";

export interface RafikiConversation {
  id: string;
  userId: string;
  userName: string;
  query: string;
  response: string;
  sentiment: RafikiSentiment;
  isFlagged: boolean;
  flagReason?: string;
  timestamp: string;
  escalated: boolean;
  satisfactionScore?: number;
  topic: string;
  actionStatus?: RafikiActionStatus;
}

// ── Reports ───────────────────────────────────────────────────

export interface RevenueDataPoint {
  month: string;
  trading: number;
  p2p: number;
  withdrawal: number;
  total: number;
}

export interface AUMSnapshot {
  date: string;
  equities: number;
  etfs: number;
  bonds: number;
  cash: number;
  total: number;
}

export interface UserGrowthPoint {
  date: string;
  users: number;
  newUsers: number;
  churned: number;
}

export interface VolumeDataPoint {
  day: string;
  volume: number;
  trades: number;
  buyVolume: number;
  sellVolume: number;
}

// ── Marketing ─────────────────────────────────────────────────

export interface Campaign {
  id: string;
  name: string;
  type: "referral" | "onboarding" | "trading" | "deposit" | "retention";
  reward: string;
  rewardAmount: number;
  uses: number;
  budget: number;
  spent: number;
  status: "active" | "paused" | "ended" | "draft";
  startDate: string;
  endDate?: string;
  conversionRate: number;
  roi: number;
}

export interface ReferralEntry {
  id: string;
  referrerName: string;
  referrerId: string;
  referralsCount: number;
  successfulReferrals: number;
  totalBonus: number;
  pendingBonus: number;
  lastReferral: string;
}

export interface CohortData {
  cohort: string;
  users: number;
  month1: number;
  month2: number;
  month3: number;
  month6: number;
  month12?: number;
}

// ── Risk ──────────────────────────────────────────────────────

export type RiskLevel = "low" | "medium" | "high" | "critical";
export type RiskIncidentStatus = "open" | "investigating" | "resolved" | "escalated";

export interface RiskIncident {
  id: string;
  type: string;
  severity: RiskLevel;
  status: RiskIncidentStatus;
  description: string;
  affectedUsers?: number;
  potentialLoss?: number;
  detectedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
}

export interface MarginCall {
  id: string;
  userId: string;
  userName: string;
  position: string;
  marginShortfall: number;
  marginCallTime: string;
  deadline: string;
  status: "issued" | "met" | "liquidated" | "pending_liquidation";
  currentMargin: number;
  requiredMargin: number;
}

export interface ConcentrationRisk {
  ticker: string;
  companyName: string;
  platformHolding: number;
  platformPct: number;
  userCount: number;
  riskLevel: RiskLevel;
}

// ── System ────────────────────────────────────────────────────

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: "trading" | "payments" | "ai" | "social" | "experimental";
  enabledAt?: string;
  disabledAt?: string;
  updatedBy?: string;
  rolloutPct?: number;
}

export interface GlobalLimit {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  category: "p2p" | "withdrawal" | "deposit" | "trading";
}

export interface SystemMetric {
  service: string;
  uptime: number;
  p50: number;
  p95: number;
  p99: number;
  errorRate: number;
  status: "healthy" | "degraded" | "down";
}

export interface SystemAlert {
  id: string;
  type: string;
  severity: "info" | "warning" | "critical";
  message: string;
  service: string;
  timestamp: string;
  resolved: boolean;
}

// ── Helper maps ───────────────────────────────────────────────

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  compliance: "Compliance",
  customer_support: "Customer Support",
  operations: "Operations",
  marketing: "Marketing",
  data_analyst: "Data Analyst",
};

export const KYC_BADGE: Record<KYCStatus, string> = {
  verified: "badge-success",
  pending: "badge-warning",
  rejected: "badge-danger",
  not_started: "badge-neutral",
};

export const STATUS_BADGE: Record<AccountStatus, string> = {
  active: "badge-success",
  suspended: "badge-danger",
  inactive: "badge-neutral",
  pending: "badge-warning",
};

export const TX_STATUS_BADGE: Record<TransactionStatus, string> = {
  completed: "badge-success",
  pending: "badge-warning",
  failed: "badge-danger",
  reversed: "badge-neutral",
  processing: "badge-info",
};

export const PRIORITY_BADGE: Record<TicketPriority, string> = {
  urgent: "badge-danger",
  high: "badge-warning",
  medium: "badge-info",
  low: "badge-neutral",
};

export const RISK_BADGE: Record<RiskLevel, string> = {
  low: "badge-success",
  medium: "badge-warning",
  high: "badge-danger",
  critical: "badge-danger",
};
