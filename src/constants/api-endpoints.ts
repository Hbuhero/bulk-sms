import { DataBaseUrl } from "./base-url";

// ============================================
// AUTHENTICATION ENDPOINTS
// ============================================
export const POST_LOGIN_USER = `${DataBaseUrl}/auth/login`;
export const POST_REGISTER_USER = `${DataBaseUrl}/auth/register`;
export const POST_FORGOT_PASSWORD = `${DataBaseUrl}/auth/forgot-password`;
export const POST_RESET_PASSWORD = `${DataBaseUrl}/auth/reset-password`;
export const REFRESH_TOKEN = `${DataBaseUrl}/auth/refresh`;
export const POST_LOGOUT = `${DataBaseUrl}/auth/logout`;

// ============================================
// USER MANAGEMENT ENDPOINTS
// ============================================
export const GET_USERS = `${DataBaseUrl}/users`;
export const GET_USER_BY_ID = `${DataBaseUrl}/users`;
export const CREATE_USER = `${DataBaseUrl}/users`;
export const UPDATE_USER = `${DataBaseUrl}/users`;
export const DELETE_USER = `${DataBaseUrl}/users`;

// ============================================
// SMS ENDPOINTS
// ============================================
export const SEND_SMS = `${DataBaseUrl}/api/v1/sms/send`;
export const GET_SMS_BALANCE = `${DataBaseUrl}/api/v1/balance`;
export const GET_SMS_OUTBOX = `${DataBaseUrl}/api/v1/sms/outbox`;
export const GET_SMS_DELIVERY_STATUS = `${DataBaseUrl}/api/v1/delivery-status`;

// ============================================
// EMAIL ENDPOINTS
// ============================================
export const SEND_EMAIL = `${DataBaseUrl}/api/v1/email/send`;
export const GET_EMAIL_OUTBOX = `${DataBaseUrl}/api/v1/email/outbox`;
export const GET_EMAIL_DELIVERY_STATUS = `${DataBaseUrl}/api/v1/email/delivery-status`;

// ============================================
// WHATSAPP ENDPOINTS
// ============================================
export const SEND_WHATSAPP = `${DataBaseUrl}/api/v1/whatsapp/send`;
export const GET_WHATSAPP_OUTBOX = `${DataBaseUrl}/api/v1/whatsapp/outbox`;
export const GET_WHATSAPP_DELIVERY_STATUS = `${DataBaseUrl}/api/v1/whatsapp/delivery-status`;

// ============================================
// TEMPLATE MANAGEMENT ENDPOINTS
// ============================================
export const SMS_TEMPLATES = `${DataBaseUrl}/templates/sms`;
export const EMAIL_TEMPLATES = `${DataBaseUrl}/templates/email`;
export const WHATSAPP_TEMPLATES = `${DataBaseUrl}/templates/whatsapp`;

// ============================================
// SENDER ID MANAGEMENT ENDPOINTS
// ============================================
export const SENDER_IDS = `${DataBaseUrl}/sender-ids`;
export const CREATE_SENDER_ID = `${DataBaseUrl}/sender-ids`;
export const UPDATE_SENDER_ID = `${DataBaseUrl}/sender-ids`;
export const DELETE_SENDER_ID = `${DataBaseUrl}/sender-ids`;

// ============================================
// CONTACT MANAGEMENT ENDPOINTS
// ============================================
export const GET_CONTACTS = `${DataBaseUrl}/api/v1/contacts`;
export const CREATE_CONTACT = `${DataBaseUrl}/contacts`;
export const UPDATE_CONTACT = `${DataBaseUrl}/contacts`;
export const DELETE_CONTACT = `${DataBaseUrl}/contacts`;
export const IMPORT_CONTACTS = `${DataBaseUrl}/contacts/import`;
export const EXPORT_CONTACTS = `${DataBaseUrl}/contacts/export`;

// ============================================
// CONTACT LIST ENDPOINTS
// ============================================
export const CONTACT_LISTS = `${DataBaseUrl}/contact-lists`;
export const CREATE_CONTACT_LIST = `${DataBaseUrl}/contact-lists`;
export const UPDATE_CONTACT_LIST = `${DataBaseUrl}/contact-lists`;
export const DELETE_CONTACT_LIST = `${DataBaseUrl}/contact-lists`;

// ============================================
// CAMPAIGN ENDPOINTS
// ============================================
export const CAMPAIGNS = `${DataBaseUrl}/campaigns`;
export const CREATE_CAMPAIGN = `${DataBaseUrl}/campaigns`;
export const UPDATE_CAMPAIGN = `${DataBaseUrl}/campaigns`;
export const DELETE_CAMPAIGN = `${DataBaseUrl}/campaigns`;
export const SCHEDULE_CAMPAIGN = `${DataBaseUrl}/campaigns/schedule`;
export const GET_SCHEDULED_CAMPAIGNS = `${DataBaseUrl}/campaigns/scheduled`;

// ============================================
// BUNDLE/CREDIT PURCHASE ENDPOINTS
// ============================================
export const PURCHASE_BUNDLE = `${DataBaseUrl}/bundles/purchase`;
export const GET_BUNDLES = `${DataBaseUrl}/bundles`;
export const GET_PURCHASE_HISTORY = `${DataBaseUrl}/bundles/history`;

// ============================================
// REPORTS & ANALYTICS ENDPOINTS
// ============================================
export const DASHBOARD_STATS = `${DataBaseUrl}/dashboard`;
export const GET_REPORTS = `${DataBaseUrl}/reports`;
export const CAMPAIGN_ANALYTICS = `${DataBaseUrl}/reports/campaigns`;
export const DELIVERY_REPORTS = `${DataBaseUrl}/reports/delivery`;
export const OUTBOX_REPORTS = `${DataBaseUrl}/reports/outbox`;

// ============================================
// API INTEGRATION ENDPOINTS
// ============================================
export const GET_API_KEYS = `${DataBaseUrl}/api-keys`;
export const CREATE_API_KEY = `${DataBaseUrl}/api-keys`;
export const REGENERATE_API_KEY = `${DataBaseUrl}/api-keys/regenerate`;
export const DELETE_API_KEY = `${DataBaseUrl}/api-keys`;

// ============================================
// WEBHOOK ENDPOINTS
// ============================================
export const WEBHOOKS = `${DataBaseUrl}/webhooks`;
export const CREATE_WEBHOOK = `${DataBaseUrl}/webhooks`;
export const UPDATE_WEBHOOK = `${DataBaseUrl}/webhooks`;
export const DELETE_WEBHOOK = `${DataBaseUrl}/webhooks`;
export const TEST_WEBHOOK = `${DataBaseUrl}/webhooks/test`;
