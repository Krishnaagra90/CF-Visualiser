function Error({ message }) {
  return (
    <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
      {message}
    </p>
  );
}

export default Error;
