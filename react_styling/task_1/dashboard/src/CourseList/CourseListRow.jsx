function CourseListRow({
  isHeader = false,
  textFirstCell = '',
  textSecondCell = null,
}) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr  className="bg-table-header/66 border border-gray-400" >
          <th colSpan={2}>
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr className="bg-table-header/66 border border-gray-400">
        <th>
          {textFirstCell}
        </th>
        <th >
          {textSecondCell}
        </th>
      </tr>
    );
  }
  return (
    <tr className="bg-table-rows/45 border border-gray-400 pl-2">
      <td>
        {textFirstCell}
      </td>
      <td>
        {textSecondCell}
      </td>
    </tr>
  );
}

export default CourseListRow;
