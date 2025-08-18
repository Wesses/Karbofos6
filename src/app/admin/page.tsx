/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  postUserAdminAddDb,
  postUserAdminAddToRole,
  postUserAdminListAll,
  postUserAdminRemoveDb,
  postUserAdminRemoveFromRole,
  postUserAdminRevoke,
  postUserAdminRevokeAll,
  type UserAdminUser,
} from "../api/api";
import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserAdminUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [dbFilter, setDbFilter] = useState<string>("");

  const [selected, setSelected] = useState<UserAdminUser | null>(null);
  const [open, setOpen] = useState(false);

  const [newRole, setNewRole] = useState("");
  const [newDb, setNewDb] = useState("");

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    try {
      setLoading(true);
      setError(null);
      const list = await postUserAdminListAll();
      setUsers(list);
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  const allRoles = useMemo(() => {
    const s = new Set<string>();
    users.forEach((u) => u.roles?.forEach((r) => s.add(r)));
    return Array.from(s.values()).sort();
  }, [users]);

  const allDbs = useMemo(() => {
    const s = new Set<string>();
    users.forEach((u) => u.abondb?.forEach((d) => s.add(d)));
    return Array.from(s.values()).sort();
  }, [users]);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchQuery = query
        ? u.name.toLowerCase().includes(query.toLowerCase())
        : true;
      const matchRole = roleFilter ? u.roles?.includes(roleFilter) : true;
      const matchDb = dbFilter ? u.abondb?.includes(dbFilter) : true;
      return matchQuery && matchRole && matchDb;
    });
  }, [users, query, roleFilter, dbFilter]);

  const openDetails = (u: UserAdminUser) => {
    setSelected(u);
    setOpen(true);
  };

  const handleRevokeUser = async (u: UserAdminUser) => {
    await postUserAdminRevoke(u.name);
  };

  const handleRevokeAll = async () => {
    if (!confirm("Скасувати доступ для всіх користувачів?")) return;
    await postUserAdminRevokeAll();
  };

  const removeRole = async (role: string) => {
    if (!selected) return;
    await postUserAdminRemoveFromRole({ username: selected.name, role });
    await refreshAndKeepSelected();
  };

  const addRole = async () => {
    if (!selected || !newRole.trim()) return;
    await postUserAdminAddToRole({ username: selected.name, role: newRole.trim() });
    setNewRole("");
    await refreshAndKeepSelected();
  };

  const removeDb = async (db: string) => {
    if (!selected) return;
    await postUserAdminRemoveDb({ username: selected.name, fbDatabaseName: db });
    await refreshAndKeepSelected();
  };

  const addDb = async () => {
    if (!selected || !newDb.trim()) return;
    await postUserAdminAddDb({ username: selected.name, fbDatabaseName: newDb.trim() });
    setNewDb("");
    await refreshAndKeepSelected();
  };

  async function refreshAndKeepSelected() {
    const current = selected?.name;
    try {
      setLoading(true);
      const list = await postUserAdminListAll();
      setUsers(list);
      if (current) {
        const updated = list.find((u) => u.name === current) || null;
        setSelected(updated);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Панель адміністратора</h1>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => refresh()} disabled={loading}>
            Оновити
          </Button>
          <Button variant="destructive" onClick={handleRevokeAll}>
            Скасувати для всіх
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Пошук за ім’ям</label>
          <Input
            placeholder="ім’я користувача"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Фільтр за роллю</label>
          <select
            className="w-56 h-9 rounded-md border bg-background px-3 text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Усі</option>
            {allRoles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Фільтр за БД</label>
          <select
            className="w-56 h-9 rounded-md border bg-background px-3 text-sm"
            value={dbFilter}
            onChange={(e) => setDbFilter(e.target.value)}
          >
            <option value="">Усі</option>
            {allDbs.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ім’я</TableHead>
              <TableHead>Ролі</TableHead>
              <TableHead>Бази</TableHead>
              <TableHead className="w-[220px]">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.name}>
                <TableCell className="font-medium">{u.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {u.roles?.length ? (
                      u.roles.map((r) => <Badge key={r}>{r}</Badge>)
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {u.abondb?.length ? (
                      u.abondb.map((d) => <Badge key={d}>{d}</Badge>)
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => openDetails(u)}>
                      Відкрити
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleRevokeUser(u)}>
                      Скасувати
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!loading && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Немає даних
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <Sheet open={open} onOpenChange={setOpen}>
        <div className="h-full flex flex-col">
          <SheetHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{selected?.name}</div>
                  <div className="text-sm text-muted-foreground">Деталі користувача</div>
                </div>
              <Button variant="ghost" onClick={() => setOpen(false)}>Закрити</Button>
              </div>
          </SheetHeader>
          <SheetContent>
            {/* Roles */}
            <section className="space-y-2">
              <h3 className="font-medium">Ролі</h3>
              <div className="flex flex-wrap gap-2">
                {selected?.roles?.map((r) => (
                  <div key={r} className="flex items-center gap-2">
                    <Badge>{r}</Badge>
                    <Button size="sm" variant="outline" onClick={() => removeRole(r)}>
                      Видалити
                    </Button>
                  </div>
                ))}
                {!selected?.roles?.length && (
                  <span className="text-muted-foreground text-sm">Немає ролей</span>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <select
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="" disabled>
                    Оберіть роль
                  </option>
                  <option value="Inspector">Inspector</option>
                </select>
                <Button onClick={addRole} disabled={!newRole}>
                  Додати
                </Button>
              </div>
            </section>

            {/* Databases */}
            <section className="space-y-2">
              <h3 className="font-medium">Доступні БД</h3>
              <div className="flex flex-wrap gap-2">
                {selected?.abondb?.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <Badge>{d}</Badge>
                    <Button size="sm" variant="outline" onClick={() => removeDb(d)}>
                      Видалити
                    </Button>
                  </div>
                ))}
                {!selected?.abondb?.length && (
                  <span className="text-muted-foreground text-sm">Немає доступів до БД</span>
                )}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Назва БД" value={newDb} onChange={(e) => setNewDb(e.target.value)} />
                <Button onClick={addDb}>Додати</Button>
              </div>
            </section>
          </SheetContent>
        </div>
      </Sheet>
    </div>
  );
}
