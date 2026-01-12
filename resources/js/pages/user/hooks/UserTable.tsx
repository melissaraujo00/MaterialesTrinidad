import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@inertiajs/react";

interface User {
  id: number;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface Props {
  users: User[];
  onDelete: (user: User) => void;
}

export function UserTable({ users, onDelete }: Props) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden">
      <Table>
        <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
          <TableRow>
            <TableHead className="font-semibold text-zinc-900 dark:text-zinc-100">Usuario</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead className="hidden lg:table-cell">Nombre Completo</TableHead>
            <TableHead className="hidden md:table-cell">Rol</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{user.name}</span>
                  <span className="sm:hidden text-xs text-zinc-500">{user.email}</span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-zinc-600 dark:text-zinc-400">
                {user.email}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-zinc-600 dark:text-zinc-400">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-zinc-600 hover:text-blue-600">
                    <Link href={route('users.edit', user.id)}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-600 hover:text-red-600"
                    onClick={() => onDelete(user)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
