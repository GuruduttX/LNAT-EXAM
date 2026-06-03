"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  FileText,
  HelpCircle,
  FolderDown,
  ArrowUpRight,
  Activity,
  Database,
  Server,
} from "lucide-react";
import Link from "next/link";
import CountUp from "react-countup";
import { adminFetch } from "@/lib/adminApiClient";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    universities: 0,
    blogs: 0,
    faqs: 0,
    resources: 0,
  });

  const [syncTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const getDashboardData = async () => {
      try {
        const response = await adminFetch(`/api/admin/dashboard`);

        if (!isMounted) return;

        if (response.ok) {
          const data = await response.json();
          setStats({
            universities: data.data.universityCount || 0,
            blogs: data.data.blogCount || 0,
            faqs: data.data.faqCount || 0,
            resources: data.data.resourceCount || 0,
          });
        } else {
          setStats({ universities: 0, blogs: 0, faqs: 0, resources: 0 });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        if (isMounted) {
          setStats({ universities: 0, blogs: 0, faqs: 0, resources: 0 });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void getDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const kpiCards = [
    { title: "Universities", value: stats.universities, icon: GraduationCap },
    { title: "Published Blogs", value: stats.blogs, icon: FileText },
    { title: "Active FAQs", value: stats.faqs, icon: HelpCircle },
    { title: "Free Resources", value: stats.resources, icon: FolderDown },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#FDFBF7]">
          Platform Overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitor your editorial content and LNAT directory.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-10">
        {kpiCards.map((card, i) => (
          <div
            key={i}
            className="group relative rounded-xl p-5 bg-[#0B1221] border border-slate-800 hover:border-[#C4A47C]/40 transition-all duration-300 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-slate-400">
                {card.title}
              </span>
              <div className="p-2 rounded-md bg-slate-800/50 group-hover:bg-[#C4A47C]/10 transition-colors">
                <card.icon className="text-[#C4A47C]" size={18} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#FDFBF7]">
              {!isLoading ? <CountUp end={card.value} duration={1.5} /> : "..."}
            </h2>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid xl:grid-cols-3 gap-6 mb-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2 bg-[#0B1221] rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#FDFBF7]">
              Recent Activity
            </h3>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
              Last 24 Hours
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                text: "Oxford University profile updated",
                time: "2 hours ago",
              },
              {
                text: "New blog published: 'Mastering the LNAT Essay'",
                time: "4 hours ago",
              },
              {
                text: "Added 5 new FAQs to Admissions category",
                time: "5 hours ago",
              },
              {
                text: "PDF Guide uploaded: '2025 Cutoff Predictions'",
                time: "1 day ago",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-4 rounded-lg
                bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div>
                  <p className="text-sm text-[#FDFBF7] font-medium">
                    {item.text}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                </div>
                <ArrowUpRight size={16} className="text-[#C4A47C]" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0B1221] rounded-xl p-6 border border-slate-800 flex flex-col">
          <h3 className="text-lg font-semibold text-[#FDFBF7] mb-6">
            Quick Actions
          </h3>

          <div className="space-y-3 flex-grow">
            {[
              {
                action: "Add New University",
                path: "/admin/universities/create",
              },
              { action: "Write Editorial Blog", path: "/admin/blogs/create" },
              { action: "Add FAQ Entry", path: "/admin/faqs/create" },
              { action: "Upload Resource", path: "/admin/resources/create" },
            ].map((item, i) => (
              <Link key={i} href={item.path} className="block">
                <button
                  className="w-full text-left px-4 py-3.5 rounded-lg font-medium
                  bg-slate-800/30 border border-slate-800
                  text-slate-300 hover:bg-[#C4A47C]/10 hover:text-[#C4A47C] hover:border-[#C4A47C]/30 transition-all"
                >
                  {item.action}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            label: "API Status",
            value: "Online",
            icon: Activity,
            status: "text-emerald-400",
          },
          {
            label: "Database",
            value: "Connected",
            icon: Database,
            status: "text-emerald-400",
          },
          {
            label: "Server Load",
            value: "Optimal",
            icon: Server,
            status: "text-emerald-400",
          },
        ].map((sys, idx) => (
          <div
            key={idx}
            className="bg-[#0B1221] p-5 rounded-xl border border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <sys.icon size={18} className="text-slate-500" />
              <span className="text-sm text-slate-400">{sys.label}</span>
            </div>
            <span className={`text-sm font-medium ${sys.status}`}>
              {sys.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
        <span>Last Sync: {syncTime}</span>
        <span>LNAT Platform v1.0.0</span>
      </div>
    </div>
  );
}
