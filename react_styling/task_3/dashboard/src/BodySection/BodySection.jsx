function BodySection({ title, children }) {
  return (
    <>
      <div className="bodySection mb-20">
        <h2 className="font-bold">{title}</h2>
        {children}
      </div>
    </>
  );
}

export default BodySection;
