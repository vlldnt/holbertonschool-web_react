function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className="bg-[rgba(222,181,181,0.66)]">
          <th className="border border-gray-400" colSpan={2}>
            {textFirstCell}
          </th>
        </tr>
      );
    }
    return (
      <tr className="bg-[rgba(222,181,181,0.66)]">
        <th className="border border-gray-400">{textFirstCell}</th>
        <th className="border border-gray-400">{textSecondCell}</th>
      </tr>
    );
  }
  return (
    <tr className="bg-[rgba(205,205,205,0.45)]">
      <td className="border border-gray-400 pl-2">{textFirstCell}</td>
      <td className="border border-gray-400 pl-2">{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
