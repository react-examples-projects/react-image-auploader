import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function ImageListLoader() {
  return (
    <div className="w-100">
      <SkeletonTheme
        color="#0e1018"
        highlightColor="#44444485"
        style={{
          width: "100%",
          display: "flex",
          flex: "wrap",
          justifyContent: "space-around",
        }}
      >
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />

        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />

        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </SkeletonTheme>
    </div>
  );
}
