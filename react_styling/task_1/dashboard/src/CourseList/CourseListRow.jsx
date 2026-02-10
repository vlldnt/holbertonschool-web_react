function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr>
          <th className="bg-table-header/66 border border-gray-400" colSpan={2}>
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr>
        <th className="bg-table-header/66 border border-gray-400">
          {textFirstCell}
        </th>
        <th className="bg-table-header/66 border border-gray-400">
          {textSecondCell}
        </th>
      </tr>
    );
  }
  return (
    <tr>
      <td className="bg-table-rows/45 border border-gray-400 pl-2">
        {textFirstCell}
      </td>
      <td className="bg-table-rows/45 border border-gray-400 pl-2">
        {textSecondCell}
      </td>
    </tr>
  );
}

export default CourseListRow;
