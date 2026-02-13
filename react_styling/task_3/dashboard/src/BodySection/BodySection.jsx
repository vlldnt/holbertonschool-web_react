function BodySection({ title, children }) {
  return (
    <>
      <div className="bodySection mt-8 mb-15">
        <h2 className="font-bold text-xl">{title}</h2>
        {children}
      </div>
    </>
  );
}

export default BodySection;
