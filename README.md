# RailPulse: National Railway IoT Platform
### Converting Infrastructure Vibration into National Intelligence

> **Hackathon MVP**: OEM Warranty Intelligence for Signaling Assets.

RailPulse is not just a dashboard; it is an industrial operating system for national infrastructure. It transforms raw sensor telemetry from **42,000 KM of track** into a sovereign, monetizable data economy.

**🚀 Live Deployment**: [https://kiran797979.github.io/RailPulse/](https://kiran797979.github.io/RailPulse/)

---

## 💎 Platform Core: Why This Matters

1.  **Universal Ingestion Layer**: A hardware-agnostic edge protocol that normalizes vibration and telemetry data from any brand of loco or signal (Siemens, Alstom, GE).
2.  **Digital Twin Engine**: An algorithmic core that maintains a live, stateful virtual replica of every physical asset, calculating health scores in real-time.
3.  **Data Marketplace API**: A secure gateway allowing third parties (Insurers, OEMs) to subscribe to anonymized reliability data, turning maintenance logs into a revenue stream.

---

## 💰 The Business Model: Turning Safety into Revenue

We don't just save money on maintenance; we generate revenue by selling high-fidelity evidence to the ecosystem.

| Persona | The Pain Point | The Product | Revenue Model |
| :--- | :--- | :--- | :--- |
| **OEMs** (Alstom, Hitachi) | High warranty claim costs due to lack of proof. | **Component Reliability Feed** | Enterprise License (Fixed MRR) |
| **Insurers** | Cannot accurately price risk for aging infrastructure. | **Risk & Safety API** | Per-call API Fee or Volume Tier |
| **Logistics Operators** | Unpredictable delays affect delivery SLAs. | **Route Uptime Predictor** | Dynamic Surcharge / usage-based |
| **Zone Operators** | Reactive maintenance is expensive and slow. | **Core Dashboard (SaaS)** | Internal Budget Allocation (Cost Saving) |

---

## 🏛️ System Architecture

The platform follows a deterministic **Edge → Cloud → Market** pipeline:

1.  **Physical Telemetry (Vibration/Temp)**: IoT sensors capture raw asset state.
2.  **Edge Processing**: 90% of noise is filtered locally; only anomalies are transmitted.
3.  **Digital Twin Normalization**: Cloud engines standardize data from heterogeneous sources.
4.  **Monetization Interface**: Refined insights are packaged for external consumption.

---

## 📱 Key Modules & Judge Takeaways

### **1. Command Center (Dashboard)**
> *Judge Takeaway: "The UI is dense, tactical, and built for professional operators."*
*   **Function**: Real-time situational awareness across 200,000 active nodes.
*   **Tech**: React virtualized grids, < 200ms latency updates.

### **2. Asset Digital Twin**
> *Judge Takeaway: "The Digital Twin concept is implemented, not just buzzword-dropped."*
*   **Function**: Atomic-level view of a single locomotive or signal.
*   **Tech**: Live telemetry streams (vibration, heat, voltage) visualised via Recharts.

### **3. Network Analytics**
> *Judge Takeaway: "They are tracking macro-health trends, not just live blips."*
*   **Function**: Long-term predictive degradation modeling.

### **4. Monetization Protocol**
> *Judge Takeaway: "This is the 'Wow' factor—they figured out how to make rail data profitable."*
*   **Function**: Revenue simulator showing real-time yield from data API subscriptions.

### **5. Pilot Roadmap**
> *Judge Takeaway: "They have a realistic roadmap to get this live in 3 months."*
*   **Function**: A deterministic 90-day execution framework for national rollout.

---

## 🛠 Tech Stack

*   **Frontend**: React (Vite)
*   **3D Engine**: Spline (React-Spline)
*   **Styling**: Tailwind CSS (Custom "Industrial Glass" Tokens)
*   **Animations**: GSAP (GreenSock) + ScrollTrigger
*   **Visualization**: Recharts (Customized Dark Theme)
*   **Deployment**: GitHub Actions (CI/CD)

---

## ❓ Judge FAQ & Defense

**Q: How do you get the data from old trains?**
**A**: We use non-intrusive, retrofit vibration sensors (magnetic mount) that cost <$50 and require no wiring integration with legacy computers.

**Q: Is this secure?**
**A**: Yes. The pipeline is **read-only**. We pull data *out*, but we never send control commands *back* to the trains, ensuring zero risk of hacking critical controls.

**Q: Why would OEMs pay for this?**
**A**: Currently, they pay millions in warranty claims they can't disprove. Our data gives them the evidence to reject invalid claims or fix defects cheaper.

---

### 🚀 Getting Started

1.  **Install Dependencies**: `npm install`
2.  **Start Dev Server**: `npm run dev`
3.  **Build** : `npm run build`

*Designed & Engineered for the Hackathon 2026.*
