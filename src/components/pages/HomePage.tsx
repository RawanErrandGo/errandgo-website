import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Wallet,
  Layers3,
  RefreshCcw,
  Clock3,
  Users,
  Sparkles,
  CircleDollarSign,
  Truck,
  ShoppingBag,
  Briefcase,
  Landmark,
  Monitor,
  Download,
  X,
} from "lucide-react";
import QRCode from "qrcode";

import StoreButtons from "../StoreButtons";
import mobileAppImage from "/Group 28918.svg";
import { useEffect, useMemo, useState } from "react";
import { FOOTER_LINKS } from "@/lib/constants";

const brand = {
  name: "ErrandGo",
  category: "Consumer trust and payments platform",
  headline:
    "Platform for trusted services, escrow-backed payments, and everyday transactions",
  sub: "ErrandGo enables errands, deliveries, shopping, escrow-backed services, milestone payments, and peer-to-peer transactions within a structured lifecycle built for real-world execution.",
  webCta: "Open web app",
  appCta: "Download app",
};

// const stats = [
//   { value: "Escrow-backed", label: "payment protection" },
//   { value: "P2P + Fiat", label: "exchange and cash movement" },
//   { value: "Multi-flow", label: "services and commerce" },
// ];

const stats = [
  { value: "Multi-use", label: "services & commerce" },
  { value: "Escrow mechanism", label: "payment protection" },
  { value: "P2P + Fiat", label: "on/off-ramp & trading" },
];

const platformCards = [
  {
    icon: ShieldCheck,
    title: "Escrow-backed payments",
    desc: "Create payment flows that secure value before work or delivery begins, then release funds through a clear transaction lifecycle.",
    tone: "blue",
  },
  {
    icon: Layers3,
    title: "Milestone releases",
    desc: "Break service work into stages and settle each part progressively with clearer expectations for both sides.",
    tone: "emerald",
  },
  {
    icon: CircleDollarSign,
    title: "Onramp and offramp",
    desc: "Support money-in and money-out coordination with balances, local settlement, and wallet-linked movement.",
    tone: "violet",
  },
  {
    icon: RefreshCcw,
    title: "Peer-to-peer exchange",
    desc: "Run direct exchange flows with better visibility into funding, settlement, and completion.",
    tone: "amber",
  },
];

const featureRows = [
  {
    icon: Truck,
    title: "Errands and delivery flows",
    desc: "Coordinate pickups, dispatch, local errands, and delivery execution with protected payment states.",
  },
  {
    icon: ShoppingBag,
    title: "Shopping assistance",
    desc: "Handle purchase requests, assisted buying, and fulfillment with clearer funding and completion flow.",
  },
  {
    icon: Briefcase,
    title: "Service execution",
    desc: "Use escrow or milestone-based structures for service work, staged progress, and controlled settlement.",
  },
  {
    icon: Wallet,
    title: "Wallet-linked settlement",
    desc: "Track movement between workspace balances, digital settlement, and final transaction outcomes.",
  },
  {
    icon: Landmark,
    title: "Local payment coordination",
    desc: "Bring traditional rails and digital balances together in one operational experience.",
  },
  {
    icon: Users,
    title: "Two-sided trust",
    desc: "Give both sides more confidence with funding visibility, progress states, and controlled completion.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Create the transaction",
    desc: "Start an errand, service request, shopping flow, exchange, or payment request with clear terms.",
  },
  {
    step: "02",
    title: "Fund or route value",
    desc: "Secure the payment, move funds in, or set the transaction into a controlled settlement state.",
  },
  {
    step: "03",
    title: "Track execution",
    desc: "Monitor progress, delivery, milestones, or proof of completion through one structured lifecycle.",
  },
  {
    step: "04",
    title: "Settle the outcome",
    desc: "Release, refund, complete, or cash out the transaction with clearer visibility and record flow.",
  },
];

const trustPoints = [
  "Clear transaction states from creation to completion",
  "Escrow-backed payment protection",
  "Milestone-based release logic",
  "Onramp and offramp coordination",
  "Peer-to-peer exchange support",
  "Wallet-linked settlement visibility",
];

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}

function toneClasses(tone: string) {
  switch (tone) {
    case "blue":
      return "bg-blue-50 text-blue-700";
    case "emerald":
      return "bg-emerald-50 text-emerald-700";
    case "violet":
      return "bg-violet-50 text-violet-700";
    case "amber":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
function DownloadAppModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const appDownloadUrl = useMemo(() => {
    const base =
      import.meta.env.VITE_FRONTEND_BASE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    return `${base}/download`;
  }, []);

  useEffect(() => {
    if (!open) return;
    QRCode.toDataURL(appDownloadUrl, { width: 320, margin: 2 }).then(
      setQrCodeUrl
    );
  }, [open, appDownloadUrl]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-slate-950/25 backdrop-blur-sm"
      >
        <div
          className="flex min-h-screen items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl overflow-hidden rounded-[30px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,#ffffff,#f8fafc_62%,#eef2ff)] shadow-[0_30px_100px_rgba(15,23,42,0.22)]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-700 transition hover:bg-white"
              aria-label="Close download modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-8 px-5 py-5 md:grid-cols-[320px_1fr] md:px-8 md:py-8 lg:px-10 lg:py-10">
              <div className="hidden md:flex items-center justify-center">
                <div className="rounded-[28px] bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
                  {qrCodeUrl ? (
                    <img
                      src={qrCodeUrl}
                      alt="Scan QR code to download the ErrandGo app"
                      className="h-[260px] w-[260px] rounded-[20px] object-contain"
                    />
                  ) : (
                    <div className="h-[260px] w-[260px] animate-pulse rounded-[20px] bg-slate-100" />
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-center py-2 md:py-4">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    <Download className="h-3.5 w-3.5" />
                    Download app
                  </div>

                  <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl md:leading-[1.08]">
                    Get <span className="text-[#7D32DF]">ErrandGo</span> App the
                    Fast and Easy Way
                  </h2>

                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-xl md:leading-9">
                    Scan the QR code with your smartphone camera or use the app
                    store buttons below to download the app and get started.
                  </p>

                  <div className="mt-7 max-w-[380px]">
                    <StoreButtons />
                  </div>

                  <div className="mt-6  flex md:hidden items-center justify-center">
                    <div className="rounded-[28px] bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
                      {qrCodeUrl ? (
                        <img
                          src={qrCodeUrl}
                          alt="Scan QR code to download the ErrandGo app"
                          className="h-[260px] w-[260px] rounded-[20px] object-contain"
                        />
                      ) : (
                        <div className="h-[260px] w-[260px] animate-pulse rounded-[20px] bg-slate-100" />
                      )}
                    </div>
                  </div>

                  {/* <div className="mt-6 md:hidden">
                    <div className="rounded-[24px] bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
                      {qrCodeUrl ? (
                        <img
                          src={qrCodeUrl}
                          alt="Scan QR code to download the ErrandGo app"
                          className="mx-auto h-[220px] w-[220px] rounded-[18px] object-contain"
                        />
                      ) : (
                        <div className="mx-auto h-[220px] w-[220px] animate-pulse rounded-[18px] bg-slate-100" />
                      )}
                    </div>
                  </div> */}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["iOS", "Android", "QR access"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
export default function Landing() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-950">
      <DownloadAppModal
        open={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <a href="#top" className="flex items-center gap-3">
            <svg
              className="flex h-11 w-11 items-center justify-center rounded-2xl "
              viewBox="0 0 130 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M71.1407 13.8977C84.7778 6.41644 102.07 9.74383 113.715 19.2483C119.466 24.1573 123.517 30.8469 125.858 37.9875C126.016 38.425 126.173 38.8629 126.335 39.3137C127.477 43.0025 127.612 46.5785 127.632 50.4309C127.636 50.9306 127.64 51.4307 127.645 51.9455C127.532 64.0959 121.536 74.2533 115.464 84.3615C115.093 84.9855 114.723 85.6096 114.353 86.2336C109.839 93.7795 104.835 101.033 99.7461 108.199C99.2954 108.834 98.8462 109.47 98.3975 110.107C96.9167 112.205 95.4122 114.284 93.876 116.343C93.6755 116.614 93.4753 116.886 93.2686 117.165C92.6995 117.925 92.1166 118.672 91.5274 119.416C91.3611 119.64 91.1948 119.864 91.0235 120.094C90.5311 120.695 90.5311 120.695 89.4786 121.54C88.1172 121.671 88.117 121.672 86.6807 121.141C85.6367 120.197 84.8491 119.108 84.0323 117.967C83.7914 117.644 83.55 117.321 83.3018 116.988C82.5541 115.979 81.8187 114.962 81.084 113.945C80.6442 113.345 80.2035 112.746 79.7627 112.148C78.4539 110.36 77.1678 108.557 75.8868 106.749C75.6558 106.424 75.4245 106.099 75.1866 105.765C72.6446 102.185 70.1407 98.5828 67.7413 94.9055C67.4591 94.4757 67.4588 94.4757 67.1709 94.0373C65.8922 92.0545 66.1622 91.9505 65.5626 91.261C65.1631 91.151 65.2298 91.1665 64.8887 91.1711C61.7654 91.2112 58.6421 91.2413 55.5186 91.261C53.913 91.2714 52.3077 91.2861 50.7022 91.3088C49.1522 91.3306 47.602 91.3417 46.0518 91.3469C45.461 91.3506 44.87 91.3586 44.2793 91.3694C43.4504 91.3839 42.622 91.3859 41.793 91.385C41.0859 91.3916 41.0857 91.3909 40.3643 91.3977C38.7219 91.0836 38.13 90.4562 37.1084 89.1584C36.8836 87.7346 36.8836 87.7344 37.1084 86.3606C37.8548 85.4152 38.4358 84.8971 39.5069 84.3615C40.1147 84.3246 40.7242 84.313 41.3331 84.3137C41.7176 84.3131 42.1029 84.3123 42.4991 84.3117C42.9222 84.3132 43.3453 84.3142 43.7813 84.3156C44.4482 84.3156 44.4485 84.3157 45.129 84.3156C46.6041 84.3159 48.0796 84.3194 49.5547 84.3225C50.5752 84.3232 51.5958 84.324 52.6163 84.3244C55.0316 84.3258 57.447 84.3282 59.8624 84.3322C62.6119 84.3367 65.3618 84.339 68.1114 84.341C73.768 84.3452 79.4245 84.3526 85.0811 84.3615C84.9368 84.1688 84.7923 83.9761 84.6436 83.7776C84.4581 83.5251 84.2732 83.2721 84.0821 83.0119C83.8966 82.7615 83.7107 82.5112 83.5196 82.2531C83.0824 81.5631 83.1524 81.7567 82.5528 80.9572C82.253 80.5575 82.5531 80.9566 82.1534 80.5569C81.3539 79.7574 80.5299 79.3718 79.6094 78.7893C75.6615 76.409 71.7872 75.9067 67.2374 75.9094C66.8613 75.908 66.4851 75.9069 66.0977 75.9055C65.2854 75.9026 64.4725 75.9001 63.6602 75.8987C62.375 75.8958 61.0899 75.8894 59.8047 75.8821C56.1518 75.8611 52.4988 75.8423 48.8458 75.8362C46.6081 75.8321 44.3705 75.8197 42.1329 75.803C41.2807 75.798 40.4284 75.7962 39.5762 75.7971C38.3866 75.798 37.1974 75.7896 36.0079 75.7785C35.6554 75.7812 35.3026 75.7836 34.9395 75.7864C32.5528 75.7497 32.5525 75.7497 31.3057 74.8039C30.3031 73.3912 30.1385 72.5094 30.3126 70.7688C30.8996 69.9029 30.8997 69.9027 31.9112 69.1701C33.1342 69.0207 34.2111 68.9675 35.4327 68.9885C35.7875 68.9883 36.1423 68.9878 36.5079 68.9875C37.6804 68.9886 38.853 69.0014 40.0254 69.0139C40.8388 69.0169 41.6525 69.0191 42.4659 69.0207C44.6056 69.0268 46.7452 69.0421 48.8848 69.0598C51.0687 69.0762 53.2536 69.084 55.4376 69.092C59.722 69.1092 64.0067 69.1365 68.2911 69.1701C67.8565 68.53 67.4188 67.8917 66.9805 67.2541C66.7373 66.8984 66.4938 66.5425 66.2432 66.176C63.7097 62.7908 59.6591 61.3832 55.6202 60.5539C54.0767 60.3453 52.5598 60.3201 51.0059 60.3244C50.6846 60.3237 50.3633 60.3233 50.0323 60.3225C49.3381 60.3209 48.6435 60.3197 47.9493 60.3196C46.4729 60.3182 44.9959 60.3101 43.5196 60.302C40.7741 60.2868 38.0288 60.2738 35.2833 60.2746C33.37 60.2749 31.4562 60.266 29.543 60.2502C28.8148 60.246 28.0866 60.2452 27.3584 60.2483C26.341 60.2521 25.324 60.2439 24.3067 60.2326C24.006 60.2367 23.7053 60.2402 23.3956 60.2444C21.8822 60.2142 21.2443 60.0962 20.1309 59.0364C19.3814 57.7398 19.2677 57.0516 19.5186 55.5774C20.2649 54.657 20.8603 54.1067 21.917 53.5783C22.7907 53.5416 23.6657 53.5318 24.5401 53.5334C24.8092 53.5334 25.0783 53.5335 25.3555 53.5334C26.2467 53.5337 27.1381 53.5362 28.0293 53.5393C28.6465 53.54 29.2637 53.5408 29.8809 53.5412C31.5069 53.5428 33.1329 53.5466 34.7588 53.551C36.4175 53.5551 38.0767 53.5568 39.7354 53.5588C42.9906 53.5631 46.2458 53.5699 49.501 53.5783C49.4976 53.1214 49.4948 52.6644 49.4913 52.1936C49.4884 51.5827 49.4851 50.9714 49.4825 50.3606C49.4787 49.9106 49.4785 49.9102 49.4747 49.4514C49.4386 38.3652 54.155 28.5012 61.794 20.6721C64.3649 18.1223 67.1499 16.1825 70.2901 14.4006C70.5708 14.2348 70.8514 14.0686 71.1407 13.8977ZM96.8604 32.175C92.1363 29.7519 85.1824 29.7772 80.4668 32.2024C80.1323 32.4025 79.8071 32.597 79.4825 32.7912C77.3838 33.9431 75.6953 35.2849 74.0362 37.0139C69.6333 42.1492 68.31 47.3414 68.6885 53.9797C69.4417 58.6852 71.6614 63.6731 75.5196 66.6135C75.7795 66.8034 76.0319 66.9877 76.2842 67.1721C80.258 70.5254 84.9728 71.8802 90.1749 71.6477C94.6714 71.258 99.9585 69.146 103.02 65.6477C103.308 65.2146 103.589 64.7946 103.869 64.3742C105.355 62.2029 106.822 60.0706 107.646 57.5539C107.721 57.2903 107.794 57.0344 107.867 56.7785C108.901 53.3704 108.943 49.9226 108.441 46.4084C106.811 41.0287 103.67 36.4805 98.9346 33.4211C98.5736 33.2071 98.2225 32.9989 97.8721 32.7912C97.5282 32.5816 97.1942 32.3785 96.8604 32.175Z"
                fill="#6D35C0"
              />
              <path
                d="M8.52137 53.3632C9.08334 53.3566 9.08334 53.3566 9.65666 53.3499C11.3783 53.3682 12.452 53.4353 13.9667 54.3017C14.7587 55.2352 14.9827 55.5831 14.9427 56.7862C14.9435 57.182 14.9435 57.182 14.9443 57.5858C14.6171 58.7412 14.0347 59.2219 13.1188 59.9844C11.6014 60.308 10.0695 60.2255 8.52137 60.2093C8.10343 60.2188 7.68549 60.2284 7.25489 60.2382C4.20734 60.2323 4.20734 60.2323 2.85112 59.0459C2.19901 57.732 2.05348 57.0342 2.32486 55.5869C4.0335 53.1749 5.79885 53.2939 8.52137 53.3632Z"
                fill="#6C35BC"
              />
              <path
                d="M19.5137 68.9706C19.9126 68.9644 20.3114 68.9582 20.7224 68.9519C23.6083 68.9673 23.6083 68.9673 24.9731 69.8826C25.534 70.8088 25.727 71.2955 25.7102 72.3687C25.7143 72.6325 25.7184 72.8964 25.7227 73.1682C25.3845 74.4414 25.0189 74.8241 23.9112 75.5669C22.4423 75.8062 20.9989 75.7898 19.5137 75.7668C19.1148 75.773 18.716 75.7791 18.305 75.7855C15.4191 75.77 15.4191 75.77 14.0543 74.8548C13.4934 73.9286 13.3004 73.4419 13.3172 72.3687C13.311 71.9729 13.311 71.9729 13.3047 71.5691C14.1165 68.5128 16.9216 68.9304 19.5137 68.9706Z"
                fill="#6C35BE"
              />
            </svg>

            <div>
              <div className="text-base font-semibold tracking-tight text-slate-950">
                {brand.name}
              </div>
              <div className="text-xs text-slate-500">{brand.category}</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#platform"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Platform
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              How it works
            </a>
            <a
              href="#download"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              Get started
            </a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="/app"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              <Monitor className="h-4 w-4" />
              {brand.webCta}
            </a>
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Download className="h-4 w-4" />
              {brand.appCta}
            </button>
          </div>

          <button
            onClick={() => setDownloadModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 md:hidden"
          >
            {brand.appCta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      <section
        id="top"
        className="relative overflow-hidden px-4 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.12),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.10),transparent_24%),linear-gradient(to_bottom,#ffffff,#f8fafc)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <FadeUp>
            <div className="max-w-3xl">
              <Eyebrow>Built for trusted everyday transactions</Eyebrow>

              <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-6xl md:leading-[1.03]">
                {brand.headline}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-xl md:leading-9">
                {brand.sub}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/app"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  <Monitor className="h-4 w-4" />
                  {brand.webCta}
                </a>
                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Download className="h-4 w-4" />
                  {brand.appCta}
                </button>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm shadow-slate-200/60"
                  >
                    <div className="text-lg font-semibold tracking-tight text-slate-950">
                      {item.value}
                    </div>
                    <div className="mt-1 text-sm leading-6 text-slate-500">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="relative mx-auto w-full max-w-[560px]">
              <div className="absolute -left-6 top-10 hidden h-28 w-28 rounded-full bg-violet-200/60 blur-3xl md:block" />
              <div className="absolute -right-8 bottom-10 hidden h-36 w-36 rounded-full bg-blue-200/60 blur-3xl md:block" />

              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-3 backdrop-blur">
                <img
                  src={mobileAppImage}
                  alt="ErrandGo mobile application preview"
                  className="w-full rounded-[1.25rem] object-cover"
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="platform" className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-7xl">
          <Surface className="overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffffff,#f8fafc_62%,#eef2ff)] p-6 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div className="max-w-xl">
                <Eyebrow>Platform</Eyebrow>

                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl md:leading-tight">
                  One product for protected payments, structured execution, and
                  clearer settlement.
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  ErrandGo brings service coordination, payment protection,
                  staged release logic, and settlement visibility into a single
                  product experience designed for real-world transactions.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {platformCards.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <FadeUp key={item.title} delay={index * 0.05}>
                      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-2xl",
                            toneClasses(item.tone)
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                          {item.desc}
                        </p>
                      </div>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </Surface>
        </div>
      </section>

      <section id="features" className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeUp>
            <div className="max-w-3xl">
              <Eyebrow>Core capabilities</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl md:leading-tight">
                One product flow for payments, services, commerce, and money
                movement.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                ErrandGo supports payment protection, staged execution, local
                settlement coordination, and everyday transaction completion in
                one workspace.
              </p>
            </div>
          </FadeUp>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featureRows.map((item, index) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.title} delay={index * 0.04}>
                  <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Surface className="p-6 md:p-8 lg:p-10">
            <FadeUp>
              <div className="max-w-3xl">
                <Eyebrow>How it works</Eyebrow>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl md:leading-tight">
                  How it works.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  Users create, fund, track, and settle through a structured
                  transaction flow designed for clarity at every stage.
                </p>
              </div>
            </FadeUp>

            <div className="mt-10 grid gap-4 lg:grid-cols-4">
              {workflow.map((item, index) => (
                <FadeUp key={item.step} delay={index * 0.05}>
                  <div className="h-full rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-semibold tracking-[0.18em] text-slate-500">
                      {item.step}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </Surface>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-7xl">
          <Surface className="p-6 md:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="max-w-xl">
                <Eyebrow>Built for trust</Eyebrow>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl md:leading-tight">
                  Clear transaction structure for both sides of every flow.
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-600 md:text-base">
                  Every transaction follows a structured path designed to make
                  payment status, execution progress, and settlement outcomes
                  easier to understand.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {trustPoints.map((point, index) => (
                  <FadeUp key={point} delay={index * 0.04}>
                    <div className="flex items-start gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm">
                        {index === 0 && <Clock3 className="h-4 w-4" />}
                        {index === 1 && <ShieldCheck className="h-4 w-4" />}
                        {index === 2 && <Layers3 className="h-4 w-4" />}
                        {index === 3 && (
                          <CircleDollarSign className="h-4 w-4" />
                        )}
                        {index === 4 && <Users className="h-4 w-4" />}
                        {index === 5 && <Wallet className="h-4 w-4" />}
                      </div>
                      <p className="text-sm leading-6 text-slate-700">
                        {point}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </Surface>
        </div>
      </section>

      {/* <section
        id="download"
        className="px-4 pb-20 pt-8 md:px-6 md:pb-28 md:pt-10"
      >
        <div className="mx-auto max-w-5xl">
          <Surface className="bg-[radial-gradient(circle_at_top_left,#ffffff,#f8fafc_62%,#eef2ff)] px-6 py-8 md:px-8 md:py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Get started</Eyebrow>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-4xl md:leading-tight">
                  Use {brand.name} on web and mobile.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
                  Open the web workspace for full transaction management or
                  download the mobile app for protected payments and everyday
                  execution on the go.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/app"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    <Monitor className="h-4 w-4" />
                    {brand.webCta}
                  </a>
                  <a
                    href="#store-download"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4" />
                    {brand.appCta}
                  </a>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "Escrow-backed",
                    "Milestone-ready",
                    "On/off-ramp",
                    "P2P-ready",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div
                id="store-download"
                className="flex shrink-0 justify-start lg:justify-end"
              >
                <StoreButtons />
              </div>
            </div>
          </Surface>
        </div>
      </section> */}

      <footer className="border-t border-slate-200 bg-white px-4 py-12 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <svg
                className="flex h-11 w-11 items-center justify-center rounded-2xl "
                viewBox="0 0 130 130"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M71.1407 13.8977C84.7778 6.41644 102.07 9.74383 113.715 19.2483C119.466 24.1573 123.517 30.8469 125.858 37.9875C126.016 38.425 126.173 38.8629 126.335 39.3137C127.477 43.0025 127.612 46.5785 127.632 50.4309C127.636 50.9306 127.64 51.4307 127.645 51.9455C127.532 64.0959 121.536 74.2533 115.464 84.3615C115.093 84.9855 114.723 85.6096 114.353 86.2336C109.839 93.7795 104.835 101.033 99.7461 108.199C99.2954 108.834 98.8462 109.47 98.3975 110.107C96.9167 112.205 95.4122 114.284 93.876 116.343C93.6755 116.614 93.4753 116.886 93.2686 117.165C92.6995 117.925 92.1166 118.672 91.5274 119.416C91.3611 119.64 91.1948 119.864 91.0235 120.094C90.5311 120.695 90.5311 120.695 89.4786 121.54C88.1172 121.671 88.117 121.672 86.6807 121.141C85.6367 120.197 84.8491 119.108 84.0323 117.967C83.7914 117.644 83.55 117.321 83.3018 116.988C82.5541 115.979 81.8187 114.962 81.084 113.945C80.6442 113.345 80.2035 112.746 79.7627 112.148C78.4539 110.36 77.1678 108.557 75.8868 106.749C75.6558 106.424 75.4245 106.099 75.1866 105.765C72.6446 102.185 70.1407 98.5828 67.7413 94.9055C67.4591 94.4757 67.4588 94.4757 67.1709 94.0373C65.8922 92.0545 66.1622 91.9505 65.5626 91.261C65.1631 91.151 65.2298 91.1665 64.8887 91.1711C61.7654 91.2112 58.6421 91.2413 55.5186 91.261C53.913 91.2714 52.3077 91.2861 50.7022 91.3088C49.1522 91.3306 47.602 91.3417 46.0518 91.3469C45.461 91.3506 44.87 91.3586 44.2793 91.3694C43.4504 91.3839 42.622 91.3859 41.793 91.385C41.0859 91.3916 41.0857 91.3909 40.3643 91.3977C38.7219 91.0836 38.13 90.4562 37.1084 89.1584C36.8836 87.7346 36.8836 87.7344 37.1084 86.3606C37.8548 85.4152 38.4358 84.8971 39.5069 84.3615C40.1147 84.3246 40.7242 84.313 41.3331 84.3137C41.7176 84.3131 42.1029 84.3123 42.4991 84.3117C42.9222 84.3132 43.3453 84.3142 43.7813 84.3156C44.4482 84.3156 44.4485 84.3157 45.129 84.3156C46.6041 84.3159 48.0796 84.3194 49.5547 84.3225C50.5752 84.3232 51.5958 84.324 52.6163 84.3244C55.0316 84.3258 57.447 84.3282 59.8624 84.3322C62.6119 84.3367 65.3618 84.339 68.1114 84.341C73.768 84.3452 79.4245 84.3526 85.0811 84.3615C84.9368 84.1688 84.7923 83.9761 84.6436 83.7776C84.4581 83.5251 84.2732 83.2721 84.0821 83.0119C83.8966 82.7615 83.7107 82.5112 83.5196 82.2531C83.0824 81.5631 83.1524 81.7567 82.5528 80.9572C82.253 80.5575 82.5531 80.9566 82.1534 80.5569C81.3539 79.7574 80.5299 79.3718 79.6094 78.7893C75.6615 76.409 71.7872 75.9067 67.2374 75.9094C66.8613 75.908 66.4851 75.9069 66.0977 75.9055C65.2854 75.9026 64.4725 75.9001 63.6602 75.8987C62.375 75.8958 61.0899 75.8894 59.8047 75.8821C56.1518 75.8611 52.4988 75.8423 48.8458 75.8362C46.6081 75.8321 44.3705 75.8197 42.1329 75.803C41.2807 75.798 40.4284 75.7962 39.5762 75.7971C38.3866 75.798 37.1974 75.7896 36.0079 75.7785C35.6554 75.7812 35.3026 75.7836 34.9395 75.7864C32.5528 75.7497 32.5525 75.7497 31.3057 74.8039C30.3031 73.3912 30.1385 72.5094 30.3126 70.7688C30.8996 69.9029 30.8997 69.9027 31.9112 69.1701C33.1342 69.0207 34.2111 68.9675 35.4327 68.9885C35.7875 68.9883 36.1423 68.9878 36.5079 68.9875C37.6804 68.9886 38.853 69.0014 40.0254 69.0139C40.8388 69.0169 41.6525 69.0191 42.4659 69.0207C44.6056 69.0268 46.7452 69.0421 48.8848 69.0598C51.0687 69.0762 53.2536 69.084 55.4376 69.092C59.722 69.1092 64.0067 69.1365 68.2911 69.1701C67.8565 68.53 67.4188 67.8917 66.9805 67.2541C66.7373 66.8984 66.4938 66.5425 66.2432 66.176C63.7097 62.7908 59.6591 61.3832 55.6202 60.5539C54.0767 60.3453 52.5598 60.3201 51.0059 60.3244C50.6846 60.3237 50.3633 60.3233 50.0323 60.3225C49.3381 60.3209 48.6435 60.3197 47.9493 60.3196C46.4729 60.3182 44.9959 60.3101 43.5196 60.302C40.7741 60.2868 38.0288 60.2738 35.2833 60.2746C33.37 60.2749 31.4562 60.266 29.543 60.2502C28.8148 60.246 28.0866 60.2452 27.3584 60.2483C26.341 60.2521 25.324 60.2439 24.3067 60.2326C24.006 60.2367 23.7053 60.2402 23.3956 60.2444C21.8822 60.2142 21.2443 60.0962 20.1309 59.0364C19.3814 57.7398 19.2677 57.0516 19.5186 55.5774C20.2649 54.657 20.8603 54.1067 21.917 53.5783C22.7907 53.5416 23.6657 53.5318 24.5401 53.5334C24.8092 53.5334 25.0783 53.5335 25.3555 53.5334C26.2467 53.5337 27.1381 53.5362 28.0293 53.5393C28.6465 53.54 29.2637 53.5408 29.8809 53.5412C31.5069 53.5428 33.1329 53.5466 34.7588 53.551C36.4175 53.5551 38.0767 53.5568 39.7354 53.5588C42.9906 53.5631 46.2458 53.5699 49.501 53.5783C49.4976 53.1214 49.4948 52.6644 49.4913 52.1936C49.4884 51.5827 49.4851 50.9714 49.4825 50.3606C49.4787 49.9106 49.4785 49.9102 49.4747 49.4514C49.4386 38.3652 54.155 28.5012 61.794 20.6721C64.3649 18.1223 67.1499 16.1825 70.2901 14.4006C70.5708 14.2348 70.8514 14.0686 71.1407 13.8977ZM96.8604 32.175C92.1363 29.7519 85.1824 29.7772 80.4668 32.2024C80.1323 32.4025 79.8071 32.597 79.4825 32.7912C77.3838 33.9431 75.6953 35.2849 74.0362 37.0139C69.6333 42.1492 68.31 47.3414 68.6885 53.9797C69.4417 58.6852 71.6614 63.6731 75.5196 66.6135C75.7795 66.8034 76.0319 66.9877 76.2842 67.1721C80.258 70.5254 84.9728 71.8802 90.1749 71.6477C94.6714 71.258 99.9585 69.146 103.02 65.6477C103.308 65.2146 103.589 64.7946 103.869 64.3742C105.355 62.2029 106.822 60.0706 107.646 57.5539C107.721 57.2903 107.794 57.0344 107.867 56.7785C108.901 53.3704 108.943 49.9226 108.441 46.4084C106.811 41.0287 103.67 36.4805 98.9346 33.4211C98.5736 33.2071 98.2225 32.9989 97.8721 32.7912C97.5282 32.5816 97.1942 32.3785 96.8604 32.175Z"
                  fill="#6D35C0"
                />
                <path
                  d="M8.52137 53.3632C9.08334 53.3566 9.08334 53.3566 9.65666 53.3499C11.3783 53.3682 12.452 53.4353 13.9667 54.3017C14.7587 55.2352 14.9827 55.5831 14.9427 56.7862C14.9435 57.182 14.9435 57.182 14.9443 57.5858C14.6171 58.7412 14.0347 59.2219 13.1188 59.9844C11.6014 60.308 10.0695 60.2255 8.52137 60.2093C8.10343 60.2188 7.68549 60.2284 7.25489 60.2382C4.20734 60.2323 4.20734 60.2323 2.85112 59.0459C2.19901 57.732 2.05348 57.0342 2.32486 55.5869C4.0335 53.1749 5.79885 53.2939 8.52137 53.3632Z"
                  fill="#6C35BC"
                />
                <path
                  d="M19.5137 68.9706C19.9126 68.9644 20.3114 68.9582 20.7224 68.9519C23.6083 68.9673 23.6083 68.9673 24.9731 69.8826C25.534 70.8088 25.727 71.2955 25.7102 72.3687C25.7143 72.6325 25.7184 72.8964 25.7227 73.1682C25.3845 74.4414 25.0189 74.8241 23.9112 75.5669C22.4423 75.8062 20.9989 75.7898 19.5137 75.7668C19.1148 75.773 18.716 75.7791 18.305 75.7855C15.4191 75.77 15.4191 75.77 14.0543 74.8548C13.4934 73.9286 13.3004 73.4419 13.3172 72.3687C13.311 71.9729 13.311 71.9729 13.3047 71.5691C14.1165 68.5128 16.9216 68.9304 19.5137 68.9706Z"
                  fill="#6C35BE"
                />
              </svg>
              <div>
                <div className="text-base font-semibold tracking-tight text-slate-950">
                  {brand.name}
                </div>
                <div className="text-xs text-slate-500">{brand.category}</div>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Trusted services, protected payments, and structured transaction
              coordination in one platform.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {FOOTER_LINKS.map((link, i) => {
                const Icon = link.icon;

                return (
                  <a
                    key={i}
                    target="_blank"
                    rel="noreferrer"
                    href={link.href}
                    aria-label={link.label || `Social link ${i + 1}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Platform
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <a
                href="#platform"
                className="block transition hover:text-slate-950"
              >
                Platform
              </a>
              <a
                href="#features"
                className="block transition hover:text-slate-950"
              >
                Features
              </a>
              <a
                href="#workflow"
                className="block transition hover:text-slate-950"
              >
                How it works
              </a>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Access
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <a href="/app" className="block transition hover:text-slate-950">
                Web app
              </a>
              <button
                onClick={() => setDownloadModalOpen(true)}
                className="block text-left transition hover:text-slate-950"
              >
                Download app
              </button>
              <div>Escrow payments</div>
              <div>On/off-ramp coordination</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Company
            </div>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div>About</div>
              <div>Contact</div>
              <div>Privacy</div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© 2026 {brand.name}. All rights reserved.</div>
          <div>Protected payments and clearer transaction flow.</div>
        </div>
      </footer>
    </div>
  );
}
