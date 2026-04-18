"use client";

import { useMemo, useState } from "react";
import Papa from "papaparse";
import { Topbar } from "@/components/app/topbar";
import { Card, CardBody, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileSpreadsheet, Trash2, UserPlus, Download } from "lucide-react";

type Employee = {
  id: string;
  name: string;
  email: string;
  status: "active" | "offboarded";
  department?: string;
};

const seedEmployees: Employee[] = [
  { id: "e1", name: "Ava Chen", email: "ava.chen@acme.co", status: "active", department: "Engineering" },
  { id: "e2", name: "Noah Patel", email: "noah.patel@acme.co", status: "active", department: "Product" },
  { id: "e3", name: "Mia Rivera", email: "mia.rivera@acme.co", status: "offboarded", department: "Sales" },
  { id: "e4", name: "Liam Singh", email: "liam.singh@acme.co", status: "active", department: "Engineering" },
  { id: "e5", name: "Zoe Khan", email: "zoe.khan@acme.co", status: "active", department: "Design" },
  { id: "e6", name: "Ethan Liu", email: "ethan.liu@acme.co", status: "offboarded", department: "Ops" },
  { id: "e7", name: "Ivy Park", email: "ivy.park@acme.co", status: "active", department: "Marketing" },
  { id: "e8", name: "Leo Martin", email: "leo.martin@acme.co", status: "active", department: "Engineering" },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(seedEmployees);
  const [q, setQ] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!q) return employees;
    const n = q.toLowerCase();
    return employees.filter(
      (e) =>
        e.name.toLowerCase().includes(n) ||
        e.email.toLowerCase().includes(n) ||
        (e.department ?? "").toLowerCase().includes(n)
    );
  }, [employees, q]);

  function onCSV(file: File) {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const rows = res.data
          .map((r, i) => {
            const name = r.name || r.Name || `${r.first_name ?? ""} ${r.last_name ?? ""}`.trim();
            const email = r.email || r.Email || "";
            const status = (r.status || r.Status || "active").toLowerCase();
            if (!email) return null;
            return {
              id: `csv-${Date.now()}-${i}`,
              name: name || email,
              email,
              status: (status.includes("off") ? "offboarded" : "active") as Employee["status"],
              department: r.department || r.Department,
            } as Employee;
          })
          .filter((x): x is Employee => !!x);
        setEmployees((prev) => [...rows, ...prev]);
        setFlash(`Imported ${rows.length} employee${rows.length === 1 ? "" : "s"}`);
        setTimeout(() => setFlash(null), 2500);
      },
    });
  }

  function add() {
    if (!email) return;
    setEmployees((prev) => [
      { id: `m-${Date.now()}`, name: name || email, email, status: "active" },
      ...prev,
    ]);
    setName("");
    setEmail("");
  }

  function remove(id: string) {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <>
      <Topbar title="Employees" subtitle="We compare this roster against active seats in every connected tool to find ghost users." />
      <div className="px-6 py-6 md:px-8 md:py-8 max-w-[1200px] mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] flex items-center justify-center">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Upload CSV</CardTitle>
                  <CardDescription>Columns: name, email, status, department (optional)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <label className="block rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border-strong)] bg-[var(--color-subtle)] hover:bg-white transition-colors p-8 text-center cursor-pointer">
                <input
                  type="file"
                  accept=".csv,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onCSV(f);
                  }}
                />
                <div className="mx-auto h-12 w-12 rounded-full bg-white border border-[var(--color-border)] flex items-center justify-center">
                  <FileSpreadsheet className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <div className="mt-3 text-sm font-medium">Drop your CSV here, or click to browse</div>
                <div className="text-xs text-[var(--color-muted-foreground)] mt-1">Max 10MB. Columns: name,email,status,department</div>
              </label>
              {flash && (
                <div className="mt-3 text-sm text-[var(--color-success-soft-foreground)] bg-[var(--color-success-soft)] rounded-md px-3 py-2">
                  {flash}
                </div>
              )}
              <div className="mt-4 flex items-center gap-2">
                <a
                  href="data:text/csv;charset=utf-8,name,email,status,department%0AAva%20Chen,ava@acme.co,active,Engineering%0AMia%20Rivera,mia@acme.co,offboarded,Sales"
                  download="seatsweep-employees-template.csv"
                >
                  <Button variant="ghost" size="sm"><Download className="h-3.5 w-3.5" /> Download template</Button>
                </a>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--color-primary-soft)] text-[var(--color-primary-soft-foreground)] flex items-center justify-center">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Add manually</CardTitle>
                  <CardDescription>For one‑off additions between imports.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              <div>
                <label className="text-xs font-medium">Full name</label>
                <Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" />
              </div>
              <div>
                <label className="text-xs font-medium">Work email</label>
                <Input className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@acme.co" type="email" />
              </div>
              <Button onClick={add} className="w-full">Add employee</Button>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex items-center justify-between flex-row gap-3">
            <div>
              <CardTitle>Roster ({employees.length})</CardTitle>
              <CardDescription>{employees.filter((e) => e.status === "active").length} active · {employees.filter((e) => e.status === "offboarded").length} offboarded</CardDescription>
            </div>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="max-w-[260px]" />
          </CardHeader>
          <CardBody className="p-0">
            <div className="grid grid-cols-12 px-6 py-2.5 text-[11px] uppercase tracking-wider text-[var(--color-muted-foreground)] border-b border-[var(--color-border)]">
              <div className="col-span-5">Employee</div>
              <div className="col-span-3">Department</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-1"></div>
            </div>
            {filtered.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-[var(--color-muted-foreground)]">
                No matching employees.
              </div>
            ) : (
              filtered.map((e) => (
                <div key={e.id} className="grid grid-cols-12 items-center px-6 py-3 text-sm border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-subtle)] transition-colors">
                  <div className="col-span-5 min-w-0">
                    <div className="font-medium truncate">{e.name}</div>
                    <div className="text-xs text-[var(--color-muted-foreground)] truncate">{e.email}</div>
                  </div>
                  <div className="col-span-3 text-[var(--color-muted-foreground)] truncate">{e.department ?? "—"}</div>
                  <div className="col-span-3">
                    <Badge tone={e.status === "active" ? "success" : "danger"}>{e.status}</Badge>
                  </div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => remove(e.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-[var(--color-muted-foreground)]" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}
