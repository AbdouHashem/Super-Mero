# Security Specification: Super Mero Platform

## 1. Data Invariants
1. **Profiles (`/profiles/{userId}`)**:
   - `userId` must match `isValidId(userId)` (`^[a-zA-Z0-9_\-]+$`, `<= 128` chars) and `incoming().id == userId`.
   - Only the owning verified user (`request.auth.uid == userId && email_verified`) or an Admin can read or write a profile. Blanket `list` is blocked for non-admins.
   - Non-admin users can only create profiles with `role` in `['student', 'parent']` (default `'student'`) — never `'admin'`.
   - `id`, `role`, and `created_at` are immutable for non-admins on `update`. `created_at == request.time` on `create`.
2. **Courses (`/courses/{courseId}`)**:
   - Publicly readable (`get` and `list`) catalog of lessons (`category` in `['تأسيس القراءة', 'القواعد المبسطة', 'القصص التفاعلية']`).
   - Only verified Admins can `create`, `update`, or `delete` courses.
   - Every string field has strict `.size()` bounds and `created_at == request.time` on `create`.
3. **Student Progress (`/student_progress/{progressId}`)**:
   - A progress document cannot exist without an existing `/profiles/$(incoming().user_id)` and an existing `/courses/$(incoming().course_id)` verified via `exists()` on `create`.
   - `incoming().user_id` must strictly equal `request.auth.uid` on `create` (unless Admin).
   - `score` is bounded (`0 <= score <= 1000`), `completed` is boolean, `updated_at == request.time`.
   - `list` strictly enforces `resource.data.user_id == request.auth.uid` (or `isAdmin()`), never delegating filtering to the client.
   - On `update`, `id`, `user_id`, and `course_id` are immutable; non-admins may only modify `['completed', 'score', 'updated_at']`.
4. **Subscribers (`/subscribers/{subscriberId}`)**:
   - Strict PII isolation: `get`, `list`, `update`, and `delete` are forbidden for all non-admins.
   - Public visitors and users may `create` a subscription only with a valid `subscriberId` (deterministic SHA-256 hex of lowercase email), valid email format & length (`5..254`), `id == subscriberId`, `subscribed_at == request.time`, and exact allowed keys (`['id', 'email', 'subscribed_at']`). Because `update` is denied to non-admins, duplicate emails at the same deterministic ID are rejected, enforcing email uniqueness.

## 2. The "Dirty Dozen" Adversarial Payloads (All Must Yield PERMISSION_DENIED)
1. **Self-Admin Escalation on Profile Create**: Authenticated user creates `/profiles/uid1` with `role: 'admin'`.
2. **Shadow Field Injection on Profile**: Authenticated user creates `/profiles/uid1` with extra key `isVerified: true`.
3. **Immutable Role Mutation on Profile Update**: Authenticated student updates `/profiles/uid1` changing `role` from `'student'` to `'admin'`.
4. **Cross-User Profile Read / PII Leak**: Authenticated user `uid1` calls `get` on `/profiles/uid2` or `list` on `/profiles`.
5. **Client Timestamp Forgery**: User creates `/profiles/uid1` with a backdated `created_at` instead of `serverTimestamp()`.
6. **Non-Admin Course Tampering**: Authenticated student attempts `create` or `update` on `/courses/course-1`.
7. **Orphaned Progress Record**: Authenticated user creates `/student_progress/p1` referencing a non-existent `course_id: 'fake-course'`.
8. **Identity Spoofing in Progress**: Authenticated user `uid1` creates `/student_progress/p2` with `user_id: 'uid2'`.
9. **Unscoped Progress List Scraping**: Authenticated user queries `/student_progress` without `where('user_id', '==', auth.uid)`.
10. **Immutable Course Rebinding on Progress Update**: Authenticated user updates `/student_progress/p1` changing `course_id` to another course.
11. **Subscribers PII Read/List Leak**: Unauthenticated or non-admin user calls `get` or `list` on `/subscribers`.
12. **Path ID Poisoning / Resource Exhaustion**: Attacker sends a 1.5KB document ID or 10KB `full_name` string or extra shadow field `ghost: 1` to `/subscribers/{id}`.
