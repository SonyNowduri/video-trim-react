import { useCurrentFrame } from "remotion";
 
export const MyVideo = () => {
  const frame = useCurrentFrame();
 
  return (
    <div
      style={{
        flex: 1,
        textAlign: "center",
        fontSize: "7em",
      }}
    >
      The current frame is {frame}.
    </div>
  );
};