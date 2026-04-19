# Workflow: Exam Failure Extension (n8n)

## Overview

When a student fails the IPAS exam, they forward the official failure email to a dedicated inbox. n8n picks it up, verifies eligibility, and automatically extends their course access — no manual intervention needed.

---

## Trigger Email Address

Set up a dedicated inbox, e.g.: `extend@levelcert.com`

Students are instructed (in dashboard + post-purchase email) to:
> "Failed your exam? Forward your official IPAS result email from your **registered email address** to extend@levelcert.com and we'll extend your access within minutes."

---

## n8n Workflow Steps

### 1. Trigger — Email Received
- **Node:** Email Trigger (IMAP) or Gmail Trigger
- Watches `extend@levelcert.com` for new emails

---

### 2. Extract Sender Email
- **Node:** Set
- Extract `from` address from email headers
- This must match the student's registered email in Supabase

---

### 3. Verify Sender is a Registered User
- **Node:** Supabase — SELECT
- Query: `SELECT id, email, extension_used FROM users WHERE email = '{{sender_email}}'`
- **If no match →** Branch to "Unknown Email" response

---

### 4. Check Extension Eligibility
- **Node:** IF
- Condition: `extension_used = false`
- **If already used →** Branch to "Extension Already Used" response (send 50% discount)
- **If eligible →** Continue

---

### 5. Verify Email Content Matches IPAS Failure Notice
- **Node:** IF (text contains check)
- Check email body/subject for keywords indicating failure:
  - Keywords (Traditional Chinese): `不合格`, `未通過`, `測驗結果`, `IPAS`
  - Also check for official sender domain (e.g. `@nkust.edu.tw` or the IPAS issuing body)
- **If no match →** Branch to "Cannot Verify" response (flag for manual review)

---

### 6. Extend Access in Supabase
- **Node:** Supabase — UPDATE
- Query:
  ```sql
  UPDATE user_course_access
  SET access_expires_at = access_expires_at + INTERVAL '3 months',
      extension_used = true,
      extension_granted_at = NOW()
  WHERE user_id = '{{user_id}}'
    AND extension_used = false
  ```

---

### 7. Send Confirmation Email to Student
- **Node:** Send Email
- Template:
  > 您好，
  > 您的 LevelCert 課程存取權限已延長 3 個月。
  > 新的到期日：{{new_expiry_date}}
  > 繼續加油，下次一定過！
  > — LevelCert 團隊

---

## Branch: Extension Already Used

- **Node:** Send Email
- Inform student their free extension has been used
- Include a **50% discount code** (generated via Stripe Coupon API or pre-generated batch)
- Template:
  > 您好，
  > 您的免費延長次數已使用過一次。
  > 我們提供您 **5折優惠碼**重新購買課程：`{{discount_code}}`
  > 有效期限：30 天
  > — LevelCert 團隊

---

## Branch: Unknown Email

- **Node:** Send Email (to sender)
  > 您好，
  > 我們無法找到與此 Email 對應的 LevelCert 帳號。
  > 請使用您**註冊時的 Email** 轉寄考試結果通知信。
  > 如需協助，請聯絡 support@levelcert.com

---

## Branch: Cannot Verify (Manual Review)

- **Node:** Send Email to `support@levelcert.com`
- Flag: sender email, forwarded email body, timestamp
- Also send auto-reply to student:
  > 您好，我們正在人工審核您的申請，將於 1 個工作天內回覆。

---

## Supabase Schema Requirements

```sql
-- user_course_access table needs these fields:
access_expires_at     TIMESTAMPTZ
extension_used        BOOLEAN DEFAULT false
extension_granted_at  TIMESTAMPTZ
```

---

## Security Notes

- Verify the `from` header matches registered email — prevents strangers from triggering extensions
- Keyword matching is fuzzy protection only; the registered-email check is the real gate
- Log all extension events in a separate `extension_log` table for audit trail
- Pre-generate a batch of 50% discount codes in Stripe; store in Supabase `discount_codes` table with `used` flag

---

## Files

- n8n workflow export: `social/n8n/exam-failure-extension.json` (export after building in n8n UI)
