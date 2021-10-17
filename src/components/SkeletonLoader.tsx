import Skeleton from "@mui/material/Skeleton";
interface SkeletonProps {
  animation?: any;
  component?: any;
  variant?: any;
  type: string;
}
const SkeletonLoader = (props: SkeletonProps) => {
  const buildSkeleton = () => {
    switch (props.type) {
      case "table":
        return (
          <>
            <Skeleton
              animation={props.animation ?? "wave"}
              height={50}
              width="100%"
            />
            {[1, 2, 3, 4, 5].map((e, index) => (
              <Skeleton
                key={index}
                animation={props.animation ?? "wave"}
                height={25}
                width="100%"
              />
            ))}
          </>
        );
      default:
        return (
          <>
            <Skeleton
              animation={props.animation ?? "wave"}
              height={10}
              width="100%"
            />
          </>
        );
    }
  };
  return buildSkeleton();
};
export default SkeletonLoader;
