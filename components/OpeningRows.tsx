import { Fragment } from "react";
import { formatOpeningRow, type OpeningRow } from "@/lib/oppettider";

/** Öppettiderna som rader med radbrytning emellan, t.ex. i sidfoten. */
export default function OpeningRows({ rows }: { rows: OpeningRow[] }) {
  return rows.map((row, index) => <Fragment key={index}>{index > 0 && <br />}{formatOpeningRow(row)}</Fragment>);
}
