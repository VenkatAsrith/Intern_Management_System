# Intern Management System

A robust and scalable application designed to streamline the process of managing interns, tracking project allocations, monitoring performance, and automating administrative workflows.

---

## 🚀 Features

* **User Authentication & Role Management:** Secure login and role-based access control (RBAC) for Admins, Managers, and Interns.
* **Intern Onboarding:** Effortlessly add new interns, upload documents, and manage profiles.
* **Task & Project Tracking:** Assign tasks, set deadlines, and monitor the real-time progress of interns.
* **Performance Evaluation:** Built-in review systems for managers to provide structured feedback and ratings.
* **Analytics Dashboard:** Visual insights into team productivity, task completion rates, and overall program health.

---

## 🛠️ Tech Stack & Architecture

This repository is built using modern workspace configurations to handle both frontend and backend architectures seamlessly.

* **Monorepo Tooling:** [PNPM Workspaces](https://pnpm.io/workspaces) (`pnpm-workspace.yaml`)
* **Frontend:** TypeScript / JavaScript ecosystem located in the `/frontend` directory.
* **Backend / Smart Contracts:** Managed via Motoko/Internet Computer package management (`mops.toml`, `caffeine.toml`) inside the `/src` directory.
* **Configuration:** Strict type-checking via `tsconfig.json` and unified configurations using `project.json`.

---

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [PNPM](https://pnpm.io/) (`npm i -g pnpm`)
* Relevant environment tools for the backend (`mops` for Motoko packages if applicable)

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/VenkatAsrith/Intern_Management_System.git](https://github.com/VenkatAsrith/Intern_Management_System.git)
cd Intern_Management_System
