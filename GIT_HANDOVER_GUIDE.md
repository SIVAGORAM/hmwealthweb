# Git Handover & Dual-Remote Guide (HM Wealth)

This developer guide provides the complete, step-by-step procedure to hand over the **HM Wealth** codebase to the client’s GitHub account while preserving your personal GitHub repository as an independent, safe backup.

---

## 1. Remote Architecture Overview

Your local machine (`D:\Projects\hm-wealth`) is configured with a **Dual-Remote Architecture**:

```text
                        ┌─────────────────────────────────────────────────────────┐
                        │              Developer Laptop / Workstation             │
                        │                   D:\Projects\hm-wealth                 │
                        └────────────────────────────┬────────────────────────────┘
                                                     │
                                 ┌───────────────────┴───────────────────┐
                                 │                                       │
                                 ▼                                       ▼
                       [ origin ] (PRIMARY)                    [ backup ] (SAFEGUARD)
            https://github.com/hmwealth/hmwealth.git   https://github.com/SIVAGORAM/hmwealthweb.git
                                 │                                       │
                                 ▼                                       ▼
                     ⭐ Client's Official Account           💻 Developer Personal Account
                     Permanent Codebase Owner              Independent Working Backup
                     Vercel Production Deploys             Portfolio / Recovery Archive
```

### Remote Definitions:
* **`origin` (Client Repository)**: `https://github.com/hmwealth/hmwealth.git`
  * This is the official client repository. Running standard `git push` automatically sends code here.
* **`backup` (Developer Personal Repository)**: `https://github.com/SIVAGORAM/hmwealthweb.git`
  * This is your personal repository. It guarantees that you never lose your work even if client permissions change.

---

## 2. One-Time Setup: Granting Push Access

Because the repository is owned by the client organization (`hmwealth`), GitHub requires push authorization.

### Client Action (Takes 1 Minute):
1. Log into GitHub and navigate to the repository:
   **[https://github.com/hmwealth/hmwealth](https://github.com/hmwealth/hmwealth)**
2. Click **Settings** (top navigation bar).
3. In the left sidebar, click **Collaborators** (or **Manage access**).
4. Click the green button **Add people**.
5. Search for the developer username: **`SIVAGORAM`**.
6. Select **`SIVAGORAM`** and click **Add SIVAGORAM to this repository**.

### Developer Action (Takes 30 Seconds):
1. Go to your notifications: **[https://github.com/notifications](https://github.com/notifications)** (or check the email associated with `SIVAGORAM`).
2. Click on the invitation: **`hmwealth has invited you to collaborate on hmwealth/hmwealth`**.
3. Click **Accept invitation**.

> [!NOTE]
> Once accepted, your GitHub account has immediate write and push permissions to `https://github.com/hmwealth/hmwealth.git`.

---

## 3. How to Push to the Client's Account

Once the invitation is accepted:

### Initial Handover Push (Sets Up Tracking):
Open terminal in `D:\Projects\hm-wealth` and run:

```bash
git push -u origin main
```

*This uploads all branches, commit history, math engines, and responsive styles to the client's repository.*

### Everyday Pushing to Client:
After the initial push, pushing to the client's account is standard:

```bash
# 1. Stage changes
git add .

# 2. Commit changes
git commit -m "feat: description of changes"

# 3. Push directly to client repository
git push
```
*(Or explicitly: `git push origin main`)*

---

## 4. How to Push to Your Personal Backup Account

To keep your personal GitHub repository (`SIVAGORAM/hmwealthweb`) completely in sync as a safe backup:

```bash
git push backup main
```

*This pushes your latest commits directly to your personal repository without touching or altering the client's repository.*

---

## 5. Pro Developer Tip: Push to BOTH Accounts with ONE Command

You can automate pushing to both the client's repository and your backup repository at the same time using either of the following methods:

### Method A: Single CLI Command
```bash
# PowerShell
git push origin main ; git push backup main

# Bash / Git Bash
git push origin main && git push backup main
```

### Method B: Create a Git Alias (Recommended)
Run this command once in your terminal:
```bash
git config alias.pushall "!git push origin main && git push backup main"
```

Now, whenever you finish work, simply type:
```bash
git pushall
```
Git will automatically push your commits to **both** `hmwealth` (Client) and `SIVAGORAM` (Personal Backup) in a single step!

---

## 6. Daily Developer Workflow Cheat Sheet

| Task | Command | Description |
| :--- | :--- | :--- |
| **Check Remotes** | `git remote -v` | Verifies `origin` (client) and `backup` (developer) URLs. |
| **Check Status** | `git status` | Shows modified, untracked, and staged files. |
| **Commit Changes** | `git add .`<br>`git commit -m "message"` | Stages and creates a new local commit. |
| **Push to Client Only** | `git push` or `git push origin main` | Deploys update to client's GitHub. |
| **Push to Backup Only** | `git push backup main` | Updates developer's personal backup. |
| **Push to BOTH** | `git push origin main ; git push backup main` | Updates both repositories simultaneously. |
| **View Recent Commits** | `git log --oneline -5` | Shows the last 5 commits on your current branch. |

---

## 7. Troubleshooting Common Errors

### Error: `403 Permission to hmwealth/hmwealth.git denied to SIVAGORAM`
* **Cause:** The client hasn't sent the collaborator invitation yet, or you haven't accepted it at [github.com/notifications](https://github.com/notifications).
* **Fix:** Ask the client to add `SIVAGORAM` under **Settings** → **Collaborators**, then click **Accept Invitation** in your notifications.

### Error: `Git Credential Manager Prompt / Token Required`
* If Windows prompts you for login credentials, select **Sign in with your browser** and ensure you are logged into the `SIVAGORAM` GitHub account.
* Alternatively, if using a GitHub Personal Access Token (PAT):
  1. Generate a token at **GitHub** → **Settings** → **Developer settings** → **Personal access tokens (classic)** with `repo` scope.
  2. Paste the token when prompted for your password.

---

## 8. Summary of Handover Benefits

1. **Client Ownership:** The client permanently owns their code at `https://github.com/hmwealth/hmwealth`.
2. **Developer Safety:** You maintain full access to your independent copy at `https://github.com/SIVAGORAM/hmwealthweb`.
3. **Seamless Deployment:** Hosting platforms (like Vercel) can be connected directly to `hmwealth/hmwealth` on branch `main` to trigger automated production deployments on every push.
