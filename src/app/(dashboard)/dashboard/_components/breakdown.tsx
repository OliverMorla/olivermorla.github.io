import { formatCount, type Row } from "@/lib/analytics-shared";

type Props = {
  title: string;
  /** Column heading for the labels, e.g. "Page". */
  dimension: string;
  rows: Row[];
};

// A top-8 list as a table with a bar behind each label: one series, so one
// color (slot 1) for every bar, a light wash so the label on top stays ink.
export default function Breakdown({ title, dimension, rows }: Props) {
  const max = Math.max(1, ...rows.map((row) => row.visitors));

  return (
    <section className="rounded-xl bg-surface p-4 ring-1 ring-line sm:p-5">
      <h2 className="text-[0.9375rem] font-semibold">{title}</h2>

      {rows.length === 0 ? (
        <p className="mt-6 mb-4 text-sm text-muted">Nothing here yet.</p>
      ) : (
        <table className="mt-3 w-full table-fixed border-separate border-spacing-y-1 text-sm">
          <thead>
            <tr className="text-left text-xs text-muted">
              <th scope="col" className="pb-1 font-medium">
                {dimension}
              </th>
              <th
                scope="col"
                className="w-[4.5rem] pb-1 text-right font-medium"
              >
                Visitors
              </th>
              <th scope="col" className="w-[4rem] pb-1 text-right font-medium">
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="group">
                <th
                  scope="row"
                  className="relative h-8 p-0 text-left font-normal"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1 left-0 rounded-r-[4px] bg-series-1/12 transition-colors group-hover:bg-series-1/20 dark:bg-series-1/18 dark:group-hover:bg-series-1/28"
                    style={{ width: `${(row.visitors / max) * 100}%` }}
                  />
                  <span
                    className="relative block truncate px-2.5 text-ink"
                    title={row.label}
                  >
                    {row.label}
                  </span>
                </th>
                <td className="text-right font-medium tabular-nums">
                  {formatCount(row.visitors)}
                </td>
                <td className="text-right text-ink-2 tabular-nums">
                  {formatCount(row.views)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
