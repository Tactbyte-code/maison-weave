# Maison Weave Firestore Security Specification

## 1. Data Invariants
1. **Owner-Only Profile Isolation**: A document at `/users/{userId}` can only be read, created, or updated by the verified authenticated user whose `request.auth.uid == userId`. No user can list `/users`.
2. **Shortlist Parent Gate**: A document at `/users/{userId}/shortlist/{productSlug}` requires `request.auth.uid == userId`, `exists(/databases/$(database)/documents/users/$(userId))`, `userId` matching `request.auth.uid`, and valid ID regex on both `userId` and `productSlug`.
3. **Enquiry Identity & Lifecycle Integrity**: An enquiry at `/enquiries/{enquiryId}` must have `userId == request.auth.uid` on create, `status == 'submitted'` on create, server timestamps `createdAt == request.time` and `updatedAt == request.time`, and immutable `userId` and `createdAt` on update. Users may only list enquiries where `resource.data.userId == request.auth.uid`.
4. **Strict Keys & No Ghost Fields**: Every write must match `hasAll(...)` and `hasOnly(...)` on create, and `affectedKeys().hasOnly(...)` on update.

## 2. The "Dirty Dozen" Adversarial Payloads (Must Return PERMISSION_DENIED)
1. **Unauthenticated Profile Read**: Unauthenticated `get(/users/user-1)`.
2. **Cross-User Profile Read (PII Leak)**: User A (`uid: "user-a"`) calling `get(/users/user-b)`.
3. **Profile Shadow Field Injection**: User A creating `/users/user-a` with extra `isAdmin: true`.
4. **Profile UID Spoofing**: User A creating `/users/user-a` with `uid: "user-b"`.
5. **Unverified Email Write**: Authenticated user with `email_verified: false` attempting `create` on `/enquiries/enq-1`.
6. **Client Timestamp Forgery**: User A creating `/enquiries/enq-1` with past `createdAt` instead of `request.time`.
7. **Enquiry Identity Spoofing**: User A creating `/enquiries/enq-1` with `userId: "user-b"`.
8. **Enquiry Status Shortcutting**: User A creating `/enquiries/enq-1` with `status: "withdrawn"` instead of `"submitted"`.
9. **Terminal State Mutation**: User A updating `/enquiries/enq-1` after `status` is `"withdrawn"`.
10. **Blanket List Scraping**: User A querying `collection(db, "enquiries")` without `where("userId", "==", "user-a")`.
11. **ID Poisoning**: User A creating `/enquiries/bad$id..with..slashes` or >128 chars.
12. **Orphaned Shortlist Write**: User A creating `/users/user-a/shortlist/item-1` when `/users/user-a` does not exist yet (or with mismatched `userId`).
