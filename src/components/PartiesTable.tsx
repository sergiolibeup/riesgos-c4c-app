import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  createColumnHelper,
  type ExpandedState,
} from '@tanstack/react-table';
import type { Party } from '../types/party.types';

interface PartiesTableProps {
  parties: Party[];
  isLoading?: boolean;
}

const columnHelper = createColumnHelper<Party>();

const columns = [
  columnHelper.accessor('RoleCodeText', {
    header: 'Rol',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('PartyName', {
    header: 'Nombre',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('PartyID', {
    header: 'ID',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('Email', {
    header: 'Email',
    cell: info => info.getValue() || '-',
  }),
  columnHelper.accessor('Phone', {
    header: 'Teléfono',
    cell: info => info.getValue() || '-',
  }),
];

export default function PartiesTable({ parties, isLoading }: PartiesTableProps) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data: parties,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Cargando parties...</span>
        </div>
      </div>
    );
  }

  if (parties.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-center text-gray-500 py-8">
          No se encontraron parties asociadas
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Parties ({parties.length})
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <th className="w-12 px-4 py-3"></th>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <>
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => row.toggleExpanded()}
                >
                  <td className="px-4 py-4 text-center">
                    <button
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        row.toggleExpanded();
                      }}
                    >
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          row.getIsExpanded() ? 'transform rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </td>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr key={`${row.id}-expanded`}>
                    <td colSpan={columns.length + 1} className="px-6 py-4 bg-gray-50">
                      <div className="text-sm text-gray-600">
                        {/* Slot para valores fuente - Se implementará en Sesión 4 */}
                        <div className="border-l-4 border-blue-500 pl-4">
                          <p className="font-medium text-gray-900 mb-2">
                            Valores Fuente
                          </p>
                          <p className="text-gray-500 italic">
                            Los valores fuente se mostrarán en la siguiente sesión
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
