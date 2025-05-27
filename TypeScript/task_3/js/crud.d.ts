import { RowID, RowElement } from "./interface";

export function insertRow(row: RowElement);
export function deleteRow(rowId: RowID);
export function updateRow(rowId: RowID, row: RowElement);
