import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}
    >
      <LoadingSpinner text="Loading projects..." />
    </div>
  );
}
